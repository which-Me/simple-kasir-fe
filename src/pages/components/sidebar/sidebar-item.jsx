import { Link } from "react-router-dom";
import { useLayout } from "@/pages/Layout/Layout";

export const SidebarItem = ({ icon = "", to = "", title, isActive }) => {
  const { setCollapsed } = useLayout();
  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <Link to={to} className="text-default-900 active:bg-none max-w-full">
      <div
        className={`${
          isActive
            ? "bg-primary-100 [&_svg_path]:fill-primary-500"
            : "hover:bg-default-100"
        } flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]`}
        onClick={handleClick}
      >
        {icon}
        <span className="text-default-900">{title}</span>
      </div>
    </Link>
  );
};
