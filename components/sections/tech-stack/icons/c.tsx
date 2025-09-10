import React from "react";
import { cn } from "@/lib/utils";
import type { SVGProps } from "./git";

/* C */
export const CIcon = React.forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("w-full h-full", className)}
      {...props}
    >
      {/**
       * Normalización completa: coordenadas recalculadas, sin transform.
       * Transform original compuesto: translate(14.4 11.2) scale(0.192) aplicado a paths base.
       * Fórmula aplicada a comandos absolutos: (x', y') = (0.192*x + 2.7648, 0.192*y + 2.1504).
       * Comandos relativos: sólo se escalan (dx', dy') = (0.192*dx, 0.192*dy).
       * Resultado visual idéntico, con paths ya en el sistema del viewBox 24x24.
       */}
      {/* Ajuste de centrado: desplazamiento aplicado X -1.1146, Y -1.8384 para equilibrar márgenes y eliminar posible clipping inferior. */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#3949AB"
        d="M22.3497,18.0067c0.1651,-0.2842,0.2669,-0.6067,0.2669,-0.8947V7.105c0,-0.288,-0.1018,-0.6086,-0.2669,-0.8947L12.1334,12.1085L22.3497,18.0067L22.3497,18.0067L22.3497,18.0067z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#283593"
        d="M13.0416,23.688l8.6669,-5.0035c0.2496,-0.144,0.4762,-0.3936,0.6413,-0.6778L12.1334,12.1085L1.9171,18.0067c0.1651,0.2842,0.3917,0.5338,0.6413,0.6778l8.6669,5.0035C11.7244,23.976,12.5404,23.976,13.0416,23.688L13.0416,23.688L13.0416,23.688z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#5C6BC0"
        d="M22.3497,6.2102c-0.1651,-0.2842,-0.3917,-0.5338,-0.6413,-0.6778L13.0416,0.529c-0.4992,-0.288,-1.3171,-0.288,-1.8163,0L2.5584,5.5325C2.0592,5.8205,1.6502,6.529,1.6502,7.105V17.112c0,0.288,0.1018,0.6086,0.2669,0.8947L12.1334,12.1085L22.3497,6.2102L22.3497,6.2102L22.3497,6.2102z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#FFFFFF"
        d="M12.1334,19.0973c-3.8534,0,-6.9888,-3.1354,-6.9888,-6.9888s3.1354,-6.9888,6.9888,-6.9888c2.4864,0,4.8058,1.3382,6.0518,3.4925l-3.024,1.751c-0.624,-1.079,-1.7837,-1.7472,-3.0278,-1.7472c-1.9277,0,-3.4944,1.5667,-3.4944,3.4944c0,1.9258,1.5667,3.4944,3.4944,3.4944c1.2442,0,2.4038,-0.6701,3.0278,-1.7472l3.024,1.751C16.9392,17.759,14.6198,19.0973,12.1334,19.0973L12.1334,19.0973L12.1334,19.0973z"
      />
    </svg>
  )
);
CIcon.displayName = "CIcon";
