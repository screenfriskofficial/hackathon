import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../../../widgets/navbar/index.jsx";

export const MainLayout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};
