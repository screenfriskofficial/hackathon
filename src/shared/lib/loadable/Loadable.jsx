import { Suspense } from "react";
import { Spin } from "antd";

export const Loadable = (Component) => {
  return function fn(props) {
    return (
      <Suspense
        fallback={
          <span className="w-full h-[calc(100vh-48px)] flex items-center justify-center">
            <Spin />
          </span>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
};
