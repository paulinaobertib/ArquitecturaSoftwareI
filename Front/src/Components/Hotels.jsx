import { useEffect, useState } from "react";
import Card from "./Card";
import "./../Home/home.css";
import { BASE_URL } from "../configs";
import { useNavigate } from "react-router-dom";

const infoHotel = `${BASE_URL}/hotels`;

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  const getHotels = async () => {
    try {
      const response = await fetch(infoHotel);
      const data = await response.json();
      setHotels(data.hotels);
    } catch (error) {
      console.error("Error al obtener los hoteles:", error);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  console.log(hotels);

  return (
    <div className="SeccionHoteles">
      <div className="HotelCard">
        {hotels?.length ? (
          hotels.map((hotel) => (
            <Card
              key={hotel.id}
              name={hotel.name}
              image={hotel.image}
              onClick={() => navigate(`/hotel/${hotel.id}`)}
            />
          ))
        ) : (
          <p>No hay hoteles disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
