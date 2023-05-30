import { useContext } from "react";
import Hotels from "../Components/Hotels";
import { AuthContext } from "../Providers/AuthContextProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    /*<div>
       {user ? (
        //<h1>Hoteles para {user.name}</h1>
      //) : (
        //"Por favor inicia sesion para continuar"
      //)}
      <Hotels />
    </div>*/
    <div>
      <Hotels />
    </div>
  );
};

export default Home;
