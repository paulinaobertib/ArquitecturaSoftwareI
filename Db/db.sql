-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: bookingpstv
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(350) NOT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,'Sauna','Te invitamos a experimentar los beneficios rejuvenecedores y revitalizantes de nuestra sauna, una experiencia que elevará tus sentidos y te transportará a un estado de profundo bienestar.'),(2,'Sala de juegos','Para que los más pequeños de la familia puedan disfrutar de horas interminables de diversión y entretenimiento mientras crean recuerdos inolvidables durante su estancia.'),(3,'Gimnasio','Oasis de salud y energía diseñado para satisfacer todas tus necesidades de acondicionamiento físico'),(4,'Piscina','Oasis de frescura y diversión que te cautivará desde el primer momento'),(5,'Sum','Lugar ideal para celebrar reuniones sociales, eventos especiales o simplemente relajarte y disfrutar de un momento de tranquilidad.');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `user_id` int DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'2023-06-06','2023-06-15',2,1),(2,'2023-06-07','2023-06-22',1,2),(3,'2023-06-10','2023-06-30',2,7),(4,'2023-06-07','2023-06-16',6,1),(5,'2023-06-20','2023-06-30',2,2),(6,'2023-06-15','2023-06-30',2,2),(7,'2023-06-29','2023-06-30',2,3),(8,'2023-06-27','2023-07-08',2,3),(9,'2023-06-28','2023-07-08',2,12);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(350) NOT NULL,
  `telephone` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `rooms` int NOT NULL,
  `description` varchar(500) NOT NULL,
  `availability` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'Hotel Paramount','3513264538','hotelparamount@hp.com',8,'El Hotel Paramount es un destino de lujo con atención al detalle y un servicio impecable. Su arquitectura moderna y elegante crea un ambiente acogedor. Las habitaciones son elegantes y cuentan con comodidades de primer nivel.',1),(2,'Hotel Madagascar','3571690039','hotelmadagascar@hm.com',2,'El Hotel Madagascar es un destino de lujo con atención al detalle y un servicio impecable. Su arquitectura moderna y elegante crea un ambiente acogedor. Las habitaciones son elegantes y cuentan con comodidades de primer nivel. ',1),(3,'Hotel Galaxia Real','35137169039','hotelgalaxiareal@hotel.com',3,'El Hotel Galaxia Real es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(4,'Hotel Espejismo Secreto','3571690039','hotelepejismosecreto@hotel.com',2,'El Hotel Espejismo Secreto es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(5,'Hotel Happy Spring','3571681965','hotelhappyspring@hotel.com',20,'El Hotel Happy Spring es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(6,'Hotel Springfield','3571680813','hotelspringfield@hotel.com',7,'El Hotel Springfield es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(7,'Hotel Red Velvet','3513264537','hotelredvelvet@hotel.com',4,'El Hotel Red Velvet es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(8,'Hotel Manhattan','3513264536','hotelmanhattan@hotel.com',5,'El Hotel Manhattan es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(9,'Hotel Brillo Paralelo','3571690035','hotelbrilloparalelo@hotel.com',1,'El Hotel Brillo Paralelo es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(10,'Hotel Siempre Llueve','3577486302','hotelsiemprellueve@hotel.com',9,'El Hotel Siempre Llueve es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(11,'Hotel Triple B','35713736682','hoteltripleb@hotel.com',80,'El Hotel Triple B (Bueno, Bonito y Barato) es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1),(12,'Hotel Fiora Fly','3514678905','hotelfiorafly@hotel.com',8,'El Hotel Fiora Fly es uno de los mejores hoteles del mundo por su ubicacion, sus amenities, y, por sobre todo, por las personas que lo atienden',1);
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels_amenities`
--

DROP TABLE IF EXISTS `hotels_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels_amenities` (
  `hotel_id` int NOT NULL,
  `amenitie_id` int NOT NULL,
  PRIMARY KEY (`hotel_id`,`amenitie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels_amenities`
--

LOCK TABLES `hotels_amenities` WRITE;
/*!40000 ALTER TABLE `hotels_amenities` DISABLE KEYS */;
INSERT INTO `hotels_amenities` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `hotels_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(500) NOT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (5,'imagenesHoteles/59111eb9-b03d-46f4-bfab-6bc62e583284.jpg',1),(6,'imagenesHoteles/a67990f5-e43c-4e1c-bddc-29c0c4a8b455.jpg',1),(7,'imagenesHoteles/efd1bf62-e33c-4dd3-a142-234b0d6cc3bd.jpg',2),(8,'imagenesHoteles/adb326da-2053-4e71-a1db-c11810d72efe.jpg',2),(9,'imagenesHoteles/00285143-461a-4df7-8360-847ca4212f69.jpg',3),(10,'imagenesHoteles/766108b0-b469-424a-a467-57772a2b891b.jpg',4),(11,'imagenesHoteles/1700e70a-8679-4181-a5a5-9183f63ab1c5.jpg',4),(12,'imagenesHoteles/cf21a0c4-bedf-40da-8335-4b0c6320555f.jpg',4),(13,'imagenesHoteles/70335ea9-f113-42ec-8f1d-dd5b8d160f4d.jpg',5),(14,'imagenesHoteles/1e89a8f1-b10c-4322-8d13-9788b4fb03a0.jpg',6),(15,'imagenesHoteles/3d274488-3157-4833-bef0-2ac599053e05.jpg',7),(16,'imagenesHoteles/0a613318-e491-42b2-8050-36b82572cf77.jpg',7),(17,'imagenesHoteles/bb0591a2-9678-4539-9177-384fe2f9efb7.jpg',7),(18,'imagenesHoteles/c1e9ece0-0d08-4f7d-9c15-5985a7a79ffb.jpg',8),(19,'imagenesHoteles/ea4c36e6-2905-4ad5-a56b-dd825419d179.jpg',8),(20,'imagenesHoteles/ee4ea568-20d8-441a-a90e-09f537c59730.jpg',9),(21,'imagenesHoteles/2d0d602a-c7dc-410d-acac-9bf676e96687.jpg',10),(22,'imagenesHoteles/c2460cb6-25e0-47e5-b89c-a9f9622fc4f1.jpeg',10),(23,'imagenesHoteles/e46ed4c2-f7fc-4870-9012-9dbc84804c51.jpg',11),(24,'imagenesHoteles/3f917245-ef9a-4b54-9376-848d3d262f67.jpg',11),(25,'imagenesHoteles/bb9615e3-548d-4071-98a4-ebcd15514e04.jpg',12),(26,'imagenesHoteles/f941deff-8fca-4e42-bb03-bbcf09e17826.jpg',12);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(350) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `rol` tinyint(1) NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Grupo','PSTV','admipstv','pstv1234','admipstv@pstv.com',1,1),(2,'Paulina','Oberti Busso','paulinaobertib','paulina1234','paulinaobertibusso@gmail.com',0,1),(3,'Tomas','Cassanelli','tomicassanelli','tomas1234','tomicassanelli@gmail.com',0,1),(4,'Simon','Hernandez','simonhernandez','simon1234','simonhernandez@gmail.com',0,1),(5,'Victoria','Vaccarini','vickyvaccarini','victoria1234','vickyvaccarini@gmail.com',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-24 23:58:25
