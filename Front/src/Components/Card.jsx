import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ name, image, id }) => {

  const navigate =  useNavigate();
  
  const selectHotel = () => {
    navigate(`/home/hotel/${id}`);
  };

  const imageURL = {image};

  return (
    <div className="eachCard">
        <section onClick={selectHotel}>
            <img src={imageURL} alt="hotel"/>
        </section>
        <p>{id}</p>
        <p>{name}</p>
    </div>
  );
};

export default Card;