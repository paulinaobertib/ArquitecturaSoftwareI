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
	GetBookingsByUserId(id int) (dto.BookingsDto, e.ApiError)
}

var (
	BookingService bookingServiceInterface
	layout         = "2006/01/02"
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
	bookingDto.UserId = booking.UserId
	bookingDto.HotelId = booking.HotelId

	return bookingDto, nil
}

func (b *bookingService) GetBookings() (dto.BookingsDto, e.ApiError) {

	var bookings = bookingDAO.GetBookings()
	var bookingsDto dto.BookingsDto
	bookingsDto.Bookings = []dto.BookingDto{}

	for _, booking := range bookings {
		var bookingDto dto.BookingDto

		bookingDto.Id = booking.Id
		bookingDto.DateFrom = booking.DateFrom.Format(layout)
		bookingDto.DateTo = booking.DateTo.Format(layout)
		bookingDto.UserId = booking.UserId
		bookingDto.HotelId = booking.HotelId

		bookingsDto.Bookings = append(bookingsDto.Bookings, bookingDto)
	}

	return bookingsDto, nil
}

func (b *bookingService) InsertBooking(bookingDto dto.BookingDto) (dto.BookingDto, e.ApiError) {

	var booking model.Booking

	booking.UserId = bookingDto.UserId
	booking.HotelId = bookingDto.HotelId

	parsedTime, _ := time.Parse(layout, bookingDto.DateFrom)
	booking.DateFrom = parsedTime
	parsedTime, _ = time.Parse(layout, bookingDto.DateTo)
	booking.DateTo = parsedTime

	booking = bookingDAO.InsertBooking(booking)

	bookingDto, _ = b.GetBookingById(booking.Id)

	return bookingDto, nil
}

func (b *bookingService) RoomsAvailable(bookingDto dto.BookingDto) (dto.RoomsAvailable, e.ApiError) {
	hotelID := bookingDto.HotelId
	DateFrom, _ := time.Parse(layout, bookingDto.DateFrom)
	DateTo, _ := time.Parse(layout, bookingDto.DateTo)

	bookings := bookingDAO.GetBookingByHotelAndDates(hotelID, DateFrom, DateTo)
	hotel := hotelDAO.GetHotelById(hotelID)

	roomsAvailable := dto.RoomsAvailable{
		//HotelID: hotelID,
		Rooms: hotel.Rooms - bookings,
	}

	return roomsAvailable, nil
}

func (b *bookingService) GetBookingsByUserId(id int) (dto.BookingsDto, e.ApiError) {

	var bookings = bookingDAO.GetBookingsByUserId(id)
	var bookingsDto dto.BookingsDto
	bookingsDto.Bookings = []dto.BookingDto{}

	for _, booking := range bookings {
		var bookingDto dto.BookingDto
		bookingDto.Id = booking.Id
		bookingDto.HotelId = booking.Hotel.Id
		bookingDto.DateFrom = booking.DateFrom.Format(layout)
		bookingDto.DateTo = booking.DateTo.Format(layout)

		bookingsDto.Bookings = append(bookingsDto.Bookings, bookingDto)
	}

	return bookingsDto, nil
}
