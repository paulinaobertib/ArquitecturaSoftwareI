package user

import (
	"booking-api/model"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetUserById(id int) model.User {
	var user model.User

	//el first me devuelve el primer usuario que encuentra
	Db.Where("id = ?", id).Preload("Booking").First(&user)
	//imprime la información
	log.Debug("User: ", user)

	return user
}

func GetUserByUsername(username string) model.User {
	var user model.User

	//el first me devuelve el primer usuario que encuentra
	Db.Where("user_name = ?", username).Preload("Booking").First(&user)
	//imprime la información
	log.Debug("User: ", user)

	return user
}

func GetUserByEmail(mail string) model.User {
	var user model.User

	//el first me devuelve el primer usuario que encuentra
	Db.Where("email = ?", mail).Preload("Booking").First(&user)
	//imprime la información
	log.Debug("User: ", user)

	return user
}

func GetUsers() model.Users {
	var users model.Users

	//ejecuta una consulta para recuperar todos los registros de la tabla asociada al modelo de datos y los almacena en la variable users
	Db.Preload("Booking").Find(&users)

	log.Debug("Users: ", users)

	return users
}

func InsertUser(user model.User) model.User {

	//crea el usuario
	result := Db.Create(&user)

	if result.Error != nil {
		log.Error("No se ha podido crear el usuario")
	}

	log.Debug("User Created: ", user.Id)

	return user
}