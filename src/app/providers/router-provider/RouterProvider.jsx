import { useRoutes } from "react-router-dom";
import { MainLayout } from "../../../pages/layouts/main-layout/MainLayout";
import { Loadable } from "../../../shared/lib/loadable/Loadable";
import { lazy } from "react";

const MainPage = Loadable(
  lazy(() => import("../../../pages/main-page/MainPage")),
);
const VacanciesPage = Loadable(
  lazy(() => import("../../../pages/vacancies-page/VacanciesPage")),
);
const LoginPage = Loadable(
  lazy(() => import("../../../pages/login-page/LoginPage.jsx")),
);
const RegisterPage = Loadable(
  lazy(() => import("../../../pages/register-page/RegisterPage.jsx")),
);
const FavoritesPage = Loadable(
  lazy(() => import("../../../pages/favorites-page/FavoritesPage.jsx")),
);
const ResumePage = Loadable(
  lazy(() => import("../../../pages/resume-page/ResumePage.jsx")),
);

export const AppProvider = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          element: <MainPage />,
          path: "/",
        },
        {
          element: <VacanciesPage />,
          path: "/vacancies",
        },
        {
          element: <LoginPage />,
          path: "/login",
        },
        {
          element: <RegisterPage />,
          path: "/register",
        },
        {
          element: <FavoritesPage />,
          path: "/favorites",
        },
        {
          element: <ResumePage />,
          path: "/resume",
        },
      ],
    },
  ]);
};
