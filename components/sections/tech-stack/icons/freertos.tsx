import React from "react";
import { cn } from "@/lib/utils";
import type { SVGProps } from "./git";

/* FreeRTOS (minimal) */
export const FreeRTOSIcon = React.forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      className={cn("w-full h-full", className)}
      role="img"
      aria-label="FreeRTOS"
      style={{ transform: "scale(2.4)", transformOrigin: "center" }}
      {...props}
    >
      {/* Rectángulo principal (verde en el original) */}
      <rect
        x={1}
        y={7.7}
        width={22}
        height={8}
        rx={1.5}
        ry={1.5}
        stroke="#28D634"
        strokeWidth={0.8}
        fill="none"
      />

      {/* Texto "free" vertical a la izquierda (negro en el original) */}
      <text
        x={6.5}
        y={12.5}
        textAnchor="start"
        fontSize={3.0}
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        fill="#000000"
        className="dark:fill-white"
        transform="rotate(-90 6.8 14)"
      >
        free
      </text>

      {/* Texto "RTOS" grande en el centro (verde en el original) */}
      <text
        x={13.8}
        y={12.8}
        textAnchor="middle"
        fontSize={4.8}
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        fill="#65ff65"
        style={{ letterSpacing: "0.14em" }}
      >
        RTOS
      </text>

      {/* Línea horizontal debajo del texto (negra en el original) */}
      <rect
        x={6}
        y={13.5}
        width={15}
        height={0.6}
        fill="#000000"
        className="dark:fill-white"
      />
    </svg>
  )
);
FreeRTOSIcon.displayName = "FreeRTOSIcon";
