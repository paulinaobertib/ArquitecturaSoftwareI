import React from "react";
import { useNavigate } from "react-router-dom";
import "./../Home/home.css";

const Card = ({ name, image, id }) => {

  const navigate =  useNavigate();
  
  const selectHotel = () => {
    navigate(`/hotel/${id}`);
  };

  return (
    <div className="eachCard">
        <section onClick={selectHotel}>
            <img src={image} alt="hotel"/>
        </section>
        <h6 className="nombreHotel">{name}</h6>
    </div>
  );
};

export default Card;