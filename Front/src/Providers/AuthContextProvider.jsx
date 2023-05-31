import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../configs";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  const handleLogin = async (userName) => {
    const response = await fetch(`${BASE_URL}/user/${userName}`);
    const data = await response.json();
    if (data.id) {
      setUser(data);
      return true;
    }
    return false;
  };

  const propiedades = {
    user,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={propiedades}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
