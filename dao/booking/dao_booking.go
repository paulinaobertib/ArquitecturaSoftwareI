package dao

import (
	"proyecto/model"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetBookingById(id int) model.Booking {
	var booking model.Booking

	Db.Where("id = ?", id).Preload("User").Preload("Hotel").First(&booking)
	log.Debug("Booking: ", booking)

	return booking
}

func GetBookings() model.Booking {
	var booking model.Booking
	Db.Preload("User").Preload("Hotel").Find(&booking)

	log.Debug("Booking: ", booking)

	return booking
}

func InsertBooking(booking model.Booking) model.Booking {
	result := Db.Create(&booking)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Booking Created: ", booking.Id)
	return booking
}