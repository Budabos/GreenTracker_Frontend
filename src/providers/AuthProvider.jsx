import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userCred, setUserCred] = useState(localStorage.getItem("userCred"));

  useEffect(() => {
    if (userCred) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + JSON.parse(userCred).access_token;
      localStorage.setItem("userCred", userCred);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("userCred");
    }
  }, [userCred]);

  const getUser = () => {
    if (userCred) {
      return JSON.parse(userCred).user;
    }

    return null;
  };

  const contextValue = useMemo(
    () => ({
      userCred,
      setUserCred,
      getUser,
    }),
    [userCred]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
