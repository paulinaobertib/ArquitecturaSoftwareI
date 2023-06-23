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
		DateFrom: time.Date(2023, time.July, 10, 0, 0, 0, 0, time.UTC),
		DateTo:   time.Date(2023, time.July, 17, 0, 0, 0, 0, time.UTC),
	}

	// Insertar la reserva utilizando el mock del DAO
	inserted := mockDAO.InsertBooking(newBooking)

	// Verificar que la reserva tenga un ID asignado
	assert.NotZero(t, inserted.Id)

	// Verificar otros atributos de la reserva
	assert.Equal(t, newBooking.UserId, inserted.UserId)
	assert.Equal(t, newBooking.HotelId, inserted.HotelId)
	assert.Equal(t, newBooking.DateFrom, inserted.DateFrom)
	assert.Equal(t, newBooking.DateTo, inserted.DateTo)
}
