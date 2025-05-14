import { Navbar, NavbarContent } from "@heroui/react";
import { Link } from "react-router-dom";
import { GithubIcon } from "../icons/github-icon";
import { UserAvatar } from "../avatar/user-avatar";
import { InputSearch } from "./Search";
import { useLocation } from "react-router-dom";
import { BurguerButton } from "./navbar-burger";

export const NavbarWrapper = ({ children }) => {
  const path = useLocation().pathname;
  const onProduct =
    path === "/products" || path === "/orders" || path === "/reports";

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        shouldHideOnScroll
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden" justify="start">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent
          className="max-w-screen-md flex-1 max-md:flex-start"
          as="div"
          justify="center"
        >
          {onProduct ? <InputSearch /> : ""}
        </NavbarContent>
        <NavbarContent
          as="div"
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <Link to={"https://github.com/which-Me"} target="_blank">
            <GithubIcon />
          </Link>
          <NavbarContent>
            <UserAvatar />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
