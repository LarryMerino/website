import React from "react";
import { cn } from "@/lib/utils";
import type { SVGProps } from "./git";
export const ZephyrIcon = React.forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("w-full h-full", className)}
      role="img"
      aria-label="Zephyr"
      style={{
        transform: "scale(1.6) translateY(7px)",
        transformOrigin: "center",
      }}
      {...props}
    >
      <defs>
        <linearGradient
          id="zephyr-gradient-1"
          x1="175.73553"
          y1="84.38559"
          x2="269.64076"
          y2="84.38559"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7929d2" />
          <stop offset="1" stopColor="#0070c5" />
        </linearGradient>
        <linearGradient
          id="zephyr-gradient-2"
          x1="182.12678"
          y1="1.65821"
          x2="181.34028"
          y2="94.48435"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00aeff" />
          <stop offset="1" stopColor="#9454db" />
        </linearGradient>
        <linearGradient
          id="zephyr-gradient-3"
          x1="233.81506"
          y1="40.14891"
          x2="213.76674"
          y2="5.42421"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#66a9dc" />
          <stop offset="1" stopColor="#b1e4fa" />
        </linearGradient>
        <linearGradient
          id="zephyr-gradient-4"
          x1="238.27458"
          y1="12.9407"
          x2="249.66534"
          y2="91.72681"
          xlinkHref="#zephyr-gradient-2"
        />
      </defs>
      <g transform="scale(0.09)">
        <polygon
          fill="#7929d2"
          points="140.594 121.949 109.573 135.048 135.948 148.369 140.594 121.949"
        />
        <polygon
          fill="#9454db"
          points="73.616 139.307 40.527 126.92 48.198 152.935 73.616 139.307"
        />
        <polygon
          fill="#af7fe4"
          points="89.307 116.023 109.573 135.048 73.616 139.307 89.307 116.023"
        />
        <polygon
          fill="#af7fe4"
          points="44.521 98.147 40.527 126.92 15.514 101.955 44.521 98.147"
        />
        <polygon
          fill="url(#zephyr-gradient-1)"
          points="140.594 121.949 222.257 46.822 258.969 95.466 140.594 121.949"
        />
        <polygon
          fill="url(#zephyr-gradient-2)"
          points="140.594 121.949 175.475 11.409 222.257 46.822 140.594 121.949"
        />
        <polygon
          fill="url(#zephyr-gradient-3)"
          points="175.475 11.409 258.969 11.409 222.257 46.822 175.475 11.409"
        />
        <polygon
          fill="url(#zephyr-gradient-4)"
          points="258.969 95.466 258.969 11.409 222.257 46.822 258.969 95.466"
        />
      </g>
    </svg>
  )
);
ZephyrIcon.displayName = "ZephyrIcon";
