package dto

type RoomsAvailable struct {
	Rooms int `json:"rooms_available"`
}

type RoomInfo struct {
	HotelName           string `json:"name"`
	HotelId             int    `json:"hotel_id"`
	RoomsAvailable int    `json:"rooms_available"`
}

type RoomsResponse struct {
	Rooms []RoomInfo `json:"rooms"`
}