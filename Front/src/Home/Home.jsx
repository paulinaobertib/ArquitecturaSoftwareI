import Hotels from "../Components/Hotels";
import "./../Home/home.css";
import DatePicker from "../Components/DatePicker";

const Home = () => {

  return (
    <div>
      <h1>HOTELES</h1>
      <h6>Elija las fechas:</h6>
      <DatePicker />
      <h2>Todos los hoteles:</h2>
      <Hotels />
    </div>
  );
};

export default Home;

//METODO DE ENVIAR LAS FECHAS ES LO UNICO QUE FALLAAAAAAAAAA
