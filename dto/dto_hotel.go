package dto

type HotelDto struct {
	Id          	int     	`json:"id"`
	Name     		string 		`json:"name"`
	Telephone    	string 		`json:"telephone"`
	Email        	string 		`json:"email"`
	Rooms        	int    		`json:"rooms"`
	Description  	string 		`json:"description"`
	Availability 	int    		`json:"availability"`

	BookingDto BookingsDto `json:"bookings,omitempty"`
}

type HotelsDto []HotelDto
