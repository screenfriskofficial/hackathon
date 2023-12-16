import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      try {
        const response = await fetch(
          "https://example-auth-waj6.onrender.com/users/me",
          requestOptions,
        );

        if (!response.ok) {
          setToken(null);
        }
        localStorage.setItem("access_token", token);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, error, isLoading, user }}>
      {children}
    </UserContext.Provider>
  );
};
