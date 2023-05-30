import React, { useEffect, useState } from 'react' 
import { useParams, Navigate } from 'react-router-dom';
import { BASE_URL } from "../configs";

const Product = () => {

    const [hotel, setHotel] = useState()
    const {id} = useParams()
    
    const infoHotel = `${BASE_URL}/hotel/${id}`;

    const getHotel = async () => {
        const response = await fetch(infoHotel);
        const resolve = await response.json();
        setHotel(resolve)
    }

    useEffect(() => {
        getHotel();
    },[])

    return (
        <div className='detailsHotel'>
            <h1>Detalles del hotel seleccionado: </h1>
            <div className='detailEach'>
                <img src={hotel?.image} alt="hotel"/>
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
