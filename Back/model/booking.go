package model

import (
	"time"
)

type Booking struct {
	Id       int       `gorm:"primaryKey"`
	DateFrom time.Time `gorm:"type:date;not null"`
	DateTo   time.Time `gorm:"type:date;not null"`

	User   User `gorm:"foreingkey:UserId"`
	UserId int

	Hotel   Hotel `gorm:"foreingkey:HotelId"`
	HotelId int
}

type Bookings []Booking
