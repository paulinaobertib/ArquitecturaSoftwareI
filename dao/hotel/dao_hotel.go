package hotel

import (
	"ArquitecturaSoftwareI/model"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetHotelById(id int) model.Hotel{
	var hotel model.Hotel

	Db.Where("id = ?", id).Preload("Booking").First(&hotel)
	log.Debug("Hotel: ", hotel)

	return hotel
}

func GetHotels() model.Hotels {
	var hotels model.Hotels
	Db.Preload("Hotel").Preload("Booking").Find(&hotels)

	log.Debug("Hotels: ", hotels)

	return hotels
}

func InsertHotel(hotel model.Hotel) model.Hotel {
	result := Db.Create(&hotel)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Hotel Created: ", hotel.Id)
	return hotel
}