package service

import (
	hotelDAO "booking-api/dao/hotel"

	"booking-api/dto"
	"booking-api/model"
	e "booking-api/utils/errors"
)

type hotelService struct{}

type hotelServiceInterface interface {
	GetHotel(id int) (dto.HotelDto, e.ApiError)
	GetHotels() (dto.HotelsDto, e.ApiError)
	InsertHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError)
}

var (
	HotelService hotelServiceInterface
)

func init() {
	HotelService = &hotelService{}
}

func (h *hotelService) GetHotel(id int) (dto.HotelDto, e.ApiError) {

	var hotel model.Hotel = hotelDAO.GetHotelById(id)
	var hotelDto dto.HotelDto

	if hotel.Id == 0 {
		return hotelDto, e.NewBadRequestApiError("no se ha encontrado la reserva")
	}
	hotelDto.Name = hotel.Name
	hotelDto.Availability = hotelDto.Availability
	hotelDto.Description = hotel.Description
	hotelDto.Email = hotel.Email
	hotelDto.Telephone = hotel.Telephone
	hotelDto.Rooms = hotel.Rooms

	for _, booking := range hotel.Bookings {
		var dtoBooking dto.BookingDto

		dtoBooking.DateFrom = booking.DateFrom
		dtoBooking.DateTo = booking.DateTo
		dtoBooking.Duration = booking.Duration
		dtoBooking.Price = booking.Price
		dtoBooking.HotelId = booking.HotelId

		hotelDto.BookingsDto = append(hotelDto.BookingsDto, dtoBooking)
	}

	return hotelDto, nil
}

func (h *hotelService) GetHotels() (dto.HotelsDto, e.ApiError) {

	var hotels model.Hotels = hotelDAO.GetHotels()
	var hotelsDto dto.HotelsDto

	for _, hotel := range hotels {
		var hotelDto dto.HotelDto

		hotelDto.Availability = hotel.Availability
		hotelDto.Description = hotel.Description
		hotelDto.Email = hotel.Email
		hotelDto.Name = hotel.Name
		hotelDto.Telephone = hotel.Telephone
		hotelDto.Rooms = hotel.Rooms

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

	hotel = hotelDAO.InsertHotel(hotel)

	hotelDto.Id = hotel.Id

	return hotelDto, nil
}
