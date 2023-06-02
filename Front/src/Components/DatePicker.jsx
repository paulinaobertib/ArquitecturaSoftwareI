import React, { useEffect, useState } from 'react';
import "./../Home/home.css";
import { BASE_URL } from "../configs";

const DatePicker = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hotel, setHotel] = useState([]);
  const [hotelAvailability, setHotelAvailability] = useState([]);

  const handleSubmit = async () => {
    try {
      // Obtener todos los hoteles
      const hotelsResponse = await fetch(`${BASE_URL}/hotels`);
      const hotelsData = await hotelsResponse.json();
      setHotel(hotelsData);
  
      // Realizar la solicitud de disponibilidad para cada hotel
      for (const hotel of hotelsData) {
        const hotelID = hotel.id;
        const availabilityResponse = await fetch(`${BASE_URL}/booking/availability/${hotelID}/dates?date_from=${startDate}&date_to=${endDate}`);
        const availabilityData = await availabilityResponse.json();
  
        // Actualizar el estado de disponibilidad para cada hotel
        // Puedes utilizar un objeto o una matriz para almacenar los datos de disponibilidad de cada hotel
        // Aquí se utiliza un objeto con el ID del hotel como clave
        setHotelAvailability(prevAvailability => ({
          ...prevAvailability,
          [hotelID]: availabilityData
        }));
      }
    } catch (error) {
      console.error('Error al obtener los hoteles o la disponibilidad:', error);
    }
  };

  useEffect(() => {
    const startPicker = document.querySelector('.start-datepicker');
    const endPicker = document.querySelector('.end-datepicker');

    const startOptions = {
      format: 'yyyy-mm-dd',
      autoClose: true,
      onSelect: function (startDate) {
        setStartDate(startDate);
      }
    };

    const endOptions = {
      format: 'yyyy-mm-dd',
      autoClose: true,
      onSelect: function (endDate) {
        setEndDate(endDate);
      }
    };

    window.M.Datepicker.init(startPicker, startOptions);
    window.M.Datepicker.init(endPicker, endOptions);

    return () => {
      window.M.Datepicker.getInstance(startPicker).destroy();
      window.M.Datepicker.getInstance(endPicker).destroy();
    };
  }, []);

  return (
    <div className='dateDiv'>
      <section className='datePicker'>
        <section className='datePickerSection'>
          <label htmlFor="start-date">Fecha Desde</label>
          <input type="text" id="start-date" className="start-datepicker" />
        </section>
        <section className='datePickerSection'>
          <label htmlFor="end-date">Fecha Hasta</label>
          <input type="text" id="end-date" className="end-datepicker" />
        </section>
      </section>
      <button onClick={handleSubmit} className="dateButton">Enviar fechas</button>
      <div className='SeccionHoteles'>
        <h2>Hoteles en las fechas seleccionadas</h2>
        <div className='HotelCard'>
          {
            hotelAvailability?.length ? hotelAvailability.map((hotel) => <Card key={hotelAvailability.id} name={hotelAvailability.name} image={hotelAvailability.image} id={hotelAvailability.id}/>): null
          }
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
