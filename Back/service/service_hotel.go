package service

import (
	hotelDAO "booking-api/dao/hotel"
	amenitieDAO "booking-api/dao/amenitie"

	"booking-api/dto"
	"booking-api/model"
	e "booking-api/utils/errors"
)

type hotelService struct{}

type hotelServiceInterface interface {
	GetHotelById(id int) (dto.HotelDto, e.ApiError)
	GetHotels() (dto.HotelsDto, e.ApiError)
	InsertHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError)
	AddHotelAmenitie(hotelId, amenitieId int) e.ApiError
	DeleteHotelAmenitie(hotelId, amenitieId int) e.ApiError
}

var (
	HotelService hotelServiceInterface
)

func init() {
	HotelService = &hotelService{}
}

func (h *hotelService) GetHotelById(id int) (dto.HotelDto, e.ApiError) {

	var hotel model.Hotel = hotelDAO.GetHotelById(id)
	var hotelDto dto.HotelDto

	if hotel.Id == 0 {
		return hotelDto, e.NewBadRequestApiError("no se ha encontrado la reserva")
	}
	hotelDto.Id = hotel.Id
	hotelDto.Name = hotel.Name
	hotelDto.Availability = hotel.Availability
	hotelDto.Description = hotel.Description
	hotelDto.Email = hotel.Email
	hotelDto.Telephone = hotel.Telephone
	hotelDto.Rooms = hotel.Rooms

	return hotelDto, nil
}

func (h *hotelService) GetHotels() (dto.HotelsDto, e.ApiError) {

	var hotels model.Hotels = hotelDAO.GetHotels()
	hotelsList := make([]dto.HotelDto, 0)

	for _, hotel := range hotels {
		var hotelDto dto.HotelDto

		hotelDto.Id = hotel.Id
		hotelDto.Availability = hotel.Availability
		hotelDto.Description = hotel.Description
		hotelDto.Email = hotel.Email
		hotelDto.Name = hotel.Name
		hotelDto.Telephone = hotel.Telephone
		hotelDto.Rooms = hotel.Rooms

		amenities := make([]string, 0)

		for _, amenity := range hotel.Amenities {
			amenities = append(amenities, amenity.Name)
		}

		hotelDto.Amenities = amenities

		hotelsList = append(hotelsList, hotelDto)
	}

	return dto.HotelsDto{
		Hotels: hotelsList,
	}, nil
}

func (h *hotelService) InsertHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError) {

	var hotel model.Hotel

	hotel.Availability = hotelDto.Availability
	hotel.Description = hotelDto.Description
	hotel.Email = hotelDto.Email
	hotel.Name = hotelDto.Name
	hotel.Telephone = hotelDto.Telephone
	hotel.Rooms = hotelDto.Rooms

	hotel = hotelDAO.InsertHotel(hotel)

	hotelDto.Id = hotel.Id

	return hotelDto, nil
}

func (s *hotelService) AddHotelAmenitie(hotelId, amenitieId int) e.ApiError {
	// Obtener el hotel por su ID
	hotel := hotelDAO.GetHotelById(hotelId)
	if hotel.Id == 0 {
		return e.NewNotFoundApiError("Hotel not found")
	}

	// Obtener la amenidad por su ID
	amenitie := amenitieDAO.GetAmenitieById(amenitieId)
	if amenitie.Id == 0 {
		return e.NewNotFoundApiError("Amenitie not found")
	}

	// Verificar si la amenidad ya está asociada al hotel
	for _, amenity := range hotel.Amenities {
		if amenity.Id == amenitieId {
			return e.NewBadRequestApiError("Amenitie already added to the hotel")
		}
	}

	// Asociar la amenidad al hotel
	hotel.Amenities = append(hotel.Amenities, &amenitie)
	hotelDAO.UpdateHotel(hotel)

	return nil
}

func (h *hotelService) DeleteHotelAmenitie(hotelId, amenitieId int) e.ApiError {
	// Obtener el hotel por su ID
	hotel := hotelDAO.GetHotelById(hotelId)
	if hotel.Id == 0 {
		return e.NewNotFoundApiError("Hotel not found")
	}

	// Obtener la amenitie por su ID
	amenitie := amenitieDAO.GetAmenitieById(amenitieId)
	if amenitie.Id == 0 {
		return e.NewNotFoundApiError("Amenitie not found")
	}

	// Eliminar la amenidad al hotel
	// Encuentra el índice del amenitie que deseas eliminar
	var indexToRemove int = -1
	for i, a := range hotel.Amenities {
		if a.Id == amenitie.Id {
			indexToRemove = i
			break
		}
	}

	// Si se encontró el amenitie, elimínalo de la lista
	if indexToRemove != -1 {
		hotel.Amenities = append(hotel.Amenities[:indexToRemove], hotel.Amenities[indexToRemove+1:]...)
	}

	// Actualiza el hotel en la base de datos
	hotelDAO.UpdateHotel(hotel)
	hotelDAO.DeleteHotelAmenitie(hotelId, amenitieId)

	return nil
}