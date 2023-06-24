package dao

import (
	"booking-api/model"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetBookingById(id int) model.Booking {
	var booking model.Booking

	Db.Where("id = ?", id).Preload("Hotel").Preload("User").First(&booking)
	log.Debug("Booking: ", booking)

	return booking
}

func GetBookings() model.Bookings {
	var bookings model.Bookings
	Db.Preload("Hotel").Preload("User").Find(&bookings)

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
func GetBookingsByHotelId(Id int) ([]model.Booking, error) {
	var bookings []model.Booking
	if err := Db.Model(&model.Booking{}).Where("hotel_id = ?", Id).Find(&bookings).Error; err != nil {
		return nil, err
	}
	return bookings, nil
}

func GetBookingsByUserId(userId int) model.Bookings {
	var bookings model.Bookings

	Db.Where("user_id = ?", userId).Preload("Hotel").Preload("User").Find(&bookings)

	return bookings
}