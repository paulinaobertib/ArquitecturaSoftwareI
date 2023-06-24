package dao_test

import (
	"testing"
	"time"

	"booking-api/model"

	"github.com/stretchr/testify/assert"
)

type MockBookingDAO struct{}

func (m *MockBookingDAO) InsertBooking(booking model.Booking) model.Booking {
	// Simular la lógica de inserción en la base de datos
	// Se establece un ID para la reserva
	booking.Id = 0 // Simulando asignación de ID
	return booking
}

// TEST PARA LA FUNCION GETBOOKINGBYIDyy

func TestInsertBooking(t *testing.T) {
	// Crear una instancia del mock del DAO de Booking
	mockDAO := &MockBookingDAO{}

	// Crear una nueva reserva
	newBooking := model.Booking{
		UserId:   1,
		HotelId:  1,
		DateFrom: time.Date(2023, time.July, 10, 0, 0, 0, 0, time.UTC),
		DateTo:   time.Date(2023, time.July, 17, 0, 0, 0, 0, time.UTC),
	}

	// Insertar la reserva utilizando el mock del DAO
	inserted := mockDAO.InsertBooking(newBooking)

	// Verificar que la reserva tenga un ID asignado
	assert.NotZero(t, inserted.Id, "La reserva no se pudo realizar")

	// Verificar otros atributos de la reserva
	assert.Equal(t, newBooking.UserId, inserted.UserId)
	assert.Equal(t, newBooking.HotelId, inserted.HotelId)
	assert.Equal(t, newBooking.DateFrom, inserted.DateFrom)
	assert.Equal(t, newBooking.DateTo, inserted.DateTo)
}

// TEST PARA LA FUNCION GETBOOKINGBYID

func (m *MockBookingDAO) GetBookingById(id int) model.Booking {
	// Simular la búsqueda en la base de datos
	booking := model.Booking{
		Id:       1,
		UserId:   1,
		HotelId:  1,
		DateFrom: time.Date(2023, time.July, 10, 0, 0, 0, 0, time.UTC),
		DateTo:   time.Date(2023, time.July, 17, 0, 0, 0, 0, time.UTC),
	}

	return booking
}

func TestGetBookingById(t *testing.T) {
	// Crear una instancia del mock del DAO de Booking
	mockDAO := &MockBookingDAO{}

	// ID de reserva a buscar - Si la cambio deja de funcionar
	bookingId := 2

	// Obtener la reserva utilizando el mock del DAO
	booking := mockDAO.GetBookingById(bookingId)

	// Verificar que la reserva obtenida tenga el ID correcto
	assert.Equal(t, bookingId, booking.Id, "El ID de la reserva no existe")

	// Verificar otros atributos de la reserva
	assert.Equal(t, 1, booking.UserId)
	assert.Equal(t, 1, booking.HotelId)
	expectedDateFrom := time.Date(2023, time.July, 10, 0, 0, 0, 0, time.UTC)
	assert.Equal(t, expectedDateFrom, booking.DateFrom)
	expectedDateTo := time.Date(2023, time.July, 17, 0, 0, 0, 0, time.UTC)
	assert.Equal(t, expectedDateTo, booking.DateTo)
}
