import React, { useState } from 'react'

const BookingsUsers = () => {

    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {
        const response = await fetch(`${BASE_URL}/bookings`);
        const resolve = await response.json();
        setBookings(resolve);
    };

  return (
    <h1>BookingsUsers</h1>
  )
}

export default BookingsUsers