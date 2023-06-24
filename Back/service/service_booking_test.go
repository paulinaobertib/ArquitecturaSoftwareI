package service_test

import (
	"booking-api/dto"
	"booking-api/service"
	e "booking-api/utils/errors"
	"net/http"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

type TestBookings struct {
}

func (t *TestBookings) InsertBooking(bookingDto dto.BookingDto) (dto.BookingDto, e.ApiError) {
	if bookingDto.UserId == 0 {
		return dto.BookingDto{}, e.NewApiError("Error al insertar la reserva", "booking_insert_error", http.StatusInternalServerError, nil)
	}

	return bookingDto, nil
}

func (t *TestBookings) GetBookingById(id int) (dto.BookingDto, e.ApiError) {
	if id == 1 {
		return dto.BookingDto{
			Id:       1,
			DateFrom: "2023/06/25",
			DateTo:   "2023/06/30",
			UserId:   1,
			HotelId:  2,
		}, nil
	}

	return dto.BookingDto{}, e.NewNotFoundApiError("Booking not found")
}

func (t *TestBookings) GetBookings() (dto.BookingsDto, e.ApiError) {
	return dto.BookingsDto{}, nil
}

func (t *TestBookings) GetUnavailableDatesByHotel(Id int) ([]time.Time, error) {
	return []time.Time{}, nil
}

func (t *TestBookings) GetBookingsByUserId(id int) (dto.BookingsDto, e.ApiError) {
	return dto.BookingsDto{}, nil
}

func TestInsertBooking(t *testing.T) {
	// Si cambio el valor de los id puedo ver los errores
	booking := dto.BookingDto{
		HotelId:  2,
		DateFrom: "2023/06/25",
		DateTo:   "2023/06/30",
		UserId:   1,
	}

	service.BookingService = &TestBookings{}

	createdBooking, err := service.BookingService.InsertBooking(booking)

	assert.Nil(t, err, "Error al insertar la reserva")
	assert.Equal(t, 1, createdBooking.UserId, "El ID de usuario no coincide")
	assert.Equal(t, 2, createdBooking.HotelId, "El ID de hotel no coincide")
	assert.Equal(t, booking.DateFrom, createdBooking.DateFrom, "La fecha de inicio no coincide")
	assert.Equal(t, booking.DateTo, createdBooking.DateTo, "La fecha de fin no coincide")

}

func TestGetBookingById(t *testing.T) {
	service.BookingService = &TestBookings{}

	// Si cambio los valores de aca puedo ver los errores
	expectedBooking := dto.BookingDto{
		Id:       1,
		DateFrom: "2023/06/25",
		DateTo:   "2023/06/30",
		UserId:   1,
		HotelId:  2,
	}

	catchedBooking, err := service.BookingService.GetBookingById(expectedBooking.Id)

	assert.Nil(t, err)
	assert.Equal(t, expectedBooking.Id, catchedBooking.Id, "El ID de reserva no coincide")
	assert.Equal(t, expectedBooking.DateFrom, catchedBooking.DateFrom, "La fecha de inicio no coincide")
	assert.Equal(t, expectedBooking.DateTo, catchedBooking.DateTo, "La fecha de fin no coincide")
	assert.Equal(t, expectedBooking.UserId, catchedBooking.UserId, "El ID de usuario no coincide")
	assert.Equal(t, expectedBooking.HotelId, catchedBooking.HotelId, "El ID de hotel no coincide")
}
