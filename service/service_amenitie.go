package service

import (
	amenitieDAO "ArquitecturaSoftwareI/dao/amenitie"
	
	"ArquitecturaSoftwareI/dto"
	"ArquitecturaSoftwareI/model"	
	e "ArquitecturaSoftwareI/utils/errors"
)

type amenitieService struct{}

type amenitieServiceInterface interface {
	GetAmenitie(id int) (dto.AmenitieDto, e.ApiError)
	GetAmenities() (dto.AmenitiesDto, e.ApiError)
	InsertAmenitie(amenitieDto dto.AmenitieDto) (dto.AmenitieDto, e.ApiError)
}

var (
	AmenitieService amenitieServiceInterface
)

func init() {
	AmenitieService = &amenitieService{}
}


func (h *amenitieService) GetAmenitie(id int) (dto.AmenitieDto, e.ApiError) {

	var amenitie model.Amenitie = amenitieDAO.GetAmenitieById(id)
	var amenitieDto dto.AmenitieDto

	if amenitie.Id == 0 {
		return amenitieDto, e.NewBadRequestApiError("no se ha encontrado la reserva")
		
		amenitieDto.Description = amenitie.Description
		amenitieDto.Id = amenitie.Id
		amenitieDto.Name = amenitie.Name
	}
	

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
