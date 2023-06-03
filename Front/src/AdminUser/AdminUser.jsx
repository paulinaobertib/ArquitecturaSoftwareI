import React, { useState, useEffect } from 'react'
import { BASE_URL } from "../configs";
import { MenuItem, TextField } from '@mui/material';

const AdminUser = () => {

    const [hotelData, setHotelData] = useState({
        name: "",
        telephone: "",
        email: "",
        rooms: "",
        description: "",
        image:"",
        availability: 1,
        amenities: [],
      });
    
    const [amenitiesList, setAmenitiesList] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    
    const getAmenities = async () => {
        try {
          const response = await fetch(`${BASE_URL}/amenities`);
          const resolve = await response.json();
          setAmenitiesList(resolve);
        } catch (error) {
          console.error('Error fetching amenities:', error);
        }
    };
    
    useEffect(() => {
        getAmenities();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'rooms' ? parseInt(value) : value;
      
        setHotelData((prevHotelData) => ({
          ...prevHotelData,
          [name]: parsedValue,
        }));
    };

    const handleAmenityChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setHotelData((prevHotelData) => ({
            ...prevHotelData,
            amenities: [...prevHotelData.amenities, value],
          }));
        } else {
          setHotelData((prevHotelData) => ({
            ...prevHotelData,
            amenities: prevHotelData.amenities.filter((amenity) => amenity !== value),
          }));
        }
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const dataToSend = {
            ...hotelData,
            amenities: selectedAmenities,
        };
    
        //Lamada al back para cargar los hoteles
        fetch(`${BASE_URL}/hotel`, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Hotel registrado exitosamente:", data);
            setHotelData({
                name: "",
                telephone: "",
                email: "",
                rooms: "",
                description: "",
                image:"",
                amenities: [],
            });
            setSelectedAmenities([]);
        })
        .catch((error) => {
            console.error("Error al registrar el hotel:", error);
        });
    };

    return (
        <div>
            <h1>PAGINA DE ADMINISTRADOR</h1>
            <div>
                <h2>Registrar un nuevo hotel</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={hotelData.name}
                        onChange={handleChange}
                    />
                    </label>
                    <br />
                    <label>
                    Telefono:
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
                    Descripción:
                    <textarea
                        name="description"
                        value={hotelData.description}
                        onChange={handleChange}
                    ></textarea>
                    </label>
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
                    <TextField
                        id="amenities"
                        select
                        label="Amenities"
                        value={hotelData.amenities}
                        onChange={handleAmenityChange}
                    >
                        {amenitiesList.map((amenity) => (
                        <MenuItem key={amenity.id} value={amenity.id}>
                            {amenity.name}
                        </MenuItem>
                        ))}
                    </TextField>
                    <br/>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </div>
  )
}

export default AdminUser