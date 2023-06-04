package amenitieController

import (
	"booking-api/dto"
	service "booking-api/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetAmenitieById(c *gin.Context) {
	log.Debug("Amenitie id to load: " + c.Param("id"))

	id, _ := strconv.Atoi(c.Param("id")) // es id entonces vale
	var amenitieDto dto.AmenitieDto

	amenitieDto, err := service.AmenitieService.GetAmenitieById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, amenitieDto) // devuelve el estado 200 como respuesta si todo salio bien
}

func GetAmenities(c *gin.Context) {
	var amenitiesDto dto.AmenitiesDto
	amenitiesDto, err := service.AmenitieService.GetAmenities()

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, amenitiesDto)
}

func AmenitieInsert(c *gin.Context) {
	var amenitieDto dto.AmenitieDto
	err := c.BindJSON(&amenitieDto)

	// Error Parsing json param
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	amenitieDto, er := service.AmenitieService.InsertAmenitie(amenitieDto) // llama a la funcion del service
	// Error del Insert
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, amenitieDto) // estos son los mensajes que se muestran, en este caso seria el creado, 201
}

func GetAmenitiesByHotelId(c *gin.Context) {
    log.Debug("Hotel id to load: " + c.Param("id"))

    id, _ := strconv.Atoi(c.Param("id"))
    
    amenitiesDto, err := service.AmenitieService.GetAmenitiesByHotelId(id)

    if err != nil {
        c.JSON(err.Status(), err)
        return
    }

    c.JSON(http.StatusOK, amenitiesDto)
}