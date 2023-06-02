import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../configs";

export const AuthContext = createContext();

const AuthContextRegister = ({ children }) => {
  const [user, setUser] = useState();

  const handleRegister = async (userName, password, email, name, rol, lastName) => {

    const response = await fetch(`${BASE_URL}/user/email/${email}`);
    const data = await response.json();

    if (data.email === email) {
      return false;
    }

    // Crear un nuevo usuario con los datos proporcionados desde el front
    const createUserResponse = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userName, password, email, name, rol, lastName),
    });

    if (!createUserResponse.ok) {
      // Ocurrió un error al registrar el usuario
      throw new Error("Error al registrar el usuario");
    }

    const newUser = await createUserResponse.json();
    setUser(newUser);
    return true; // Usuario registrado exitosamente
  };

  const propiedades = {
    user,
    handleRegister,
  };

  return (
    <AuthContext.Register value={propiedades}>{children}</AuthContext.Register>
  );
};

AuthContextRegister.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextRegister;
