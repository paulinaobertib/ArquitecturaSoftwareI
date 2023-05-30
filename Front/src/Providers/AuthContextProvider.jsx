import { createContext, useState } from "react";
import { BASE_URL } from "../configs";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
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

  // AuthContext guarda la info del usuario y la publica a toda la aplicacion.
  // Tambien crea el metodo handleLogin que se va a llamar cuando haga el login
  return (
    <AuthContext.Provider value={propiedades}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
