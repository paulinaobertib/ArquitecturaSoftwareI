package dto_test

import (
	"booking-api/dto"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBookingDto(t *testing.T) {
	// Crear una instancia del DTO de Booking, si modifico alguna y deja de ser igual, da la alerta
	bookingDto := dto.BookingDto{
		Id:       1,
		DateFrom: "2023/07/10",
		DateTo:   "2023/07/17",
		UserId:   1,
		HotelId:  1,
	}

	// Verificar los valores de los campos del DTO de Booking
	assert.Equal(t, 1, bookingDto.Id, "El ID de la reserva no coincide")
	assert.Equal(t, "2023/07/10", bookingDto.DateFrom, "La fecha de inicio no coincide")
	assert.Equal(t, "2023/07/17", bookingDto.DateTo, "La fecha de fin no coincide")
	assert.Equal(t, 1, bookingDto.UserId, "El ID del usuario no coincide")
	assert.Equal(t, 1, bookingDto.HotelId, "El ID del hotel no coincide")
}
