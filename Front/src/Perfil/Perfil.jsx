import { useContext } from "react";
import { AuthContext } from "../Providers/AuthContextProvider";

const Perfil = () => {
  const { user, fetchCurrentUser } = useContext(AuthContext);

  fetchCurrentUser(); // Llamar a fetchCurrentUser al renderizar el componente

  return (
    <div>
      <h1>Perfil</h1>
      {user && (
        <div>
          <p>Nombre: {user.name}</p>
          <p>Apellido: {user.last_name}</p>
          <p>Nombre de usuario: {user.user_name}</p>
          <p>Email: {user.email}</p>
          <p>Reservas: {user.bookings}</p>
        </div>
      )}
    </div>
  );
};

export default Perfil;