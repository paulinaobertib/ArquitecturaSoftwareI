package service

import (
	amenitieDAO "booking-api/dao/amenitie"

	"booking-api/dto"
	"booking-api/model"
	e "booking-api/utils/errors"
)

type amenitieService struct{}

type amenitieServiceInterface interface {
	GetAmenitieById(id int) (dto.AmenitieDto, e.ApiError)
	GetAmenities() (dto.AmenitiesDto, e.ApiError)
	InsertAmenitie(amenitieDto dto.AmenitieDto) (dto.AmenitieDto, e.ApiError)
}

var (
	AmenitieService amenitieServiceInterface
)

func init() {
	AmenitieService = &amenitieService{}
}

func (h *amenitieService) GetAmenitieById(id int) (dto.AmenitieDto, e.ApiError) {

	var amenitie model.Amenitie = amenitieDAO.GetAmenitieById(id)
	var amenitieDto dto.AmenitieDto

	if amenitie.Id == 0 {
		return amenitieDto, e.NewBadRequestApiError("no se ha encontrado la reserva")
	}

	amenitieDto.Id = amenitie.Id
	amenitieDto.Name = amenitie.Name
	amenitieDto.Description = amenitie.Description

	/*
	for _, hotel := range amenitie.Hotels{
		var dtoHotel dto.HotelDto

		dtoHotel.Availability = hotel.Availability
		dtoHotel.Name = hotel.Name
		dtoHotel.Telephone = hotel.Telephone
		dtoHotel.Description = hotel.Description
		dtoHotel.Email = hotel.Email
		dtoHotel.Rooms = hotel.Rooms

		amenitieDto.HotelsDto = append(amenitieDto.HotelsDto, &dtoHotel)
	}*/

	return amenitieDto, nil
}

func (h *amenitieService) GetAmenities() (dto.AmenitiesDto, e.ApiError) {

	var amenities model.Amenities = amenitieDAO.GetAmenities()
	var amenitiesDto dto.AmenitiesDto

	for _, amenitie := range amenities {
		var amenitieDto dto.AmenitieDto

		amenitieDto.Description = amenitie.Description
		amenitieDto.Id = amenitie.Id
		amenitieDto.Name = amenitie.Name

		amenitiesDto = append(amenitiesDto, amenitieDto)
	}

	return amenitiesDto, nil
}

func (h *amenitieService) InsertAmenitie(amenitieDto dto.AmenitieDto) (dto.AmenitieDto, e.ApiError) {

	var amenitie model.Amenitie

	amenitie.Description = amenitieDto.Description
	amenitie.Id = amenitieDto.Id
	amenitie.Name = amenitieDto.Name

	amenitie = amenitieDAO.InsertAmenitie(amenitie)

	amenitieDto.Id = amenitie.Id

	return amenitieDto, nil
}
