import { createContext, useState} from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../configs";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        throw new Error("Error al obtener los detalles del usuario");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los detalles del usuario");
    }
  };

  const handleLogin = async (userName, password) => {
    const response = await fetch(`${BASE_URL}/user/user_name/${userName}`);
    const data = await response.json();

    if (data.user_name === userName && data.password === password) {
      setUser(data);
      return true;
    }
    return false;
  };

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

    if (data.email === email || data.userName === userName) {
      return false;
    }

    const newUser = {
      user_name: userName,
      password: password,
      email: email,
      name: name,
      rol: rol,
      last_name: lastName,
      state: state,
    };

    const createUserResponse = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!createUserResponse.ok) {
      throw new Error("Error al registrar el usuario");
    }

    const createdUser = await createUserResponse.json();
    setUser(createdUser);
    setUser(undefined);
    return true;
  };

  const propiedades = {
    user,
    handleLogin,
    logOut,
    handleRegister,
    getUser,
  };

  return (
    <AuthContext.Provider value={propiedades}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
