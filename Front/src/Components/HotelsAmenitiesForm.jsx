import React, { useEffect, useState } from "react";
import { FormControlLabel, Checkbox, MenuItem, Button, InputLabel, Select } from "@mui/material";
import { BASE_URL } from "../configs";
import Swal from "sweetalert2";

const HotelsAmenitiesForm = () => {
  const [hotels, setHotels] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const getHotels = async () => {
    try {
        const response = await fetch(`${BASE_URL}/hotels`);
        const data = await response.json();
        setHotels(data.hotels);
    } catch (error) {
        console.error('Error al obtener los hoteles:', error);
        Swal.fire({
            text: `Error al obtener los hoteles existentes`,
            icon: "error",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
        })
    }
};

const getAmenities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/amenities`);
        const data = await response.json();
        setAmenities(data.amenities);
    } catch (error) {
        console.error('Error al obtener las amenities:', error);
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
    // Obtener lista de hoteles
    getHotels();

    // Obtener lista de amenities
    getAmenities();
  }, []);

  //console.log("HOTELES", typeof hotels);
  //console.log("AMENITIES", typeof amenities);

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const handleAmenityChange = (event) => {
    const amenityId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedAmenities((prevSelectedAmenities) => [
        ...prevSelectedAmenities,
        amenityId,
      ]);
    } else {
      setSelectedAmenities((prevSelectedAmenities) =>
        prevSelectedAmenities.filter((id) => id !== amenityId)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realizar la solicitud PUT al backend con los datos seleccionados
    const hotelId = selectedHotel;
    const selectedAmenitiesIds = selectedAmenities;

    fetch(`${BASE_URL}/hotel/${hotelId}/add-amenitie/${selectedAmenitiesIds}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
            text: 'Registro de las amenities del hotel realizado con éxito',
            icon: 'success',
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
          });
      })
      .catch((error) => console.error(error));
  };

  //console.log(hotels);

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <InputLabel id="hotel-select-label">Seleccione un hotel:</InputLabel>
      {hotels?.length ? (
        <Select
          labelId="hotel-select-label"
          id="hotel-select"
          value={selectedHotel}
          onChange={handleHotelChange}
        >
          {hotels.map((hotel) => (
            <MenuItem key={hotel.id} value={hotel.id}>
              {hotel.name}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <p>No hay hoteles disponibles</p>
      )}
      </div>
      <div>
        <p>Seleccione las amenities:</p>
        {Object.entries(amenities).map(([amenityId, amenity]) => (
          <FormControlLabel
            key={amenityId}
            control={
              <Checkbox
                checked={selectedAmenities.includes(amenityId)}
                onChange={handleAmenityChange}
                value={amenityId}
              />
            }
            label={amenity.name}
          />
        ))}
      </div>
      <Button type="submit" variant="contained" color="primary">
        Guardar
      </Button>
    </form>
  );
};

export default HotelsAmenitiesForm;



