package main

import (
	"booking-api/app"
	"booking-api/db"
)

func main() {
	db.StartDbEngine()
	app.StartRoute()
}
