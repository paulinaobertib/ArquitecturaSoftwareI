package model

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCreateBooking(t *testing.T) {
	// Configurar el assert
	assert := assert.New(t)

	// Crear valores de prueba para User
	user := User{
		Id:       1,
		Name:     "Martin",
		LastName: "Martinez",
		UserName: "tinchoMartinez",
		Password: "password123",
		Email:    "martinMartinez@pstv.com",
		Rol:      true,
		State:    true,
	}

	// Crear valores de prueba para Hotel
	hotel := Hotel{
		Id:           1,
		Name:         "Amanecer Hotel",
		Telephone:    "123456789",
		Email:        "hotelAmanecer@amanecer.com",
		Rooms:        10,
		Description:  "Este es un hotel de ejemplo",
		Availability: 5,
	}

	// Crear una instancia de Booking con valores de prueba
	booking := Booking{
		Id:       1,
		DateFrom: time.Date(2023, time.July, 10, 0, 0, 0, 0, time.UTC),
		DateTo:   time.Date(2023, time.July, 17, 0, 0, 0, 0, time.UTC),
		User:     user,
		Hotel:    hotel,
	}

	// Verificar que DateFrom sea el 10 de julio de 2023
	expectedDateFrom := time.Date(2023, time.July, 10, 0, 0, 0, 0, time.UTC)
	assert.Equal(expectedDateFrom, booking.DateFrom, "Expected DateFrom to be %v", expectedDateFrom)

	// Verificar que DateTo sea el 17 de julio de 2023
	expectedDateTo := time.Date(2023, time.July, 17, 0, 0, 0, 0, time.UTC)
	assert.Equal(expectedDateTo, booking.DateTo, "Expected DateTo to be %v", expectedDateTo)

	// Verificar que Id de Booking
	assert.Equal(1, booking.Id, "Expected Id to be 1")

	// Verificar propiedades de User
	assert.Equal("Martin", booking.User.Name, "Expected User Name to be 'Martin'")
	assert.Equal("tinchoMartinez", booking.User.UserName, "Expected User UserName to be 'Martinez'")

	// Verificar propiedades de Hotel
	assert.Equal("Amanecer Hotel", booking.Hotel.Name, "Expected Hotel Name to be 'Amanecer Hotel'")
	assert.Equal(10, booking.Hotel.Rooms, "Expected Hotel Rooms to be 10")
}
