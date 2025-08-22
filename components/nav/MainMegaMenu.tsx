import Link from "next/link";
import {
  MegaMenu,
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DarkThemeToggle,
} from "flowbite-react";

export default function Header() {
  return (
    <MegaMenu>
      <NavbarBrand as={Link} href="/" className="order-1">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Larry Merino
        </span>
      </NavbarBrand>

      <NavbarToggle className="order-2 md:hidden" />

      <NavbarCollapse className="order-3 md:ml-auto items-center">
        <MegaMenuDropdown toggle={<>Projects</>}>
          <ul
            className="grid grid-cols-1 gap-1 p-2 min-w-[10rem]"
            aria-label="Projects submenu"
          >
            <li>
              <Link
                href="/projects/project-1"
                className="block rounded px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                Project 1
              </Link>
            </li>
            <li>
              <Link
                href="/projects/project-2"
                className="block rounded px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                Project 2
              </Link>
            </li>
            <li>
              <Link
                href="/projects/project-3"
                className="block rounded px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                Project 3
              </Link>
            </li>
          </ul>
        </MegaMenuDropdown>

        <NavbarLink as={Link} href="#">
          Blog
        </NavbarLink>

        <NavbarLink as={Link} href="#">
          Contact
        </NavbarLink>
      </NavbarCollapse>

      {/* más separación a la derecha */}
      <div className="order-4 mx-8 hidden items-center md:flex">
        <DarkThemeToggle />
      </div>
    </MegaMenu>
  );
}
