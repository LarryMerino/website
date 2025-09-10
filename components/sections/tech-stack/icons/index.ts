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
