package service

import (
	bookingDAO "booking-api/dao/booking"
	hotelDAO "booking-api/dao/hotel"
	"booking-api/dto"
	"booking-api/model"
	e "booking-api/utils/errors"
	"time"
)

type bookingService struct{}

type bookingServiceInterface interface {
	GetBookingById(id int) (dto.BookingDto, e.ApiError)
	GetBookings() (dto.BookingsDto, e.ApiError)
	InsertBooking(bookingDto dto.BookingDto) (dto.BookingDto, e.ApiError)
	RoomsAvailable(bookingDto dto.BookingDto) (dto.RoomsAvailable, e.ApiError)
}

var (
	BookingService bookingServiceInterface
	layout = "02/01/2006"
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
	bookingDto.DateFrom = booking.DateFrom.Format(layout)
	bookingDto.DateTo = booking.DateTo.Format(layout)
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
		bookingDto.DateFrom = booking.DateFrom.Format(layout)
		bookingDto.DateTo = booking.DateTo.Format(layout)
		bookingDto.Duration = booking.Duration
		bookingDto.Price = booking.Price

		bookingsDto.Bookings= append(bookingsDto.Bookings, bookingDto)
	}

	return bookingsDto, nil
}

func (b *bookingService) InsertBooking(bookingDto dto.BookingDto) (dto.BookingDto, e.ApiError) {

	var booking model.Booking

	bookingDto.Id = booking.Id
	bookingDto.DateFrom = booking.DateFrom.Format(layout)
	bookingDto.DateTo = booking.DateTo.Format(layout)
	bookingDto.Duration = booking.Duration
	bookingDto.Price = booking.Price

	booking = bookingDAO.InsertBooking(booking)

	bookingDto.Id = booking.Id

	return bookingDto, nil
}

func (b *bookingService) RoomsAvailable(bookingDto dto.BookingDto) (dto.RoomsAvailable, e.ApiError) {

	hotelID := bookingDto.HotelId
	DateFrom, _ := time.Parse(layout, bookingDto.DateFrom)
	DateTo, _ := time.Parse(layout, bookingDto.DateTo)
	var bookings = bookingDAO.GetBookingByHotelAndDates(hotelID, DateFrom, DateTo)

	var roomsAvailable dto.RoomsAvailable
	hotel_rooms := hotelDAO.GetHotelById(hotelID).Availability
	roomsAvailable.Rooms = hotel_rooms - bookings

	return roomsAvailable, nil
}