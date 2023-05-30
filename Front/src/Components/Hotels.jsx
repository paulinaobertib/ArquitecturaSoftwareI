import { useEffect, useState } from 'react'
import Card from "./Card"

const infoHotel = `http://localhost:8090/hotels`

const Hotels = () => {

    const [hotel, setHotel] = useState([])

    const getHotel = async () => {
        const response = await fetch(infoHotel);
        const resolve = await response.json();
        setHotel(resolve)
    }

    useEffect(() => {
        getHotel();
    },[])

    return (
        <div className='SeccionHoteles'>
            <div className='HotelCard'>
                {
                    hotel?.length ? hotel.map((hotel) => <Card key={hotel.id} name={hotel.name} image={hotel.image} id={hotel.id}/>): null
                }
            </div>
        </div>
    )
}

export default Hotels