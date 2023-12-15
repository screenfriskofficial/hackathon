import { useRoutes } from 'react-router-dom';
import { MainLayout } from '../../../pages/layouts/main-layout/MainLayout';
import MainPage from '../../../pages/main-page/MainPage';

export const AppProvider = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          element: <MainPage />,
          path: '/',
        },
      ],
    },
  ]);
};
