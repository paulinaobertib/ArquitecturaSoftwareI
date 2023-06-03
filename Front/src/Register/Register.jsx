import { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import { waait } from "../Components/helper";
import { AuthContext } from "../Providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rol, setRol] = useState(false);
  const [state] = useState(true);
  const { handleRegister } = useContext(AuthContext);

  const onRegister = async () => {
    const isRegistered = await handleRegister(
      userName,
      password,
      email,
      name,
      rol === true,
      lastName,
      state === true
    );

    if (isRegistered) {
      await waait();
      Swal.fire({
        text: `Bienvenido ${name + " " + lastName}`,
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      }).then(() => {
        navigate("/Login");
    })} else {
      Swal.fire({
        title: "👀",
        text: "No has ingresado todos los valores o tu mail ya se encuentra registrado",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      }).then(() => {
        navigate("/Login");
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
        placeholder="Ingrese su email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Select
        label="Rol"
        value={rol}
        placeholder="Su rol es"
        onChange={(event) => setRol(event.target.value === "admin")}
      >
        <MenuItem value="user">Usuario común</MenuItem>
        <MenuItem value="admin">Administrador</MenuItem>
      </Select>
      <Button variant="contained" onClick={onRegister}>
        Registrarse
      </Button>
    </Box>
  );
}
