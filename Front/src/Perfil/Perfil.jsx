import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthContextProvider";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const { getUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user) {
          const userData = await getUser(user.id);
          setUserDetails(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  });

  if (!userDetails) {
    return <p>Cargando detalles del usuario...</p>;
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {userDetails.name}</p>
      <p>Apellido: {userDetails.last_name}</p>
      <p>Email: {userDetails.email}</p>
      <p>Reservas: {userDetails.booking}</p>
    </div>
  );
};

export default ProfilePage;
