package dto

type BookingDto struct {
	Id       int     `json:"id"`
	DateFrom string  `json:"date_from"`
	DateTo   string  `json:"date_to"`
	Duration int     `json:"duration"`
	Price    float64 `json:"price"`
	UserId   int     `json:"user_id"`
	HotelId  int     `json:"hotel_id"`
}

type BookingsDto struct {
	Bookings []BookingDto `json:"bookings"`
}
