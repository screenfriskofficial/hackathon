import { createContext, useContext, useState } from "react";
import { UserContext } from "../user-provider/UserProvider.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setToken } = useContext(UserContext);
  const navigation = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
      };

      const response = await fetch(
        "https://example-auth-waj6.onrender.com/auth/jwt/login",
        requestOptions,
      );

      const data = await response.json();

      if (!response.ok) {
        await toast.promise(Promise.reject(data.detail), {
          error: `Ошибка: ${data.detail}`,
        });
      } else {
        console.log(setToken);
        setToken(data.access_token);
        toast.success("Вы успешно вошли в аккаунт!");
        navigation("/vacancies");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password) => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      };

      const response = await fetch(
        "https://example-auth-waj6.onrender.com/auth/register",
        requestOptions,
      );
      const data = await response.json();

      if (!response.ok) {
        await toast.promise(Promise.reject(data.detail), {
          error: `Ошибка: ${data.detail}`,
        });
      } else {
        toast.success("Вы успешно создали аккаунт, авторизуйтесь!");
        navigation("/login");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    toast.success("Вы успешно вышли из аккаунта!");
  };

  return (
    <AuthContext.Provider value={{ error, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
