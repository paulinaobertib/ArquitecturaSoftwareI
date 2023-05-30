import { useEffect, useState } from 'react'
import Card from "./Card"
import data from './../jsonHoteles.json';
import "./../Home/home.css";
//import { BASE_URL } from "../configs";

//const infoHotel = `./jsonHoteles.json`;

const Hotels = () => {

    const [hotel, setHotel] = useState([])

    /*const getHotel = async () => {
        const response = await fetch(infoHotel);
        const resolve = await response.json();
        setHotel(resolve)
    }*/

    const getHotel = async () => {
        setHotel(data);
    };

    useEffect(() => {
        getHotel();
    },[])

    return (
        <div className='SeccionHoteles'>
            <div className='HotelCard'>
                {
                    hotel?.length ? hotel.map((hotel) => <Card key={hotel.id} name={hotel.name} id={hotel.id}/>): null
                }
            </div>
        </div>
    )
}

export default Hotels