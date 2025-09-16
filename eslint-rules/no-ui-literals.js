/**
 * Custom ESLint rule: no-ui-literals
 * Purpose: Prevent UI copy/text literals from being hardcoded directly in JSX components.
 * We enforce that visible UI text lives under the `content/` directory (or other allowed sources).
 *
 * Basic heuristics (first iteration - can be refined):
 *  - Flags JSXText nodes containing letters (ignoring pure whitespace / line breaks / minimal punctuation)
 *  - Flags attribute values (title, alt, placeholder, children as string) except those ignored
 *  - Ignores class / data-* / aria-* attributes (assumed not user-visible copy)
 *  - Ignores files whose path contains an allowed substring (e.g. content/)
 *  - Ignores strings that look like Tailwind / utility class lists (configurable pattern)
 *
 * Limitations: False positives may occur (e.g. alt="Logo"). You can move the string into centralized content
 * or silence with: // eslint-disable-next-line local/no-ui-literals
 */

/** Simple substring matcher – formerly glob/regex, simplified to avoid complexity. */
function matchesAnySubstring(str, patterns) {
  return patterns.some((p) => str.includes(p));
}

const DEFAULT_IGNORE_ATTRIBUTES = [
  "className",
  "id",
  "key",
  "data-*",
  "aria-*",
];

const DEFAULT_TAILWIND_PATTERN = /^[a-z0-9:\-_/\s\[\]\(\)%.#]+$/; // simple heuristic: looks like utility tokens

export const meta = {
  name: "no-ui-literals",
  type: "suggestion",
  docs: {
    description:
      "Avoid UI text literals in JSX outside centralized content modules",
    recommended: false,
  },
  schema: [
    {
      type: "object",
      properties: {
        allowInFiles: { type: "array", items: { type: "string" } },
        ignoreAttributes: { type: "array", items: { type: "string" } },
        ignorePatterns: { type: "array", items: { type: "string" } },
        tailwindPattern: { type: "string" },
        minLetters: { type: "number" },
      },
      additionalProperties: false,
    },
  ],
  messages: {
    uiLiteral:
      "UI text literal detected: move this string into a module under 'content/' or another centralized source.",
  },
};

export function create(context) {
  const options = context.options[0] || {};
  const filename = context.getFilename();
  const allowInFiles = options.allowInFiles || ["/content/"];
  const normalized = filename.replace(/\\/g, "/");
  let rel = normalized;
  try {
    const cwd = process.cwd().replace(/\\/g, "/");
    if (normalized.startsWith(cwd)) rel = normalized.slice(cwd.length);
  } catch (_) {}
  const targetPath = rel || normalized;
  if (matchesAnySubstring(targetPath, allowInFiles)) {
    return {};
  }

  const ignoreAttributes =
    options.ignoreAttributes || DEFAULT_IGNORE_ATTRIBUTES;
  const ignorePatterns = (options.ignorePatterns || []).map(
    (p) => new RegExp(p)
  );
  const tailwindPattern = options.tailwindPattern
    ? new RegExp(options.tailwindPattern)
    : DEFAULT_TAILWIND_PATTERN;
  const minLetters = options.minLetters || 2; // avoid flagging isolated letters / very short tokens

  function isIgnoredAttribute(name) {
    return ignoreAttributes.some((p) => {
      if (p.endsWith("*")) return name.startsWith(p.slice(0, -1));
      return name === p;
    });
  }

  function looksLikeUtility(text) {
    return tailwindPattern.test(text);
  }

  function isIgnoredByCustomPatterns(text) {
    return ignorePatterns.some((r) => r.test(text));
  }

  function isUiTextCandidate(raw) {
    const text = raw.trim();
    if (!text) return false;
    // Skip if it's only punctuation
    if (/^[\.,;:!?()\[\]\-–—_]+$/.test(text)) return false;
    const letters = text.match(/[A-Za-zÀ-ÿ]/g) || [];
    if (letters.length < minLetters) return false;
    if (looksLikeUtility(text)) return false; // looks like tailwind / utility classes only
    if (isIgnoredByCustomPatterns(text)) return false;
    return true;
  }

  return {
    JSXText(node) {
      if (isUiTextCandidate(node.value)) {
        context.report({ node, messageId: "uiLiteral" });
      }
    },
    JSXAttribute(node) {
      const name = node.name && node.name.name;
      if (!name || typeof name !== "string") return;
      if (isIgnoredAttribute(name)) return;
      const value = node.value;
      if (!value) return; // boolean attribute (no string literal)
      let str = null;
      if (value.type === "Literal" && typeof value.value === "string") {
        str = value.value;
      } else if (
        value.type === "JSXExpressionContainer" &&
        value.expression &&
        value.expression.type === "Literal" &&
        typeof value.expression.value === "string"
      ) {
        str = value.expression.value;
      }
      if (str && isUiTextCandidate(str)) {
        context.report({ node: value, messageId: "uiLiteral" });
      }
    },
    Literal(node) {
      // Detect patterns like: const title = "Something"; inside TS/TSX (simple heuristic)
      if (typeof node.value !== "string") return;
      // Only proceed for TS/TSX files
      if (!/\.tsx?$/.test(filename)) return;
      // Avoid duplicate reports already caught via JSXAttribute/JSXText
      if (
        node.parent &&
        (node.parent.type === "JSXAttribute" ||
          node.parent.type === "JSXExpressionContainer")
      ) {
        return;
      }
      if (isUiTextCandidate(node.value)) {
        context.report({ node, messageId: "uiLiteral" });
      }
    },
  };
}

// Export for ESM (flat config) and also allow CommonJS require()
const plugin = { rules: { "no-ui-literals": { meta, create } } };
export default plugin;
// CommonJS fallback
if (typeof module !== "undefined") module.exports = plugin;
