package model

type Hotel struct {
	Id           int    `gorm:"primaryKey"`
	Name         string `gorm:"type:varchar(350);not null"`
	Telephone    string `gorm:"type:varchar(50);not null"`
	Email        string `gorm:"type:varchar(150);not null"`
	Rooms        int    `gorm:"type:integer;not null"`
	Description  string `gorm:"type:varchar(500);not null"`
	Availability int    `gorm:"type:integer;not null"`

	Bookings Bookings `gorm:"foreignKey:hotelId"`
}

type Hotels []Hotel
