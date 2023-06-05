import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthContextProvider";

const ProfilePage = () => {
  const { user, getUser, getUserBookings } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user) {
          const userData = await getUser(user.id);
          console.log("User Details:", userData);
          setUserDetails(userData); // Actualizar solo los detalles del usuario
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserBookings = async () => {
      try {
        if (user) {
          const bookingData = await getUserBookings(user.id);
          console.log("User Bookings:", bookingData);
          setUserBookings(bookingData); // Actualizar solo las reservas del usuario
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
    fetchUserBookings();
  }, [user, getUser, getUserBookings]);

  if (!userDetails) {
    return <p>Cargando detalles del usuario...</p>;
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {userDetails.name}</p>
      <p>Apellido: {userDetails.last_name}</p>
      <p>Email: {userDetails.email}</p>
      <h3>Reservas:</h3>
      {userBookings.length > 0 ? (
        <ul>
          {userBookings[0].bookings.map((booking) => (
            <li key={booking.id}>
              <p>ID de reserva: {booking.id}</p>
              <p>Hotel: {booking.hotel_id}</p>
              <p>Usuario para corroborar: {booking.user_id}</p>
              <p>Fecha de ingreso: {booking.date_from}</p>
              <p>Fecha de salida: {booking.date_to}</p>
              <p>------------------</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron reservas.</p>
      )}
    </div>
  );
};

export default ProfilePage;
