import Hotels from "../Components/Hotels";
import "./../Home/home.css";
import DatePicker from "../Components/DatePicker";
import { useState } from "react";

const Home = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <div>
      <h1>HOTELES</h1>
      <h6>Elija las fechas:</h6>
      <DatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <h2>Todos los hoteles:</h2>
      <Hotels startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default Home;

//METODO DE ENVIAR LAS FECHAS ES LO UNICO QUE FALLAAAAAAAAAA
