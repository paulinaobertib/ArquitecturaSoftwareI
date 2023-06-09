package service

import (
	userDAO "booking-api/dao/user"

	"booking-api/dto"
	"booking-api/model"
	e "booking-api/utils/errors"
)

type userService struct{}

// interface del usuario
type userServiceInterface interface {
	GetUserById(id int) (dto.UserDto, e.ApiError)
	GetUserByUsername(username string) (dto.UserDto, e.ApiError)
	GetUserByEmail(username string) (dto.UserDto, e.ApiError)
	GetUsers() (dto.UsersDto, e.ApiError)
	InsertUser(userDto dto.UserDto) (dto.UserDto, e.ApiError)
	UserLogin(loginDto dto.UserDto) (dto.UserDto, e.ApiError)
}

// inicializo una variable de service para poder usar sus metodos
var (
	UserService userServiceInterface
)

func init() {
	UserService = &userService{}
}

func (u *userService) GetUserById(id int) (dto.UserDto, e.ApiError) {

	var user model.User = userDAO.GetUserById(id)
	//declaro un dto de usuario
	var userDto dto.UserDto

	//si no lo trae, me da error de que no encontró el usuario
	if user.Id == 0 {
		return userDto, e.NewBadRequestApiError("no se ha encontrado el usuario")
	}

	userDto.Id = user.Id
	userDto.Name = user.Name
	userDto.LastName = user.LastName
	userDto.UserName = user.UserName
	userDto.Password = user.Password
	userDto.Email = user.Email
	userDto.Rol = user.Rol
	userDto.State = user.State

	/*
		for _, booking := range user.Bookings {
			var dtoBooking dto.BookingDto

			dtoBooking.DateFrom = booking.DateFrom.Format(layout)
			dtoBooking.DateTo = booking.DateTo.Format(layout)
			dtoBooking.Duration = booking.Duration
			dtoBooking.Price = booking.Price
			dtoBooking.HotelId = booking.HotelId

			userDto.BookingsDto = append(userDto.BookingsDto, dtoBooking)
		}*/

	return userDto, nil
}

func (u *userService) GetUserByUsername(username string) (dto.UserDto, e.ApiError) {

	var user model.User = userDAO.GetUserByUsername(username)
	//declaro un dto de usuario
	var userDto dto.UserDto

	//si no lo trae, me da error de que no encontró el usuario
	if user.UserName == "" {
		return userDto, e.NewBadRequestApiError("no se ha encontrado el usuario")
	}

	userDto.Id = user.Id
	userDto.Name = user.Name
	userDto.LastName = user.LastName
	userDto.UserName = user.UserName
	userDto.Password = user.Password
	userDto.Email = user.Email
	userDto.Rol = user.Rol
	userDto.State = user.State

	return userDto, nil
}

func (u *userService) GetUserByEmail(mail string) (dto.UserDto, e.ApiError) {

	var user model.User = userDAO.GetUserByEmail(mail)
	//declaro un dto de usuario
	var userDto dto.UserDto

	//si no lo trae, me da error de que no encontró el usuario
	if user.Email == "" {
		return userDto, e.NewBadRequestApiError("no se ha encontrado el usuario")
	}

	userDto.Id = user.Id
	userDto.Name = user.Name
	userDto.LastName = user.LastName
	userDto.UserName = user.UserName
	userDto.Password = user.Password
	userDto.Email = user.Email
	userDto.Rol = user.Rol
	userDto.State = user.State

	return userDto, nil
}

func (u *userService) GetUsers() (dto.UsersDto, e.ApiError) {

	var users model.Users = userDAO.GetUsers()
	var usersDto dto.UsersDto

	/*
		El código que proporcionas es un bucle for que recorre una lista de usuarios (users) y crea un objeto UserDto correspondiente para cada usuario.
		En cada iteración del bucle, se crea una nueva variable userDto del tipo dto.UserDto. Luego, se asignan los valores de cada campo del objeto user al objeto userDto correspondiente.
		Finalmente, el objeto userDto se agrega a la lista usersDto utilizando la función append().
	*/
	for _, user := range users {
		var userDto dto.UserDto

		userDto.Id = user.Id
		userDto.Name = user.Name
		userDto.LastName = user.LastName
		userDto.UserName = user.UserName
		userDto.Password = user.Password
		userDto.Email = user.Email
		userDto.Rol = user.Rol
		userDto.State = user.State

		usersDto = append(usersDto, userDto)
	}

	return usersDto, nil
}

func (u *userService) InsertUser(userDto dto.UserDto) (dto.UserDto, e.ApiError) {

	var user model.User

	user.Name = userDto.Name
	user.LastName = userDto.LastName
	user.UserName = userDto.UserName
	user.Password = userDto.Password
	user.Email = userDto.Email
	user.Rol = userDto.Rol
	user.State = userDto.State

	user = userDAO.InsertUser(user)

	userDto.Id = user.Id

	return userDto, nil
}

func (u *userService) UserLogin(loginDto dto.UserDto) (dto.UserDto, e.ApiError) {

	var user = userDAO.GetUserByEmail(loginDto.Email)

	if user.Id == 0 {
		return loginDto, e.NewBadRequestApiError("Usuario no registrado")
	}

	if user.Password != loginDto.Password {
		return loginDto, e.NewBadRequestApiError("Contraseña incorrecta")
	}
	loginDto.Id = user.Id
	loginDto.Name = user.Name
	loginDto.LastName = user.LastName
	loginDto.Rol = user.Rol

	return loginDto, nil
}
