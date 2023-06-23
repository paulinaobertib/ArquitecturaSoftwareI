package bookingController_test

import (
	"bytes"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	bookingController "booking-api/controllers/booking"

	"github.com/gin-gonic/gin"
	// "github.com/stretchr/testify/assert"
)

func TestInsertBooking(t *testing.T) {
	// Configurar el entorno del test
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.POST("/booking", bookingController.InsertBooking)

	// Crear una solicitud HTTP de prueba con los datos deseados
	reqBody := []byte(`{
		"Id": 1,
		"UserId": 1,
		"HotelId": 1,
		"DateFrom": "2023/07/10",
		"DateTo": "2023/07/12"
	}`)
	req, err := http.NewRequest("POST", "/booking", bytes.NewBuffer(reqBody))
	if err != nil {
		t.Fatal(err)
	}

	// Ejecutar la solicitud HTTP de prueba
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	// Verificar el código de estado de la respuesta
	if rec.Code != http.StatusOK {
		t.Errorf("Código de estado esperado: %d; Código de estado actual: %d", http.StatusOK, rec.Code)
	}

	// Leer el cuerpo de la respuesta
	respBody, err := io.ReadAll(rec.Body)
	if err != nil {
		t.Fatal(err)
	}

	// Verificar el contenido de la respuesta
	expectedResp := `{"status": "success", "message": "Booking created successfully."}`
	if string(respBody) != expectedResp {
		t.Errorf("Respuesta esperada: %s; Respuesta actual: %s", expectedResp, string(respBody))
	}
}
