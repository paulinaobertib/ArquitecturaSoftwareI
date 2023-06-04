import React, { useEffect, useState } from "react";
import { FormControlLabel, Checkbox, MenuItem, Button, TextField } from "@mui/material";
import { BASE_URL } from "../configs";

const HotelForm = () => {
  const [hotels, setHotels] = useState({});
  const [amenities, setAmenities] = useState({});
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    // Obtener lista de hoteles
    fetch(`${BASE_URL}/hotels`)
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error(error));

    // Obtener lista de amenities
    fetch(`${BASE_URL}/amenities`)
      .then((response) => response.json())
      .then((data) => setAmenities(data))
      .catch((error) => console.error(error));
  }, []);

  //console.log("HOTELES", hotels);
  //console.log("AMENITIES", amenities);

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
        // Aquí puedes manejar la respuesta del backend después de guardar los datos
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="hotel-select">Seleccione un hotel:</label>
        <select id="hotel-select" value={selectedHotel} onChange={handleHotelChange}>
          {Object.entries(hotels).map(([hotelId, hotel]) => (
            <option key={hotelId} value={hotelId}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Seleccione las comodidades:</p>
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

export default HotelForm;



