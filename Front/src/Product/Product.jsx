import React, { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../configs";
import "./product.css";
import { useNavigate } from 'react-router-dom';

const Product = () => {

    const navigate = useNavigate();

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
                <div className='details'>
                    <h3>{hotel?.name}</h3>
                    <p>Telefono: {hotel?.telephone}</p>
                    <p>Email: {hotel?.email}</p>
                    <p>Habitaciones disponibles: {hotel?.rooms}</p>
                    <p className='description'>{hotel?.description}</p>
                    <button className='bookingButton' onClick={ () => navigate("/booking")}>Reservar</button>
                </div>
            </div>
        </div>
    )
}

export default Product

//modificar para que el onclick me mande a una funcion que se fije si esta logueado, sino esta que me mande a loggin y si si esta que me mande a booking