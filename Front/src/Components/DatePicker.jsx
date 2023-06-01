import React, { useEffect, useState } from 'react';
import "./../Home/home.css";

const DatePicker = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date_from, dato_to }),
      });

      if (response.ok) {
        console.log('Fechas enviadas al backend correctamente');
      } else {
        console.error('Error al enviar las fechas al backend');
      }
    } catch (error) {
      console.error('Error al enviar las fechas al backend:', error);
    }
  };

  useEffect(() => {
    const startPicker = document.querySelector('.start-datepicker');
    const endPicker = document.querySelector('.end-datepicker');

    const startOptions = {
      format: 'yyyy-mm-dd',
      autoClose: true,
      onSelect: function (date) {
        setStartDate(date);
      }
    };

    const endOptions = {
      format: 'yyyy-mm-dd',
      autoClose: true,
      onSelect: function (date) {
        setEndDate(date);
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
    </div>
  );
};

export default DatePicker;
