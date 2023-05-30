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
        <p>{name}</p>
    </div>
  );
};

export default Card;