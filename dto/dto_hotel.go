package dto

type HotelDto struct {
	Name     	string `json:"name"`
	Telephone    string  `json:"telephone"`
	Email        string `json:"email"`
	Rooms        int    `json:"rooms"`
	Description  string `json:"description"`
	Availability int    `json:"availability"`
}

type HotelsDto []HotelDto
