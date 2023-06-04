import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../configs";
import "./product.css";
import { AuthContext } from "../Providers/AuthContextProvider";
import React from "react";

const BOOKING_URL = `${BASE_URL}/booking`;

const Product = () => {
  const { user } = useContext(AuthContext);
  const [hotel, setHotel] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const { id, startDate, endDate } = useParams();
  const infoHotel = `${BASE_URL}/hotel/${id}`;

  const getHotel = async () => {
    const response = await fetch(infoHotel);
    const resolve = await response.json();
    setHotel(resolve);
  };

  const getAmenities = async () => {
    if (hotel && hotel.id) {
      const response = await fetch(`${BASE_URL}/amenities/hotel/${hotel.id}`);
      const resolve = await response.json();
      setAmenities(resolve.amenities);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  useEffect(() => {
    getAmenities();
  }, [hotel]);

  //console.log(amenities);
  //console.log("ACAA mirame", Object.keys(amenities).length);

  const createBooking = async () => {
    const NewBooking = {
      user_id: user.id,
      date_from: new Date(startDate),
      date_to: new Date(endDate),
      hotel_id: hotel.id,
      
    };
    const createBookingResponse = await fetch(BOOKING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewBooking),
    });

    if (!createBookingResponse.ok) {
      throw new Error("Error al registrar el usuario");
    }
    const createdBooking = await createBookingResponse.json();
    console.log(createdBooking);
  };

  return (
    <div className="detailsHotel">
      <h1>Detalles del hotel seleccionado: </h1>
      <div className="detailEach">
        <img className="hotelImage" src={hotel?.image} alt="hotel" />
        <div className="details">
          <h3>{hotel?.name}</h3>
          <p>Id: {hotel?.id}</p>
          <p>Telefono: {hotel?.telephone}</p>
          <p>Email: {hotel?.email}</p>
          <p>Habitaciones disponibles: {hotel?.rooms}</p>
          <p className="description">{hotel?.description}</p>
          {user && startDate && endDate && (
            <button className="bookingButton" onClick={createBooking}>
              Reservar
            </button>
          )}
        </div>
      </div>
      <h5>Amenities</h5>
    </div>
  );
};

export default Product;
