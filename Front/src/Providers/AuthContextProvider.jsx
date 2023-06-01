import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../configs";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const handleLogin = async (userName, password) => {
    const response = await fetch(`${BASE_URL}/user/user_name/${userName}`);
    const data = await response.json();

    if (data.user_name === userName && data.password === password) {
      // Comparar también la contraseña ingresada
      setUser(data);
      return true;
    }
    return false;
  };

  // Se desloguea
  const logOut = () => {
    setUser(undefined);
  };

  const propiedades = {
    user,
    handleLogin,
    logOut,
  };

  return (
    <AuthContext.Provider value={propiedades}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
