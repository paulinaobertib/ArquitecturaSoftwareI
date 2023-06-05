import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../configs";

const BookingsUsers = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getBookings();
    getUsers();
    getHotels();
  }, []);

  const getBookings = async () => {
    const response = await fetch(`${BASE_URL}/bookings`);
    const data = await response.json();
    setBookings(data.bookings);
  };

  const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    setUsers(data);
    console.log(data)
  };

  //console.log(users);

  const getHotels = async () => {
    const response = await fetch(`${BASE_URL}/hotels`);
    const data = await response.json();
    setHotels(data.hotels);
  };

  const getUsernameById = (userId) => {
    if (!users || users.length === 0) {
      return ''; // Si los datos de usuarios no están disponibles aún, retorna una cadena vacía
    }
    const user = users.find((user) => user.id === userId);
    return user ? user.user_name : '';
  };

  const getHotelNameById = (hotelId) => {
    if (!hotels || hotels.length === 0) {
      return ''; // Si los datos de hoteles no están disponibles aún, retorna una cadena vacía
    }
    const hotel = hotels.find((hotel) => hotel.id === hotelId);
    return hotel ? hotel.name : '';
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date From</th>
            <th>Date To</th>
            <th>User</th>
            <th>Hotel</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.date_from}</td>
              <td>{booking.date_to}</td>
              <td>{getUsernameById(booking.user_id)}</td>
              <td>{getHotelNameById(booking.hotel_id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsUsers;