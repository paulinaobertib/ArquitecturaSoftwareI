package model

type User struct {
	Id       int    `gorm:"primaryKey"`
	Name     string `gorm:"type:varchar(350);not null"`
	LastName string `gorm:"type:varchar(250);not null"`
	UserName string `gorm:"type:varchar(150);not null;unique"`
	Password string `gorm:"type:varchar(150);not null"`
	Email    string `gorm:"type:varchar(150);not null"`
	Rol      bool   `gorm:"type:boolean; not null"`
	State    bool   `gorm:"type:boolean; not null"`

	Bookings Bookings `gorm:"foreignKey:userId"`
}

type Users []User
