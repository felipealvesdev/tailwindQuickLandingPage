import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import emmLogo from "../../assets/logos/emmLogo.png";
import { Link, useLocation } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Sun, MoonStar } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import LanguageDropDownMenu from "../LanguageDropDownMenu/LanguageDropDownMenu";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function Navbar() {
  const location = useLocation();
  const { toggleTheme, theme } = useTheme();

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    { name: "Em desenvolvimento", href: "#", current: false },
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-orange-500 dark:bg-orange-600 shadow-lg pb-1"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden pr-2">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-orange-200 hover:bg-orange-700 hover:text-white focus:outline-none">
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Logo */}
              <div className="flex items-center">
                <Link to={"/"}>
                  <img className="h-10 w-auto" src={emmLogo} alt="Logo" />
                </Link>
              </div>
              <div className="hidden sm:flex sm:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "text-white bg-orange-700"
                        : "text-teal-100 hover:bg-orange-500 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sun className="text-white h-6 w-6" />
                  <Switch
                    onClick={toggleTheme}
                    defaultChecked={theme === "dark"}
                  />
                  <MoonStar className="text-white h-6 w-6" />
                </div>
                <LanguageDropDownMenu />
                <Link
                  to="/signin"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-md hover:bg-orange-500 hover:text-white focus:outline-none"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "text-white bg-orange-700"
                      : "text-orange-100 hover:bg-orange-500 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="px-20 pt-4">
              <Link
                to="/signin"
                className="block w-full rounded-lg bg-white px-4 mb-4 py-2 text-center text-sm font-medium text-orange-700 shadow-md hover:bg-orange-700 hover:text-white"
              >
                Login
              </Link>
            </div>
            <div className="flex items-center justify-evenly py-4">
              <div className="flex space-x-2">
                <Sun className="text-white h-6 w-6" />
                <Switch
                  onClick={toggleTheme}
                  defaultChecked={theme === "dark"}
                />
                <MoonStar className="text-white h-6 w-6" />
              </div>
              <LanguageDropDownMenu />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
