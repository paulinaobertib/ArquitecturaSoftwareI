import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const {handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = async () => {
    const isLoggedIn = await handleLogin(userName);
    if (isLoggedIn) {
      navigate("/home");
    } else {
      setError("Usuario no existente");
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
      {error && <Typography variant="h6">Usuario no existente</Typography>}
    </Box>
  );
}
