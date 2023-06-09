package hotel

import (
	"booking-api/model"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetHotelById(id int) model.Hotel {
	var hotel model.Hotel

	//Db.Where("id = ?", id).Preload("Booking").Preload("Amenitie").First(&hotel)
	Db.Where("id = ?", id).First(&hotel)
	log.Debug("Hotel: ", hotel)

	return hotel
}

func GetHotels() model.Hotels {
	var hotels model.Hotels

	Db.Find(&hotels)

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

func UpdateHotel(hotel model.Hotel) {
	Db.Save(&hotel)
	log.Debug("Hotel Updated: ", hotel.Id)
}

func DeleteHotelAmenitie(hotelId int, amenitieId int) bool {
	// Eliminar la fila que vincula el hotel y la amenidad en "hotels_amenities"
	result := Db.Table("hotels_amenities").
		Where("hotel_id = ? AND amenitie_id = ?", hotelId, amenitieId).
		Delete(nil)
	if result.Error != nil {
		// Manejar el error en caso de que ocurra
		return false
	}
	return true
}