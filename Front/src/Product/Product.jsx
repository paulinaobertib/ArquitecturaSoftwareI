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

  //console.log("start",startDate)
  //console.log("end",endDate)

  const startDateBooking = new Date(startDate);

  const year = startDateBooking.getFullYear();
  const month = startDateBooking.getMonth() + 1;
  const day = startDateBooking.getDate();

  const endDateBooking = new Date(endDate);

  const yearEnd = endDateBooking.getFullYear();
  const monthEnd = endDateBooking.getMonth() + 1;
  const dayEnd = endDateBooking.getDate();

  const formattedDateStart = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
  const formattedDateEnd = `${yearEnd}/${String(monthEnd).padStart(2, '0')}/${String(dayEnd).padStart(2, '0')}`;

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
    if (user && (!startDate || !endDate)) {
      Swal.fire({
        text: 'Seleccione las fechas en la home',
        icon: 'warning',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAmenities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel]);

  //console.log(amenities);
  //console.log("ACAA mirame", Object.keys(amenities).length);

  const createBooking = async () => {
    const newBooking = {
      user_id: user.id,
      date_from: formattedDateStart,
      date_to: formattedDateEnd,
      hotel_id: hotel.id,
    };
  
    try {
      const createBookingResponse = await fetch(BOOKING_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });
  
      if (!createBookingResponse.ok) {
        Swal.fire({
          text: "Registro del booking no se ha podido realizar",
          icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
        });
        throw new Error("Error al registrar el booking");
      }
  
      Swal.fire({
        text: "Registro del booking exitoso",
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      });
  
      const createdBooking = await createBookingResponse.json();
      console.log(createdBooking);
    } catch (error) {
      Swal.fire({
        text: "Ocurrió un error al realizar la reserva",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      });
      console.log(error);
    }
  };

  //console.log(formattedDateStart);

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