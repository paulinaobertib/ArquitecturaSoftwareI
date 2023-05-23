package service

import (
	bookingDAO "ArquitecturaSoftwareI/dao/booking"
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
		return bookingDto, e.NewBadRequestApiError("No se ha encontrado la reserva")
	}
	bookingDto.Id = booking.Id
	bookingDto.DateFrom = booking.DateFrom
	bookingDto.DateTo = booking.DateTo
	bookingDto.Duration = booking.Duration
	bookingDto.Price = booking.Price

	return bookingDto, nil
}

func (b *bookingService) GetBookings() (dto.BookingsDto, e.ApiError) {

	var bookings model.Bookings = bookingDAO.GetBookings()
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

func (b *bookingService) InsertBooking(bookingDto dto.BookingDto) (dto.BookingDto, e.ApiError) {

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
