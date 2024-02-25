import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userCred, setUserCred] = useState(localStorage.getItem("userCred"));
  const navigate = useNavigate();

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

  const logout = () => {
    setUserCred(null);

    navigate("/");
  };

  const contextValue = useMemo(
    () => ({
      userCred,
      setUserCred,
      getUser,
      logout,
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
