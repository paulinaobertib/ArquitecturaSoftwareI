import { useEffect, useContext, useState } from "react";

import { AuthContext } from "../Providers/AuthContextProvider";

const ProfilePage = () => {
  const { user, getUserBookings } = useContext(AuthContext);

  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        if (user) {
          const bookingData = await getUserBookings(user.id);
          console.log("User Bookings:", bookingData);
          setUserBookings(bookingData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getUserBookings]);

  if (!user) {
    return <p>Cargando detalles del usuario...</p>;
  }
  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {user.name}</p>
      <p>Apellido: {user.last_name}</p>
      <p>Email: {user.email}</p>
      <h3>Reservas:</h3>
      {userBookings && (
        <ul>
          {userBookings?.bookings?.map((booking) => (
            <li key={booking.id}>
              <p>ID de reserva: {booking.id}</p>
              <p>Hotel: {booking.hotel_id}</p>
              <p>Fecha de ingreso: {booking.date_from}</p>
              <p>Fecha de salida: {booking.date_to}</p>
              <p>------------------</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
