import { Spinner } from "@heroui/react";

export const Loading = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="flex">
        <Spinner variant="gradient" color="primary" />
      </div>
    </div>
  );
};
