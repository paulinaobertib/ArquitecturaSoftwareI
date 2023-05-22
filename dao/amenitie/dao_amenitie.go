package dao

import (
	"proyecto/model"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetAmenitieById(id int) model.Amenitie {
	var amenitie model.Amenitie

	Db.Where("id = ?", id).First(&amenitie)
	log.Debug("Aminitie: ", amenitie)

	return amenitie
}

// func GetUsers() model.Users {
// 	var users model.Users
// 	Db.Preload("Address").Find(&users)

// 	log.Debug("Users: ", users)

// 	return users
// }

func InsertAmenitie(amenitie model.Amenitie) model.Amenitie {
	result := Db.Create(&amenitie)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Amenitie Created: ", amenitie.Id)
	return amenitie
}
