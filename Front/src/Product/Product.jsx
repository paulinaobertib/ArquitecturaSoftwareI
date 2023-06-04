import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../configs";
import "./product.css";
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const { id } = useParams();
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
      setAmenities(resolve);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  useEffect(() => {
    getAmenities();
  }, [hotel]);

  console.log(amenities)

  return (
    <div className='detailsHotel'>
      <h1>Detalles del hotel seleccionado: </h1>
      <div className='detailEach'>
        <img src={hotel?.image} alt="hotel" />
        <div className='details'>
          <h3>{hotel?.name}</h3>
          <p>Id: {hotel?.id}</p>
          <p>Telefono: {hotel?.telephone}</p>
          <p>Email: {hotel?.email}</p>
          <p>Habitaciones disponibles: {hotel?.rooms}</p>
          <p className='description'>{hotel?.description}</p>
          <button className='bookingButton' onClick={() => navigate("/booking")}>Reservar</button>
        </div>
      </div>
      <div className='Amenities'>
        {amenities && Object.keys(amenities).length ? (
            <>
            <p>Nombre: {amenities.name}</p>
            <p>Descripción: {amenities.description}</p>
            </>
        ) : (
            <p>No hay amenities disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Product;
