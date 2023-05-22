package dto

type UserDto struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	LastName string `json:"last_name"`
	UserName string `json:"user_name"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Rol      bool   `json:"rol"`
	State    bool   `json:"state"`
}

type UsersDto []UserDto
