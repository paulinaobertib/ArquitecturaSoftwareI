import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthContextProvider";
import { BASE_URL } from "../configs";

const ProfilePage = () => {
  const { user, getUserBookings } = useContext(AuthContext);

  const [userBookings, setUserBookings] = useState([]);
  const [hotelNames, setHotelNames] = useState({});

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        if (user) {
          const bookingData = await getUserBookings(user.id);
          console.log("User Bookings:", bookingData);
          setUserBookings(bookingData);
          fetchHotelNames(bookingData.bookings);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getUserBookings]);

  const fetchHotelNames = async (bookings) => {
    const hotelIds = bookings.map((booking) => booking.hotel_id);
    const uniqueHotelIds = [...new Set(hotelIds)]; // Eliminar duplicados

    try {
      const hotelNamesMap = {};

      for (const hotelId of uniqueHotelIds) {
        const response = await fetch(`${BASE_URL}/hotel/${hotelId}`);
        const data = await response.json();
        hotelNamesMap[hotelId] = data.name;
      }

      setHotelNames(hotelNamesMap);
    } catch (error) {
      console.error("Error al obtener los nombres de los hoteles:", error);
    }
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {user?.name}</p>
      <p>Apellido: {user?.last_name}</p>
      <p>Email: {user?.email}</p>
      <h3>Reservas:</h3>
      {userBookings && (
        <ul>
          {userBookings?.bookings?.map((booking) => (
            <li key={booking.id}>
              <p>ID de reserva: {booking.id}</p>
              <p>Hotel: {hotelNames[booking.hotel_id]}</p>
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
