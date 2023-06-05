import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { waait } from "../Components/helper";
import { AuthContext } from "../Providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state] = useState(true);
  const { handleRegister } = useContext(AuthContext);

  const onRegister = async () => {
    // Validar que todos los campos requeridos estén llenos
    if (!name || !userName || !lastName || !email || !password) {
      Swal.fire({
        title: "👀",
        text: "Por favor, complete todos los campos obligatorios",
        icon: "error",
        showClass: {
          popup: "animate_animated animate_fadeInDown",
        },
      });
      return;
    }

    // Validar el correo electrónico
    const isPSTVEmail = email.endsWith("@pstv.com");
    const rol = isPSTVEmail ? true : false; // Asignar el rol de administrador si es un correo de "@pstv.com"
    const isRegistered = await handleRegister(
      userName,
      password,
      email,
      name,
      rol,
      lastName,
      state === true
    );

    if (isRegistered) {
      await waait();
      Swal.fire({
        text: `Bienvenido ${name} ${lastName}`,
        icon: "success",
        showClass: {
          popup: "animate_animated animate_fadeInDown",
        },
      }).then(() => {
        navigate("/Login");
      });
    } else {
      Swal.fire({
        title: "👀",
        text: "No has ingresado todos los valores o tu correo o tu usuario ya se encuentra registrado",
        icon: "error",
        showClass: {
          popup: "animate_animated animate_fadeInDown",
        },
      }).then(() => {
        navigate("");
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h2">Registro</Typography>
      <TextField
        type="text"
        label="Name"
        placeholder="Ingrese su nombre"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        type="text"
        label="LastName"
        placeholder="Ingrese su apellido"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        placeholder="Ingrese su contraseña"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        type="text"
        label="Usuario"
        placeholder="Ingrese su usuario"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <TextField
        type="mail"
        label="Email"
        placeholder="Ingrese su correo electrónico"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button variant="contained" onClick={onRegister}>
        Registrarse
      </Button>
    </Box>
  );
}