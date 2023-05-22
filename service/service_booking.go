package service

import (
	bookingDAO"ArquitecturaSoftwareI/dao/booking"

	userDAO "ArquitecturaSoftwareI/dao/user"
	hotelDAO "ArquitecturaSoftwareI/dao/hotel"
	
	"ArquitecturaSoftwareI/dto"
	"ArquitecturaSoftwareI/model"
	e "ArquitecturaSoftwareI/utils/errors"
)

type bookingService struct{}

type bookingServiceInterface interface {
	GetBookingById(id int) (dto.BookingDto, e.ApiError)
	GetBookings() (dto.BookingsDto, e.ApiError)
	InsertBooking(bookingDto dto.BookingDto) (dto.BookingDto, e.ApiError)
}

var (
	BookingService bookingServiceInterface
)

func init() {
	BookingService = &bookingService{}
}

func (b *bookingService) GetBookingById(id int) (dto.BookingDto, e.ApiError) {

	var booking model.Booking = bookingDAO.GetBookingById(id)
	var bookingDto dto.BookingDto

	if booking.Id == 0 {
		return bookingDto, e.NewBadRequestApiError("no se ha encontrado la reserva")
	}
	
	bookingDto.Id = booking.Id
	bookingDto.DateFrom = booking.DateFrom
	bookingDto.DateTo = booking.DateTo
	bookingDto.Duration = booking.Duration
	bookingDto.Price = booking.Price

	for _, user := range booking.Users {
		var dtoUser dto.UserDto

		dtoUser.Name = user.Name
		dtoUser.LastName = user.LastName
		dtoUser.UserName = user.UserName
		dtoUser.Password = user.Password
		dtoUser.Email = user.Email
		dtoUser.Rol = user.Rol
		dtoUser.State = user.State

		bookingDto.UsersDto = append(bookingDto.UsersDto, dtoUser)
	}

	for _, hotel := range booking.Hotels {
		var dtoHotel dto.HotelDto

		dtoHotel.Name = hotel.Name
		dtoHotel.Telephone = hotel.Telephone
		dtoHotel.Email = hotel.Email
		dtoHotel.Rooms = hotel.Rooms
		dtoHotel.Description = hotel.Description
		dtoHotel.Availability = hotel.Availability

		bookingDto.HotelsDto = append(bookingDto.HotelsDto, dtoHotel)
	}


	return bookingDto, nil
}

func (b *bookingService) GetBookings() (dto.BookingsDto, e.ApiError) {

	var bookings model.Booking = bookingDAO.GetBookings()
	var bookingsDto dto.BookingsDto

	for _, booking := range bookings {
		var bookingDto dto.BookingDto

		bookingDto.Id = booking.Id
		bookingDto.DateFrom = booking.DateFrom
		bookingDto.DateTo = booking.DateTo
		bookingDto.Duration = booking.Duration
		bookingDto.Price = booking.Price

		bookingsDto = append(bookingsDto, bookingDto)
	}

	return bookingsDto, nil
}

func (s *bookingService) InsertBooking(bookingDto dto.BookingDto) (dto.BookingDto, e.ApiError) {

	var booking model.Booking

	bookingDto.Id = booking.Id
	bookingDto.DateFrom = booking.DateFrom
	bookingDto.DateTo = booking.DateTo
	bookingDto.Duration = booking.Duration
	bookingDto.Price = booking.Price

	booking = bookingDAO.InsertBooking(booking)

	bookingDto.Id = booking.Id

	return bookingDto, nil
}

