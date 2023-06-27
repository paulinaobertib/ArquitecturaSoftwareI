package app

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

var (
	router *gin.Engine
)

func init() {
	router = gin.Default()
	router.Use(cors.Default())
	// Ruta para servir archivos estáticos desde "imagenesHoteles"
	router.Static("/imagenesHoteles", "./imagenesHoteles")
}

func StartRoute() {
	mapUrls()

	log.Info("Starting server")
	router.Run(":8090")
}