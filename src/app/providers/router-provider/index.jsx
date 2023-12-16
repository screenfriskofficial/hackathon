import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./RouterProvider";
import { UserProvider } from "../user-provider/UserProvider.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../auth-provider/AuthProvider.jsx";
import { store } from "../store-provider/StoreProvider.jsx";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppRouter = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <UserProvider>
            <AuthProvider>
              <AppProvider />
            </AuthProvider>
          </UserProvider>
          <ToastContainer position={"top-center"} autoClose={2000} />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};
