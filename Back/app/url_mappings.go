package app

import (
	amenitieController "booking-api/controllers/amenitie"
	bookingController "booking-api/controllers/booking"
	hotelController "booking-api/controllers/hotel"
	imageController "booking-api/controllers/image"
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
	router.PUT("/hotel/:id/add-amenitie/:id_amenitie", hotelController.AddHotelAmenitie)
	router.DELETE("/hotel/:id/remove-amenitie/:id_amenitie", hotelController.DeleteHotelAmenitie)
	router.POST("/hotel/:id/add-image", imageController.ImageInsert)

	router.GET("/booking/:id", bookingController.GetBookingById)
	router.GET("/bookings", bookingController.GetBookings)
	router.POST("/booking", bookingController.InsertBooking)
	router.GET("/booking/availability/:id/:date_from/:date_to", bookingController.RoomsAvailable)
	router.GET("/rooms-available", bookingController.RoomsAvailable)
	router.GET("/bookings/user/:id", bookingController.GetBookingsByUserId)

	router.GET("/amenitie/:id", amenitieController.GetAmenitieById)
	router.GET("/amenities", amenitieController.GetAmenities)
	router.POST("/amenitie", amenitieController.AmenitieInsert)
	router.GET("/amenities/hotel/:id", amenitieController.GetAmenitiesByHotelId)
	router.DELETE("/amenitie/:id", amenitieController.DeleteAmenitieById)

	router.GET("/images/:id", imageController.GetImageById)
	router.GET("/image/hotel/:id", imageController.GetImagesByHotelId)
	router.GET("/image", imageController.GetImages)
	router.DELETE("/imagedelete/:id", imageController.DeleteImageById)

	log.Info("Finishing mappings configurations")
}
