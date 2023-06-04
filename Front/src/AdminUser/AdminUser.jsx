import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../configs";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import HotelsAmenitiesForm from "./../Components/HotelsAmenitiesForm";
import BookingsUsers from "./../Components/BookingsUsers";

const AdminUser = () => {

  //PARTE PARA AGREGAR AMENITIE NUEVA
  const [amenitieData, setAmenitieData] = useState({
    name: '',
    description: '',
  });
  const [formSubmittedAmenitie, setFormSubmittedAmenitie] = useState(false);
  const [existingAmenities, setExistingAmenities] = useState([]);

  useEffect(() => {
    fetchExistingAmenities();
  }, []);

  const fetchExistingAmenities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/amenities`);
      const data = await response.json();
      setExistingAmenities(data.amenities);
    } catch (error) {
      console.error('Error al obtener las amenities existentes:', error);
      Swal.fire({
        text: `Error al obtener las amenities existentes`,
        icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      })
    }
  };

  useEffect(() => {
    if (formSubmittedAmenitie) {
      addAmenitie();
    }
  }, [formSubmittedAmenitie]);

  const handleInputChange = (e) => {
    setAmenitieData({
      ...amenitieData,
      [e.target.name]: e.target.value,
    });
  };

  const addAmenitie = () => {
    const existingAmenity = existingAmenities.find(
      (amenity) => amenity.name.toLowerCase() === amenitieData.name.toLowerCase()
    );

    if (existingAmenity) {
      Swal.fire({
        text: 'La amenitie ya existe',
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
      });
      setFormSubmitted(false);
      return;
    }

    fetch(`${BASE_URL}/amenitie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(amenitieData),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log('Amenidad agregada:', data);
        Swal.fire({
          text: 'Amenitie registrada con éxito',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
        });
      })
      .catch((error) => {
        console.error('Error al agregar la amenidad:', error);
        Swal.fire({
          text: 'La amenitie no se ha podido registrar',
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
        });
      })
      .finally(() => {
        setFormSubmittedAmenitie(false);
      });
  };

  const handleSubmitAmenitie = (event) => {
    event.preventDefault();
    setFormSubmittedAmenitie(true);
  };
      
  //PARTE PARA AGREGAR UN HOTEL NUEVO
  const [hotelData, setHotelData] = useState({
    name: '',
    telephone: '',
    email: '',
    rooms: 0,
    description: '',
    availability: 1,
    image: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      addHotel();
    }
  }, [formSubmitted]);

  const addHotel = async () => {
    const parsedHotelData = {
      ...hotelData,
      rooms: parseInt(hotelData.rooms),
    };

    try {
      const response = await fetch(`${BASE_URL}/hotel`, {
        method: 'POST',
        body: JSON.stringify(parsedHotelData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Hotel agregado exitosamente');
        Swal.fire({
          text: 'Hotel registrado con éxito',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
        });
      } else {
        console.log('Error al agregar el hotel');
        Swal.fire({
          text: 'El hotel no se ha podido registrar',
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
        });
      }
    } catch (error) {
      console.log('Error de red:', error);
    } finally {
      setFormSubmitted(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };
  
  //PARTE PARA AGREGAR LAS AMENITIES AL HOTEL EN COMPONENTS/HOTELSAMENITIESFORM

  return (
    <div>
      <h1>PAGINA DE ADMINISTRADOR</h1>
      <div>
        <h2>Registrar un nuevo hotel</h2>
        <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Telephone:
        <input
          type="text"
          name="telephone"
          value={hotelData.telephone}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={hotelData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Rooms:
        <input
          type="text"
          name="rooms"
          value={hotelData.rooms}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={hotelData.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <br />
      <br />
      <label>
        Image:
        <input
          type="text"
          name="image"
          value={hotelData.image}
          onChange={handleChange}
        />
      </label>
      <br />
      <Button variant="contained" color="primary">Agregar Hotel</Button>
    </form>
      </div>
      <div>
      <h2>Registrar las amenities del hotel:</h2>
      <HotelsAmenitiesForm />
      </div>
      <div>
        <h2>Agregar Amenitie:</h2>
        <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={amenitieData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Descripcion:
        <input
          type="text"
          name="description"
          value={amenitieData.description}
          onChange={handleInputChange}
        />
      </label>
        <Button variant="contained" color="primary" onClick={handleSubmitAmenitie}>Agregar Amenitie</Button>
        </div>
        <div>
          <h2>Reservas de los usuarios:</h2>
          <BookingsUsers />
        </div>
    </div>
  );
};

export default AdminUser;

//modificar el codigo para que primero me deje registrar el hotel sin la amenitie
//despues poner una lista de los hoteles para que elija uno, me agarre su id y con el put agregar amenitie
//dejar el agregar amenitie nueva como esta que funciona bien
//mostrar todas las reservas hechas por todos los usuarios
//si esto sale, pide filtro por hotel y por dia ¿?