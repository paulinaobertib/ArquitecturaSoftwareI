/*import React, { useEffect, useState } from 'react' 
import { useParams, Navigate } from 'react-router-dom';
//import { BASE_URL } from "../configs";

const Product = () => {

    const [hotel, setHotel] = useState()
    const {id} = useParams()

    const infoHotel = `./../jsonHoteles.json/${id}`;
    /*
    const infoHotel = `./jsonHoteles.json/${id}`;

    const getHotel = async () => {
        const response = await fetch(infoHotel);
        const resolve = await response.json();
        setHotel(resolve)
    }

    const getHotel = async () => {
        setHotel(infoHotel);
    };

    useEffect(() => {
        getHotel();
    },[])

    return (
        <div className='detailsHotel'>
            <h1>Detalles del hotel seleccionado: </h1>
            <div className='detailEach'>
                <img src="./hotel.png" alt="hotel"/>
                <p>{hotel?.name}</p>
                <p>{hotel?.telephone}</p>
                <p>{hotel?.email}</p>
                <p>{hotel?.rooms}</p>
                <p>{hotel?.description}</p>
            </div>
        </div>
    )
}

export default Product
*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa el hook useParams para obtener el ID de la URL

function Product() {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getHotel = async () => {
      try {
        const response = await fetch('./../jsonHoteles.json');
        const data = await response.json();
        const foundHotel = data.find(hotel => hotel.id === id);
        setHotel(foundHotel);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    getHotel();
  }, [id]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detailsHotel">
      <h1>Detalles del hotel seleccionado:</h1>
      <div className="detailEach">
        <img src={hotel.image} alt="hotel" />
        <p>{hotel.name}</p>
        <p>{hotel.telephone}</p>
        <p>{hotel.email}</p>
        <p>{hotel.rooms}</p>
        <p>{hotel.description}</p>
      </div>
    </div>
  );
}

export default Product;