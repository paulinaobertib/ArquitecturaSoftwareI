package service_test

import (
	"booking-api/dto"
	"booking-api/model"
	"booking-api/service"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestInsertBooking(t *testing.T) {
	// Crear una instancia del DTO de Booking
	bookingDto := dto.BookingDto{
		UserId:   1,
		HotelId:  1,
		DateFrom: "2023/07/10",
		DateTo:   "2023/07/17",
	}

	// Crear una instancia del modelo de Booking
	expectedBooking := model.Booking{
		UserId:   bookingDto.UserId,
		HotelId:  bookingDto.HotelId,
		DateFrom: time.Date(2023, time.July, 10, 0, 0, 0, 0, time.UTC),
		DateTo:   time.Date(2023, time.July, 17, 0, 0, 0, 0, time.UTC),
	}

	// Llamar al método InsertBooking del servicio
	result, err := service.BookingService.InsertBooking(bookingDto)

	// Verificar que no haya ocurrido un error
	assert.Nil(t, err)

	// Verificar el resultado devuelto por el servicio
	assert.NotZero(t, result.Id)
	assert.Equal(t, expectedBooking.UserId, result.UserId)
	assert.Equal(t, expectedBooking.HotelId, result.HotelId)
	assert.Equal(t, expectedBooking.DateFrom, result.DateFrom)
	assert.Equal(t, expectedBooking.DateTo, result.DateTo)
}
