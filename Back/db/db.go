package db

import (
	amenitieDAO "booking-api/dao/amenitie"
	bookingDAO "booking-api/dao/booking"
	hotelDAO "booking-api/dao/hotel"
	userDAO "booking-api/dao/user"
	imageDAO "booking-api/dao/image"

	"booking-api/model"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	log "github.com/sirupsen/logrus"
)

var (
	db  *gorm.DB
	err error
)

func init() {

	// PARA HACER LA CONEXION TENGO QUE PONER EL GO RUN Y SE ACTUALIZA EN EL MYSQL
	// DB Connections Paramters
	DBName := "bookingPSTV"
	DBUser := "PSTV"
	DBPass := "PSTVArquiSw"
	// DBPass := os.Getenv("MVC_DB_PASS")
	DBHost := "localhost"
	// ------------------------

	db, err = gorm.Open("mysql", DBUser+":"+DBPass+"@tcp("+DBHost+":3306)/"+DBName+"?charset=utf8&parseTime=True")

	if err != nil {
		log.Info("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Info("Connection Established")
	}

	// We need to add all CLients that we build
	userDAO.Db = db
	hotelDAO.Db = db
	bookingDAO.Db = db
	amenitieDAO.Db = db
	imageDAO.Db = db
}

func StartDbEngine() {
	// We need to migrate all classes model.
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Hotel{})
	db.AutoMigrate(&model.Booking{})
	db.AutoMigrate(&model.Amenitie{})
	db.AutoMigrate(&model.Image{})

	log.Info("Finishing Migration Database Tables")
}
