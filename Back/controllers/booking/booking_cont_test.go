package bookingController_test

import (
	bookingController "booking-api/controllers/booking"
	"booking-api/dto"
	"booking-api/service"
	"booking-api/utils/errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

type TestBookings struct {
}

func (t *TestBookings) InsertBooking(bookingDto dto.BookingDto) (dto.BookingDto, errors.ApiError) {
	if bookingDto.UserId == 0 {
		return dto.BookingDto{}, errors.NewApiError("Error al insertar la reserva", "booking_insert_error", http.StatusInternalServerError, nil)
	}

	return dto.BookingDto{}, nil
}

func (t *TestBookings) GetBookingById(id int) (dto.BookingDto, errors.ApiError) {
	if id == 1 {
		return dto.BookingDto{
			Id:       1,
			DateFrom: "2023/06/25",
			DateTo:   "2023/06/30",
			UserId:   1,
			HotelId:  2,
		}, nil
	}

	return dto.BookingDto{}, errors.NewApiError("Booking not found", "booking_not_found", http.StatusNotFound, nil)
}

func (t *TestBookings) GetBookings() (dto.BookingsDto, errors.ApiError) {
	return dto.BookingsDto{}, nil
}

// Si se cambia el valor a 0, no deja realizar la reserva
func (t *TestBookings) RoomsAvailable(bookingDto dto.BookingDto) (dto.RoomsAvailable, errors.ApiError) {
	return dto.RoomsAvailable{Rooms: 1}, nil
}

func (t *TestBookings) GetBookingsByUserId(id int) (dto.BookingsDto, errors.ApiError) {
	return dto.BookingsDto{}, nil
}

func (t *TestBookings) GetUnavailableDatesByHotel(hotelID int) ([]time.Time, error) {
	return []time.Time{}, nil
}

func TestInsertBooking(t *testing.T) {
	service.BookingService = &TestBookings{}
	router := gin.Default()

	router.POST("/booking", bookingController.InsertBooking)

	// Solicitud HTTP POST - Si se cambia el User id a 0 se ve el error
	myJson := `{
		"hotel_id": 2,
		"date_from": "2023/05/30",
		"date_to": "2023/06/05",
		"user_id": 1
	}`

	bodyJson := strings.NewReader(myJson)
	request, _ := http.NewRequest("POST", "/booking", bodyJson)

	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	fmt.Println(response.Body.String())

	// Verificar el código de estado de la respuesta
	assert.Equal(t, http.StatusCreated, response.Code, "El código de respuesta no es el esperado")
}

func TestGetBookingById(t *testing.T) {
	service.BookingService = &TestBookings{}
	router := gin.Default()

	router.GET("/booking/:id", bookingController.GetBookingById)

	// Crear una solicitud HTTP de tipo GET al endpoint /booking/{id}

	// Si se cambia el id a otro numero se ve el error
	request, _ := http.NewRequest("GET", "/booking/1", nil)

	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	fmt.Println(response.Body.String())

	// Verificar el código de estado de la respuesta
	assert.Equal(t, http.StatusOK, response.Code, "El ID buscado no existe")
}
