import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../configs";
import "./product.css";
import { AuthContext } from "../Providers/AuthContextProvider";
import React from "react";
import Swal from "sweetalert2";

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
    if (user) {
      Swal.fire({
        text: 'Seleccione las fechas en la home',
        icon: 'warning',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
      });
    }
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
      Swal.fire({
        text: 'Registro del booking no se ha podido realizar',
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
      });
      throw new Error("Error al registrar el booking");
    } else {
      Swal.fire({
        text: 'Registro del booking exitoso',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
      });
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
      <div className="Amenities">
        {amenities?.length ? (
            amenities.map((amenitie) => (
              <React.Fragment key={amenitie.id}>
              <p>Nombre: {amenitie.name}</p>
              <p>Descripcion: {amenitie.description}</p>
              </React.Fragment>
            ))
          ) : (
            <p>El hotel no tiene amenities</p>
          )}
      </div>
    </div>
  );
};

export default Product;