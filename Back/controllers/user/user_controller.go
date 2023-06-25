package userController

import (
	"booking-api/dto"
	service "booking-api/service"
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go" //importo libreria que me permite generar, firmar y verificar tokens
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetUserById(c *gin.Context) {
	log.Debug("User id to load: " + c.Param("id"))

	id, _ := strconv.Atoi(c.Param("id"))
	var userDto dto.UserDto

	userDto, err := service.UserService.GetUserById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, userDto)
}

func GetUserByUsername(c *gin.Context) {
	log.Debug("Username to load: " + c.Param("user_name"))

	// username, _ := strconv.Atoi(c.Param("id")) // deja de usarse esto porque no es un entero como el id
	username := c.Param("user_name") // dejo este asi directamente pasa como string el parametro
	var userDto dto.UserDto

	userDto, err := service.UserService.GetUserByUsername(username)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	token := generateToken(userDto)
    if err != nil {
        log.Error(err.Error())
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    response := struct {
        Token string      `json:"token"`
        User  dto.UserDto `json:"user"`
    }{
        Token: token,
        User:  userDto,
    }

	c.JSON(http.StatusOK, response)
}

func GetUserByEmail(c *gin.Context) {
	log.Debug("Email to load: " + c.Param("email"))

	mail := c.Param("email")
	var userDto dto.UserDto

	userDto, err := service.UserService.GetUserByEmail(mail)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, userDto)
}

func GetUsers(c *gin.Context) {
	var usersDto dto.UsersDto
	usersDto, err := service.UserService.GetUsers()

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, usersDto)
}

func UserInsert(c *gin.Context) {
	var userDto dto.UserDto
	err := c.BindJSON(&userDto)

	// Error Parsing json param
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userDto, er := service.UserService.InsertUser(userDto)
	// Error del Insert
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, userDto)
}

func UserLogin(c *gin.Context) {
	var loginDto dto.UserDto

	err := c.BindJSON(&loginDto)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	loginDto, er := service.UserService.UserLogin(loginDto)
	if er != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": er.Error()})
		return
	}

	token:= generateToken(loginDto)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, "fallo al generar el token")
		return
	}

	response := struct {
		Token string      `json:"token"`
		User  dto.UserDto `json:"user"`
	}{
		Token: token,
		User:  loginDto,
	}

	c.JSON(http.StatusAccepted, response)
}

func generateToken(loginDto dto.UserDto) (string) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = loginDto.Id
	claims["rol"] = loginDto.Rol
	claims["expiration"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString([]byte("your-secret-key"))
	if err != nil {
		return ""
	}

	return tokenString
}
