package bookingController

import (
	"booking-api/dto"
	service "booking-api/service"
	"net/http"
	"strconv"
	"time"

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

func InsertBooking(c *gin.Context) {
	var bookingDto dto.BookingDto
	err := c.BindJSON(&bookingDto)

	// Error Parsing json param
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Parsear las fechas iniciales y finales
	layout := "2006/01/02"
	dateFrom, err := time.Parse(layout, bookingDto.DateFrom)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date From inválida"})
		return
	}

	dateTo, err := time.Parse(layout, bookingDto.DateTo)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date To inválida"})
		return
	}

	// Verificar si la fecha final es mayor que la fecha inicial
	if dateTo.Before(dateFrom) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date To debe ser mayor que Date From"})
		return
	}

	//Verificar que haya rooms disponibles
	rooms_available, _ := service.BookingService.RoomsAvailable(bookingDto)
	if rooms_available.Rooms <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No hay habitaciones disponibles."})
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

func RoomsAvailable(c *gin.Context) {
	params := c.Params
	hotelID, _ := strconv.Atoi(params.ByName("id"))
	dateFrom := params.ByName("date_from")
	dateTo := params.ByName("date_to")

	bookingDTO := dto.BookingDto{
		HotelId:  hotelID,
		DateFrom: dateFrom,
		DateTo:   dateTo,
	}

	roomsAvailable, err := service.BookingService.RoomsAvailable(bookingDTO)
	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, roomsAvailable)
}

func GetBookingsByUserId(c *gin.Context) {
	log.Debug("User id to load: " + c.Param("id"))

	userId, _ := strconv.Atoi(c.Param("id"))

	bookingsDto, err := service.BookingService.GetBookingsByUserId(userId)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, bookingsDto)
}
