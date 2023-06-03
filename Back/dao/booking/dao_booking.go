package dao

import (
	"booking-api/model"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
	"time"
)

var Db *gorm.DB

func GetBookingById(id int) model.Booking {
	var booking model.Booking

	Db.Where("id = ?", id).First(&booking)
	log.Debug("Booking: ", booking)

	return booking
}

func GetBookings() model.Bookings {
	var bookings model.Bookings
	Db.Find(&bookings)

	log.Debug("Bookings: ", bookings)

	return bookings
}

func InsertBooking(booking model.Booking) model.Booking {
	result := Db.Create(&booking)

	if result.Error != nil {
		log.Error("")
	}
	log.Debug("Booking Created: ", booking.Id)
	return booking
}

// metodo que me cuenta la cantidad reservas que hay de ese hotel en una fecha
func GetBookingByHotelAndDates(Id int, DateFrom time.Time, DateTo time.Time) int {
	var count int
	Db.Model(&model.Booking{}).Where("id = ? AND ? < date_to AND ? >= date_from", Id, DateFrom, DateTo).Preload("Hotel").Preload("User").Count(&count)
	return count
}