import { Dropdown, DropdownTrigger } from "@heroui/react";

export const SidebarHeader = ({ title, icon }) => {
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {/* {company.logo} */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              {/* {company.name} */}Simple Kasir
            </h3>
            <span className="text-xs font-medium text-default-500">
              {/* {company.location} */}by raffi
            </span>
          </div>
          {/* <BottomIcon /> */}
        </div>
      </DropdownTrigger>
    </Dropdown>
  );
};
