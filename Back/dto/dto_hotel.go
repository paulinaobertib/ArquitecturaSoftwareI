package dto

type HotelDto struct {
	Id           int    `json:"id"`
	Name         string `json:"name"`
	Telephone    string `json:"telephone"`
	Email        string `json:"email"`
	Rooms        int    `json:"rooms"`
	Description  string `json:"description"`
	Availability int    `json:"availability"`

	BookingsDto BookingsDto `json:"bookings,omitempty"`
	Amenities   []string    `json:"amenities"`
	Images      []string    `json:"images"`
}

type HotelsDto struct {
	Hotels []HotelDto `json:"hotels"`
}
