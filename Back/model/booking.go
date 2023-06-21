package model

import (
	"time"
)

type Booking struct {
	Id       int       `gorm:"primaryKey"`
	DateFrom time.Time `gorm:"type:date;not null"`
	DateTo   time.Time `gorm:"type:date;not null"`

	User   User `gorm:"foreignKey:UserId"`
	UserId int

	Hotel   Hotel `gorm:"foreignKey:HotelId"`
	HotelId int
}

type Bookings []Booking
