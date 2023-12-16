import { Suspense } from "react";
import { Spinner } from "../../ui/spinner/index.jsx";

export const Loadable = (Component) => {
  return function fn(props) {
    return (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
