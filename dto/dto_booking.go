package dto

import (
	"time"
)

type BookingDto struct {
	Id       int       `json:"id"`
	DateFrom time.Time `json:"date_from"`
	DateTo   time.Time `json:"date_to"`
	Duration int       `json:"duration"`
	Price    float64   `json:"price"`
	UserId   int       `json:"user_id"`
	HotelId  int       `json:"hotel_id"`
}

type BookingsDto []BookingDto
