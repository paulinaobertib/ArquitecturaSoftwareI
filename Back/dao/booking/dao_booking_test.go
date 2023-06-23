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
	// Aquí puedes establecer un ID para la reserva y devolverla
	booking.Id = 1 // Simulando asignación de ID
	return booking
}

func TestInsertBooking(t *testing.T) {
	// Crear una instancia del mock del DAO de Booking
	mockDAO := &MockBookingDAO{}

	// Crear una nueva reserva
	newBooking := model.Booking{
		UserId:   1,
		HotelId:  1,
		DateFrom: time.Now(),
		DateTo:   time.Now().AddDate(0, 0, 3),
	}

	// Insertar la reserva utilizando el mock del DAO
	insertedBooking := mockDAO.InsertBooking(newBooking)

	// Verificar que la reserva tenga un ID asignado
	assert.NotZero(t, insertedBooking.Id)

	// Verificar otros atributos de la reserva
	assert.Equal(t, newBooking.UserId, insertedBooking.UserId)
	assert.Equal(t, newBooking.HotelId, insertedBooking.HotelId)
	assert.Equal(t, newBooking.DateFrom, insertedBooking.DateFrom)
	assert.Equal(t, newBooking.DateTo, insertedBooking.DateTo)
}
