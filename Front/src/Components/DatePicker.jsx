import React, { useEffect, useState } from 'react';
import "./../Home/home.css";
import { BASE_URL } from "../configs";

const DatePicker = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hotels, setHotels] = useState([]);
  const [hotelAvailability, setHotelAvailability] = useState({});

  const handleSubmit = async () => {
    try {
      const hotelsResponse = await fetch(`${BASE_URL}/hotels`);
      const hotelsData = await hotelsResponse.json();
      setHotels(hotelsData);

      const keys = Object.keys(hotelsData);
      for (const key of keys) {
        const hotel = hotelsData[key];
        for (const hotelA of hotel) {
          console.log("ACAA", hotel);
          const hotelID = hotelA.id;
          console.log("ACA ID", hotelID);

          const availabilityResponse = await fetch(`${BASE_URL}/booking/availability/${hotelID}/${startDate}/${endDate}`);
          const availabilityData = await availabilityResponse.json();

          setHotelAvailability(prevAvailability => ({
            ...prevAvailability,
            [hotelID]: availabilityData
          }));
        }
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
        
      </div>
      </div>
    </div>
  );
};

export default DatePicker;

