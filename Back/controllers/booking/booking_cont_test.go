package bookingController_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"

	bookingController "booking-api/controllers/booking"
	"booking-api/dto"
)

func TestInsertBooking(t *testing.T) {
	// Crear un enrutador Gin
	router := gin.Default()

	// Ruta de ejemplo que ejecuta la función InsertBooking
	router.POST("/booking", bookingController.InsertBooking)

	// Preparar el cuerpo JSON de la reserva
	bookingData := dto.BookingDto{
		HotelId:  2,
		DateFrom: "2023/05/30",
		DateTo:   "2023/06/05",
	}

	jsonData, _ := json.Marshal(bookingData)

	// Crear una solicitud HTTP de tipo POST al endpoint /booking con el cuerpo JSON
	req, err := http.NewRequest("POST", "/booking", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatalf("Error al crear la solicitud HTTP: %s", err.Error())
	}

	// Crear un registrador de respuestas HTTP simulado
	resp := httptest.NewRecorder()

	// Enviar la solicitud al enrutador Gin y capturar la respuesta
	router.ServeHTTP(resp, req)

	// Verificar el código de estado de la respuesta
	assert.Equal(t, http.StatusCreated, resp.Code)

	// Leer la respuesta JSON
	var bookingResponse dto.BookingDto
	err = json.Unmarshal(resp.Body.Bytes(), &bookingResponse)
	if err != nil {
		t.Fatalf("Error al leer la respuesta JSON: %s", err.Error())
	}

	// Verificar los datos de la reserva insertada
	assert.Equal(t, bookingData.HotelId, bookingResponse.HotelId)
	assert.Equal(t, bookingData.DateFrom, bookingResponse.DateFrom)
	assert.Equal(t, bookingData.DateTo, bookingResponse.DateTo)
}
