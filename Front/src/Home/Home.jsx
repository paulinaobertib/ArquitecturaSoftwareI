import Hotels from "../Components/Hotels";
import "./../Home/home.css";
import DatePicker from "../Components/DatePicker";

const Home = () => {

  return (
    <div>
      <h1>Hoteles</h1>
      <h6>Elija las fechas:</h6>
      <DatePicker />
      <Hotels />
    </div>
  );
};

export default Home;

//METODO DE ENVIAR LAS FECHAS ES LO UNICO QUE FALLAAAAAAAAAA
