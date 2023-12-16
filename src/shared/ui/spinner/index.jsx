import { Spin } from "antd";

export const Spinner = () => {
  return (
    <span className="w-full h-[calc(100vh-48px)] flex items-center justify-center">
      <Spin />
    </span>
  );
};
