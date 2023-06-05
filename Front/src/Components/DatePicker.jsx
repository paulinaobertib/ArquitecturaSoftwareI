import React, { useEffect, useState } from "react";
import "./../Home/home.css";
import { BASE_URL } from "../configs";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import Hotels from "./Hotels";

const DatePicker = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [hotelsShow, setHotelsShow] = useState([]);
  const [hotelAvailability, setHotelAvailability] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  console.log(startDate, endDate);

  const handleSubmit = async () => {
    try {
      const hotelsResponse = await fetch(`${BASE_URL}/hotels`);
      const hotelsData = await hotelsResponse.json();
      setHotels(hotelsData);

      const keys = Object.keys(hotelsData);
      for (const key of keys) {
        const hotel = hotelsData[key];
        for (const hotelA of hotel) {
          //console.log("ACAA", hotel);
          //console.log("hotela", hotelA);
          const hotelID = hotelA.id;
          //console.log("ACA ID", hotelID);

          const availabilityResponse = await fetch(
            `${BASE_URL}/booking/availability/${hotelID}/${startDate}/${endDate}`
          );
          const availabilityData = await availabilityResponse.json();

          if (availabilityData.rooms_available > 0) {
            setHotelsShow((prevHotels) => [...prevHotels, hotelA]);
            //console.log("si entro");
          } else {
            console.log("no hay");
          }

          setHotelAvailability((prevAvailability) => ({
            ...prevAvailability,
            [hotelID]: availabilityData,
          }));

          //console.log("MIRA SI SIRVE", availabilityData);
        }
      }

      //console.log("MIRA MIRA", hotelsShow);
      //console.log("ACA VER IMP",Object.keys(hotelAvailability).length);
    } catch (error) {
      console.error("Error al obtener los hoteles o la disponibilidad:", error);
    }
  };

  useEffect(() => {
    const startPicker = document.querySelector(".start-datepicker");
    const endPicker = document.querySelector(".end-datepicker");

    const startOptions = {
      format: "yyyy-mm-dd",
      autoClose: true,
      onSelect: function (startDate) {
        setStartDate(startDate);
      },
    };

    const endOptions = {
      format: "yyyy-mm-dd",
      autoClose: true,
      onSelect: function (endDate) {
        setEndDate(endDate);
      },
    };

    window.M.Datepicker.init(startPicker, startOptions);
    window.M.Datepicker.init(endPicker, endOptions);

    return () => {
      window.M.Datepicker.getInstance(startPicker).destroy();
      window.M.Datepicker.getInstance(endPicker).destroy();
    };
  }, []);

  //console.log("AHORA", hotelsShow.length);
  //console.log("ACA VER",hotelAvailability.length);
  //console.log("ACA MIRA", Object.values(hotelAvailability));

  return (
    <div className="dateDiv">
      <section className="datePicker">
        <section className="datePickerSection">
          <label htmlFor="start-date">Fecha Desde</label>
          <input type="text" id="start-date" className="start-datepicker" />
        </section>
        <section className="datePickerSection">
          <label htmlFor="end-date">Fecha Hasta</label>
          <input type="text" id="end-date" className="end-datepicker" />
        </section>
      </section>
      <button onClick={handleSubmit} className="dateButton">
        Enviar fechas
      </button>
      <div className="SeccionHoteles">
        <h2>Hoteles en las fechas seleccionadas:</h2>
        <div className="HotelCard">
          {hotelsShow.length ? (
            hotelsShow.map((hotel) => (
              <Card
                key={hotel.id}
                name={hotel.name}
                image={hotel.image}
                onClick={() => navigate(`/hotel/${hotel.id}/${startDate}/${endDate}`)}
              />
            ))
          ) : (
            <p>No hay hoteles disponibles</p>
          )}
        </div>
      </div>
      <h2>Todos los hoteles:</h2>
      <Hotels startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default DatePicker;
