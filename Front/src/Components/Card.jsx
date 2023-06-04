import "./../Home/home.css";

const Card = ({ name, image, onClick }) => {
  return (
    <div className="eachCard" onClick={onClick}>
      <img src={image} alt="hotel" />
      <h6 className="nombreHotel">{name}</h6>
    </div>
  );
};

export default Card;
