import { Suspense } from "react";
import { Spin } from "antd";

export const Loadable = (Component) => {
  return function fn(props) {
    return (
      <Suspense fallback={<Spin />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
