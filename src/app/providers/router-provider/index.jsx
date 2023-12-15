import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './RouterProvider';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppProvider />
    </BrowserRouter>
  );
};
