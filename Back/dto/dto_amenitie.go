package dto

type AmenitieDto struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`

	//HotelsDto []*HotelDto // LISTO LA RELACION EN EL DTO 
}

type AmenitiesDto []AmenitieDto
