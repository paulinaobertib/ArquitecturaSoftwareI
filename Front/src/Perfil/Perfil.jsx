import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthContextProvider";

const ProfilePage = () => {
  const { user, getUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        if (user) {
          const userData = await getUser(user.id);
          setUserDetails(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getInfo();
  }, [user, getUser]);

  if (!userDetails) {
    return <p>Cargando detalles del usuario...</p>;
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {userDetails.userDetails.name || "-"}</p>
      <p>Apellido: {userDetails.userDetails.last_name || "-"}</p>
      <p>Email: {userDetails.userDetails.email || "-"}</p>
      <p>Usuario: {userDetails.userDetails.user_name || "-"}</p>
      <h1>Reservas:</h1>
      {userDetails.bookings ? (
        userDetails.bookings.map((booking) => (
          <div key={booking.id}>
            <p>ID de Reserva: {booking.id}</p>
            <p>Fecha Desde: {booking.dateFrom}</p>
            <p>Fecha Hasta: {booking.dateTo}</p>
            <p>Duración: {booking.duration}</p>
            <p>Precio: {booking.price}</p>
          </div>
        ))
      ) : (
        <p>No hay reservas disponibles</p>
      )}
    </div>
  );
};

export default ProfilePage;