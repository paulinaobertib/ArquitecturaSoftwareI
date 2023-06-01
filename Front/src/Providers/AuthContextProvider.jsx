import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../configs";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const handleLogin = async (userName, password) => {
    const response = await fetch(`${BASE_URL}/user/${userName}`);
    const data = await response.json();
    // en este if tengo el problema, con id me lo toma pero con username o user_name o user no lo toma
    // lo logico seria if(data.username === userName && ...) que ande pero nop
    if (data.id && data.password === password) {
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
