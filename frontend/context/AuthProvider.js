import React, { createContext, useState, useEffect } from "react";
import { getToken, fetchUserData, logout } from "../utils/auth"; // Import your auth functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: null, user: null });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadAuthData = async () => {
      const token = await getToken();
      if (token) {
        const user = await fetchUserData(token);
        setAuthState({ token, user });
      }
    };
    loadAuthData();
  }, []);

  const signOut = async () => {
    await logout();
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, signOut, videos, setVideos }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
