package model

import (
	"time"
)

type Booking struct {
	Id       int    `gorm:"primaryKey"`
	DateFrom time.Time   `gorm:"type:date;not null"`
	DateTo   time.Time    `gorm:"type:date;not null"`
	Duration int    `gorm:"type:integer;not null"`
	Price    float64 `gorm:"type:double; not null"`
	
	UserId int
	HotelId int
}

type Bookings []Booking
