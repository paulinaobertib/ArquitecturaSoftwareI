import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Login() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = async () => {
    const isLoggedIn = await handleLogin(userName, password); // Pasar la contraseña ingresada
    if (isLoggedIn) {
      navigate("/home");
    } else {
      Swal.fire({
        text: `Usuario o Contraseña incorrecta`,
        icon: "warning",
      })
    }
  };

  // Este es el boton y lo dirige al registro
  const onRegisterClick = () => {
    navigate("/Register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h2">Login</Typography>
      <TextField
        label="Usuario"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant="contained" onClick={onLogin}>
        Login
      </Button>
      
      <Button variant="contained" onClick={onRegisterClick}>
        ¿Todavía no te registraste?
      </Button>
    </Box>
  );
}