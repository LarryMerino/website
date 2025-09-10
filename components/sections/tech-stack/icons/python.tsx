import React from "react";
import { cn } from "@/lib/utils";
import type { SVGProps } from "./git";

/* Python */
export const PythonIcon = React.forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      className={cn("w-full h-full", className)}
      {...props}
    >
      <defs>
        <linearGradient
          id="python-gradient-a"
          x1="12.959%"
          x2="79.639%"
          y1="12.039%"
          y2="78.201%"
        >
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient
          id="python-gradient-b"
          x1="19.128%"
          x2="90.742%"
          y1="20.579%"
          y2="88.429%"
        >
          <stop offset="0%" stopColor="#FFE052" />
          <stop offset="100%" stopColor="#FFC331" />
        </linearGradient>
      </defs>
      {/* Parte superior (azul) - Escalada para viewBox 24x24 */}
      <path
        fill="url(#python-gradient-a)"
        className="dark:fill-[url(#python-gradient-a)]"
        d="M11.894 0.007c-6.078 0-5.699 2.633-5.699 2.633l0.007 2.726h5.799v0.819H3.904s-3.897 0.441-3.897 5.935c0 6.127 3.394 5.908 3.394 5.908h2.025v-2.844s-0.109-3.394 3.338-3.394h5.748s3.231 0.052 3.231-3.121V3.184s0.462-3.177-5.849-3.177zm-3.185 1.843c0.537 0 0.973 0.436 0.973 0.973s-0.436 0.973-0.973 0.973-0.973-0.436-0.973-0.973 0.436-0.973 0.973-0.973z"
      />
      {/* Parte inferior (amarillo) - Escalada para viewBox 24x24 */}
      <path
        fill="url(#python-gradient-b)"
        className="dark:fill-[url(#python-gradient-b)]"
        d="M12.071 23.809c6.078 0 5.699-2.633 5.699-2.633l-0.007-2.726h-5.799v-0.819h7.093s3.897-0.441 3.897-5.935c0-6.127-3.394-5.908-3.394-5.908h-2.025v2.844s0.109 3.394-3.338 3.394H7.449s-3.231-0.052-3.231 3.121v5.245s-0.491 3.176 5.853 3.176v0.241zm3.185-1.843c-0.537 0-0.973-0.436-0.973-0.973s0.436-0.973 0.973-0.973 0.973 0.436 0.973 0.973-0.436 0.973-0.973 0.973z"
      />
    </svg>
  )
);
PythonIcon.displayName = "PythonIcon";
