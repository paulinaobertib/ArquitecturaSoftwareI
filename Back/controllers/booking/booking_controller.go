package bookingController

import (
	"booking-api/dto"
	service "booking-api/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetBookingById(c *gin.Context) {
	log.Debug("Booking id to load: " + c.Param("id"))

	id, _ := strconv.Atoi(c.Param("id")) // es id entonces vale
	var bookingDto dto.BookingDto

	bookingDto, err := service.BookingService.GetBookingById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, bookingDto) // devuelve el estado 200 como respuesta si todo salio bien
}

func GetBookings(c *gin.Context) {
	var bookingsDto dto.BookingsDto
	bookingsDto, err := service.BookingService.GetBookings()

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, bookingsDto)
}

func BookingInsert(c *gin.Context) {
	var bookingDto dto.BookingDto
	err := c.BindJSON(&bookingDto)

	// Error Parsing json param
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	bookingDto, er := service.BookingService.InsertBooking(bookingDto) // llama a la funcion del service
	// Error del Insert
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, bookingDto) // estos son los mensajes que se muestran, en este caso seria el creado, 201
}