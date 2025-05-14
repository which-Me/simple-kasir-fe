import { useAuth } from "@/contexts/Auth/AuthContext";
import { ImageValidation } from "@/contexts/ImageValidation/ImageValidation";
import {
  DropdownTrigger,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export const UserAvatar = () => {
  const { Logout, user } = useAuth();
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          size="md"
          name={user.username}
          src={ImageValidation(user.avatar)}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        onAction={(key) => console.log({ key })}
      >
        <DropdownItem key="profile" className="mt-2 mb-2 py-3">
          <h2 className="mb-2 font-bold">Welcome, {user.username}</h2>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={() => Logout()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
