import { Sidebar } from "./sidebar.style";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarHeader } from "./sidebar-header";

import { TbReport } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import {
  FaShoppingCart,
  FaWallet,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";

import { useLocation } from "react-router-dom";
import ThemeSwitch from "../button/theme-switch";
import { useLayout } from "@/pages/Layout/Layout";
import { useAuth } from "@/contexts/Auth/AuthContext";

export const SidebarWrapper = () => {
  const { collapsed, setCollapsed } = useLayout();
  const path = useLocation().pathname;
  const { user } = useAuth();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <SidebarHeader title={"HIIII"} />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<MdDashboard size={20} />}
              isActive={path === "/"}
              to="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={path === "/payments"}
                title="Payments"
                icon={<FaWallet size={20} />}
                to="payments"
              />
              {/* <CollapseItems
                  items={["Banks Accounts", "Credit Cards", "Loans"]}
                  title="Balances"
                /> */}
              <SidebarItem
                isActive={path === "/orders"}
                title="Orders"
                icon={<FaShoppingCart size={20} />}
                to="orders"
              />
              <SidebarItem
                isActive={path === "/products"}
                title="Products"
                icon={<FaShoppingBag size={20} />}
                to="products"
              />
            </SidebarMenu>
            {user && <RoleFeatures />}
            <SidebarMenu title="Theme Switch">
              <ThemeSwitch></ThemeSwitch>
            </SidebarMenu>
            <div className={Sidebar.Footer()}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const RoleFeatures = () => {
  const { user } = useAuth();
  const path = useLocation().pathname;

  const role = user.role;

  switch (role) {
    case "Superadmin":
      return (
        <SidebarMenu title="Super Admin Features ✨">
          <SidebarItem
            isActive={path === "/accounts"}
            title="Accounts"
            icon={<FaUser size={20} />}
            to="accounts"
          />
          <SidebarItem
            isActive={path === "/reports"}
            title="Reports"
            icon={<TbReport size={20} />}
            to="reports"
          />
        </SidebarMenu>
      );
    case "Admin":
      return <div>Admin</div>;
    default:
      return null;
  }
};
