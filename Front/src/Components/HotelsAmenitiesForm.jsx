import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { BASE_URL } from "../configs";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const HotelsAmenitiesForm = () => {
  const [hotels, setHotels] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState({});

  useEffect(() => {
    fetchHotels();
    fetchAmenities();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch(`${BASE_URL}/hotels`);
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error al obtener los hoteles:', error);
    }
  };

  const fetchAmenities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/amenities`);
      const data = await response.json();
      setAmenities(data);
    } catch (error) {
      console.error('Error al obtener las amenidades:', error);
    }
  };

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const handleAmenityChange = (amenityId) => {
    setSelectedAmenities((prevAmenities) => ({
      ...prevAmenities,
      [amenityId]: !prevAmenities[amenityId]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const promises = Object.entries(selectedAmenities).map(([amenityId, checked]) => {
        if (checked) {
          return fetch(`${BASE_URL}/hotel/${selectedHotel}/add-amenitie/${amenityId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
        return null;
      });

      await Promise.all(promises.filter(promise => promise !== null));

      Swal.fire({
        text: 'Amenidades agregadas al hotel con éxito',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
      });
    } catch (error) {
      console.error('Error al agregar las amenidades al hotel:', error);
      Swal.fire({
        text: 'Error al agregar las amenidades al hotel',
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="hotel-select">Selecciona un hotel:</label>
        <Select
          id="hotel-select"
          value={selectedHotel}
          onChange={handleHotelChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Seleccione</em>
          </MenuItem>
          {hotels.map((hotel) => (
            <MenuItem key={hotel.id} value={hotel.id}>
              {hotel.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <label>Amenidades:</label>
        <List>
          {amenities.map((amenity) => (
            <ListItem key={amenity.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAmenities[amenity.id] || false}
                    onChange={() => handleAmenityChange(amenity.id)}
                  />
                }
                label={amenity.name}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <Button variant="contained" color="primary" type="submit">
        Agregar Amenidades al Hotel
      </Button>
    </form>
  );
};

export default HotelsAmenitiesForm;