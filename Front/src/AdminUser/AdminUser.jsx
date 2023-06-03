import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../configs";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const AdminUser = () => {

    const [AmenitieData, setAmenitieData] = useState({
        name: '',
        description: '',
      });

      const handleInputChange = (e) => {
        setAmenitieData({
          ...AmenitieData,
          [e.target.name]: e.target.value
        });
      };

      const addAmenitie = () => {
        fetch(`${BASE_URL}/amenitie`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(AmenitieData)
        })
        .then(response => {
          console.log(response); // Agrega esta línea para verificar la respuesta
          return response.json();
        })
        .then(data => {
          console.log('Amenidad agregada:', data);
          // Realizar cualquier otra acción después de agregar la amenidad
        })
        .catch(error => {
          console.error('Error al agregar la amenidad:', error);
        });
      }
      

  const [hotelData, setHotelData] = useState({
    name: '',
    telephone: '',
    email: '',
    rooms: '',
    description: '',
    availability: 1,
    image: '',
    amenities: {},
  });

  const [amenitiesList, setAmenitiesList] = useState([]);

  const getHotels = async () => {
    try {
      const response = await fetch(`${BASE_URL}/hotels`);
      const data = await response.json();
      console.log('Hoteles:', data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const getAmenities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/amenities`);
      const data = await response.json();
      setAmenitiesList(data.amenities || []);
      console.log('Amenities:', data.amenities);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    }
  };

  useEffect(() => {
    getHotels();
    getAmenities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'rooms') {
      // Verificar que el valor sea un número entero
      const intValue = parseInt(value);
      if (!isNaN(intValue)) {
        setHotelData((prevHotelData) => ({
          ...prevHotelData,
          [name]: intValue,
        }));
      }
    } else {
      setHotelData((prevHotelData) => ({
        ...prevHotelData,
        [name]: value,
      }));
    }
  };
  

  const handleAmenityChange = (amenityId) => {
    setHotelData((prevHotelData) => {
      const isChecked = prevHotelData.amenities[amenityId] || false;
      const updatedAmenities = { ...prevHotelData.amenities };
  
      if (isChecked) {
        // Remove the amenity
        delete updatedAmenities[amenityId];
      } else {
        // Add the amenity
        updatedAmenities[amenityId] = amenityId.toString(); // Convert amenityId to string
      }
  
      return {
        ...prevHotelData,
        amenities: updatedAmenities,
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const amenitiesArray = Object.keys(hotelData.amenities); // Convert amenities object to an array of keys (strings)
      const hotelDataWithArray = { ...hotelData, amenities: amenitiesArray };
  
      const response = await fetch(`${BASE_URL}/hotel`, {
        method: 'POST',
        body: JSON.stringify(hotelDataWithArray),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Nuevo hotel registrado:', data);
        setHotelData({
          name: '',
          telephone: '',
          email: '',
          rooms: '',
          description: '',
          availability: 1,
          image: '',
          amenities: {},
        });
      } else {
        console.error('Error al registrar el hotel:', response.status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  
  return (
    <div>
      <h1>PAGINA DE ADMINISTRADOR</h1>
      <div>
        <h2>Registrar un nuevo hotel</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="name" value={hotelData.name} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Teléfono:
            <input type="text" name="telephone" value={hotelData.telephone} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={hotelData.email} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Habitaciones:
            <input type="number" name="rooms" value={hotelData.rooms} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Descripción:
            <input type="text" name="description" value={hotelData.description} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Imagen:
            <input type="text" name="image" value={hotelData.image} onChange={handleChange} required />
          </label>
          <br />
          <label>Amenities:</label>
          <List>
            {amenitiesList.map((amenity) => (
              <ListItem key={amenity.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hotelData.amenities[amenity.id] || false}
                      onChange={() => handleAmenityChange(amenity.id)}
                    />
                  }
                  label={amenity.name}
                />
              </ListItem>
            ))}
          </List>
          <br />
          <button type="submit">Agregar Hotel</button>
        </form>
      </div>
      <div>
        <h2>Agregar Amenitie:</h2>
        <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={AmenitieData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Descripcion:
        <input
          type="text"
          name="description"
          value={AmenitieData.description}
          onChange={handleInputChange}
        />
      </label>
        <button onClick={addAmenitie}>Agregar</button>
        </div>
    </div>
  );
};

export default AdminUser;

