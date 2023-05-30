package service

import (
	hotelDAO "booking-api/dao/hotel"

	"booking-api/dto"
	"booking-api/model"
	e "booking-api/utils/errors"
)

type hotelService struct{}

type hotelServiceInterface interface {
	GetHotelById(id int) (dto.HotelDto, e.ApiError)
	GetHotels() (dto.HotelsDto, e.ApiError)
	InsertHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError)
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
	hotelDto.Image = hotel.Image

	for _, booking := range hotel.Bookings {
		var dtoBooking dto.BookingDto

		dtoBooking.DateFrom = booking.DateFrom
		dtoBooking.DateTo = booking.DateTo
		dtoBooking.Duration = booking.Duration
		dtoBooking.Price = booking.Price
		dtoBooking.HotelId = booking.HotelId

		hotelDto.BookingsDto = append(hotelDto.BookingsDto, dtoBooking)
	}

	for _, amenitie := range hotel.Amenities {
		var dtoAmenitie dto.AmenitieDto

		dtoAmenitie.Name = amenitie.Name
		dtoAmenitie.Description = amenitie.Description

		hotelDto.AmenitiesDto = append(hotelDto.AmenitiesDto, &dtoAmenitie)
	}

	return hotelDto, nil
}

func (h *hotelService) GetHotels() (dto.HotelsDto, e.ApiError) {

	var hotels model.Hotels = hotelDAO.GetHotels()
	var hotelsDto dto.HotelsDto

	for _, hotel := range hotels {
		var hotelDto dto.HotelDto

		hotelDto.Id = hotel.Id
		hotelDto.Availability = hotel.Availability
		hotelDto.Description = hotel.Description
		hotelDto.Email = hotel.Email
		hotelDto.Name = hotel.Name
		hotelDto.Telephone = hotel.Telephone
		hotelDto.Rooms = hotel.Rooms
		hotelDto.Image = hotel.Image

		hotelsDto = append(hotelsDto, hotelDto)
	}

	return hotelsDto, nil
}

func (h *hotelService) InsertHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError) {

	var hotel model.Hotel

	hotel.Availability = hotelDto.Availability
	hotel.Description = hotelDto.Description
	hotel.Email = hotelDto.Email
	hotel.Name = hotelDto.Name
	hotel.Telephone = hotelDto.Telephone
	hotel.Rooms = hotelDto.Rooms
	hotel.Image = hotelDto.Image

	hotel = hotelDAO.InsertHotel(hotel)

	hotelDto.Id = hotel.Id

	return hotelDto, nil
}


//nos falta poner lo del id en todos, y tambien un update para poder editar el producto, preguntar porque la imagen no se ve