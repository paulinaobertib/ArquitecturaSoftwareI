package dto_test

import (
	"booking-api/dto"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBookingDto(t *testing.T) {
	// Crear una instancia del DTO de Booking
	bookingDto := dto.BookingDto{
		Id:       1,
		DateFrom: "2023-07-10",
		DateTo:   "2023-07-17",
		UserId:   1,
		HotelId:  1,
	}

	// Verificar los valores de los campos del DTO de Booking
	assert.Equal(t, 1, bookingDto.Id)
	assert.Equal(t, "2023-07-10", bookingDto.DateFrom)
	assert.Equal(t, "2023-07-17", bookingDto.DateTo)
	assert.Equal(t, 1, bookingDto.UserId)
	assert.Equal(t, 1, bookingDto.HotelId)
}
