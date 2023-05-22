package dao

import (
	"ArquitecturaSoftwareI/model"
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

func GetBookings() model.Bookings {
	var bookings model.Bookings
	Db.Preload("User").Preload("Hotel").Find(&bookings)

	log.Debug("Booking: ", bookings)

	return bookings
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