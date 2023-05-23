package model

type Amenitie struct {
	Id          int    `gorm:"primaryKey"`
	Name        string `gorm:"type:varchar(350);not null"`
	Description string `gorm:"type:varchar(500);not null"`
}

type Amenities []Amenitie
