package main

import _ "booking-api/service"

import (
	"booking-api/app"
	"booking-api/db"
)

func main() {
	db.StartDbEngine()
	app.StartRoute()
}
