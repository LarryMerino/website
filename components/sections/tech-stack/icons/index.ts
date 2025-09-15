/**
 * Re-exports for tech stack SVG icons and a convenience map (TECH_STACK_ICONS).
 *
 * Each icon is a React component that accepts a `className` and scales to the
 * parent's width/height. The map is used to reference icons by key.
 */
import { GitIcon } from "./git";
import { RustIcon } from "./rust";
import { GithubIcon } from "./github";
import { FreeRTOSIcon } from "./freertos";
import { PythonIcon } from "./python";
import { ZephyrIcon } from "./zephyr";
import { CIcon } from "./c";
import { ARMIcon } from "./arm";
import { NordicIcon } from "./nordic";
import { EspressifIcon } from "./espressif";
import { DockerIcon } from "./docker";

export type { SVGProps } from "./git";
export { GitIcon } from "./git";
export { RustIcon } from "./rust";
export { GithubIcon } from "./github";
export { FreeRTOSIcon } from "./freertos";
export { PythonIcon } from "./python";
export { ZephyrIcon } from "./zephyr";
export { CIcon } from "./c";
export { ARMIcon } from "./arm";
export { NordicIcon } from "./nordic";
export { EspressifIcon } from "./espressif";
export { DockerIcon } from "./docker";

/**
 * Convenience dictionary to access icons by a stable key.
 */
export const TECH_STACK_ICONS = {
  Git: GitIcon,
  Rust: RustIcon,
  GitHub: GithubIcon,
  FreeRTOS: FreeRTOSIcon,
  Zephyr: ZephyrIcon,
  Python: PythonIcon,
  C: CIcon,
  ARM: ARMIcon,
  Nordic: NordicIcon,
  Espressif: EspressifIcon,
  Docker: DockerIcon,
} as const;

export type TechStackIconKey = keyof typeof TECH_STACK_ICONS;
