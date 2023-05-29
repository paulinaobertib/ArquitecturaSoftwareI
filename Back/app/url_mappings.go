package app

import (
	userController "booking-api/controllers/user"
	amenitieController "booking-api/controllers/amenitie"
	hotelController "booking-api/controllers/hotel"
	bookingController "booking-api/controllers/booking"
	
	log "github.com/sirupsen/logrus"
)

func mapUrls() {

	// Users Mapping
	router.GET("/user/:id", userController.GetUserById)
	router.GET("/user/:username", userController.GetUserByUsername)
	router.GET("/user", userController.GetUsers)
	router.POST("/user", userController.UserInsert)

	router.GET("/hotel/:id", hotelController.GetHotelById)
	router.GET("/hotel", hotelController.GetHotels)
	router.POST("/hotel", hotelController.HotelInsert)

	router.GET("/booking/:id", bookingController.GetBookingById)
	router.GET("/booking", bookingController.GetBookings)
	router.POST("/booking", bookingController.BookingInsert)

	router.GET("/amenitie/:id", amenitieController.GetAmenitieById)
	router.GET("/amenitie", amenitieController.GetAmenities)
	router.POST("/amenitie", amenitieController.AmenitieInsert)

	log.Info("Finishing mappings configurations")
}
