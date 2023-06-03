import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../configs";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

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
    navigate("/Home");
  };

  const handleRegister = async (
    userName,
    password,
    email,
    name,
    rol,
    lastName,
    state
  ) => {
    const response = await fetch(`${BASE_URL}/user/email/${email}`);
    const data = await response.json();

    if (data.email === email) {
      return false;
    }

    // Crear un nuevo usuario con los datos proporcionados desde el front
    const newUser = {
      user_name: userName,
      password: password,
      email: email,
      name: name,
      rol: rol,
      last_name: lastName,
      state: state,
    };

    // Crear un nuevo usuario con los datos proporcionados desde el front
    const createUserResponse = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!createUserResponse.ok) {
      // Ocurrió un error al registrar el usuario
      throw new Error("Error al registrar el usuario");
    }

    const createdUser = await createUserResponse.json();
    setUser(createdUser);
    setUser(undefined);
    return true; // Usuario registrado exitosamente
  };

  const propiedades = {
    user,
    handleLogin,
    logOut,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={propiedades}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
