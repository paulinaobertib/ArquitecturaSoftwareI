package app

import (
	amenitieController "booking-api/controllers/amenitie"
	bookingController "booking-api/controllers/booking"
	hotelController "booking-api/controllers/hotel"
	userController "booking-api/controllers/user"

	log "github.com/sirupsen/logrus"
)

func mapUrls() {

	// Users Mapping
	router.GET("/user/:id", userController.GetUserById)
	router.GET("/user/user_name/:user_name", userController.GetUserByUsername)
	router.GET("/user/email/:email", userController.GetUserByEmail)
	router.GET("/users", userController.GetUsers)
	router.POST("/user", userController.UserInsert)

	router.GET("/hotel/:id", hotelController.GetHotelById)
	router.GET("/hotels", hotelController.GetHotels)
	router.POST("/hotel", hotelController.HotelInsert)

	router.GET("/booking/:id", bookingController.GetBookingById)
	router.GET("/bookings", bookingController.GetBookings)
	router.POST("/booking", bookingController.BookingInsert)

	router.GET("/amenitie/:id", amenitieController.GetAmenitieById)
	router.GET("/amenitie", amenitieController.GetAmenities)
	router.POST("/amenitie", amenitieController.AmenitieInsert)

	log.Info("Finishing mappings configurations")
}

