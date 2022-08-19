-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: admin
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `bookmark_id` bigint NOT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`bookmark_id`),
  KEY `FKkm47dr0i09mor5ks9aaebx15u` (`post_id`),
  KEY `FK3ogdxsxa4tx6vndyvpk1fk1am` (`user_id`),
  CONSTRAINT `FK3ogdxsxa4tx6vndyvpk1fk1am` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKkm47dr0i09mor5ks9aaebx15u` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES (31,23,6),(32,24,6),(77,16,14),(89,23,17),(90,27,17),(95,44,5),(108,37,4),(109,42,4),(122,42,27);
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `profileurl` varchar(255) DEFAULT NULL,
  `time` datetime(6) DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (2,'멋있는 척 지리는거 아닙니까?',NULL,'2022-08-17 13:57:37.046173',36,10),(3,'쏘 큐트!',NULL,'2022-08-17 13:57:56.565758',34,10),(4,'바글바글 와글와글ㅋㅋㅋㅋㅋㅋㅋㅋ',NULL,'2022-08-17 14:11:45.162759',37,10),(5,'너무 멋져요~~',NULL,'2022-08-17 14:19:35.233373',37,8),(6,'사람은 3명이지만 마음은 6명',NULL,'2022-08-17 14:23:10.799614',39,16),(7,'싸피가 좋아~~',NULL,'2022-08-17 14:28:14.262036',16,14),(8,'히야아',NULL,'2022-08-17 14:29:06.929230',39,15),(9,'다들 어디갔오..ㅠ',NULL,'2022-08-17 14:29:49.871956',39,14),(10,'너 납치된거야..',NULL,'2022-08-17 15:10:37.768059',36,4),(11,'유석구.. 그는 대체..',NULL,'2022-08-17 15:10:42.009126',36,8),(12,'씸플로고 좋아요!',NULL,'2022-08-17 15:12:01.269355',27,17),(15,'쏘큐트!',NULL,'2022-08-17 16:23:26.540563',34,4),(19,'A101 팀 화이팅!',NULL,'2022-08-17 17:22:56.111469',50,5),(20,'hello',NULL,'2022-08-17 17:23:48.354859',50,27),(21,'A101팀 최고야~!~!~! 수고했어',NULL,'2022-08-17 17:40:55.352861',56,5),(22,'하트 예뻐요!',NULL,'2022-08-17 17:40:59.458914',23,8),(23,'꺄악 하트가 너무 이뻐요',NULL,'2022-08-17 17:41:00.391087',56,4),(24,'와! 너무 멋진 하트에요!',NULL,'2022-08-17 17:41:00.393375',56,3),(27,'퀄리티 넘 좋아여~~',NULL,'2022-08-17 19:33:08.245245',37,11),(28,'콩순이 뺨치는 깜찍함',NULL,'2022-08-17 20:41:55.570881',46,5),(29,'넘 귀여워요..🫶🏻',NULL,'2022-08-17 20:50:05.394736',39,5);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follow_id` bigint NOT NULL AUTO_INCREMENT,
  `follower_user_id` bigint DEFAULT NULL,
  `following_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `FKb683l34x3dmqfelidr8l2e5cn` (`follower_user_id`),
  KEY `FKmob5gqk7nmxu9p9xpiae8txeb` (`following_user_id`),
  CONSTRAINT `FKb683l34x3dmqfelidr8l2e5cn` FOREIGN KEY (`follower_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKmob5gqk7nmxu9p9xpiae8txeb` FOREIGN KEY (`following_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (1,6,5),(2,8,14),(3,8,5),(4,5,10),(5,5,4),(6,5,17),(8,4,5),(10,10,5),(11,5,8);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frame`
--

DROP TABLE IF EXISTS `frame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frame` (
  `frame_id` bigint NOT NULL AUTO_INCREMENT,
  `frame_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`frame_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frame`
--

LOCK TABLES `frame` WRITE;
/*!40000 ALTER TABLE `frame` DISABLE KEYS */;
INSERT INTO `frame` VALUES (1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/53fe0728-a2de-47e8-ab9b-64b0776b0ba2_1660702528563.png'),(2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/ecb620d3-2341-4979-8e7c-30ceac5129bd_1660702553864.png'),(3,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/7087de43-8e24-47d1-bb44-69413c0fb04a_1660702585147.png'),(4,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/3aa45150-7b34-48cc-bdc4-078ba9b8802f_1660702600126.png'),(5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/d5071278-7954-485c-9619-fa913725aa9e_1660702620364.png'),(6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/f889c143-18dc-46de-853e-9b9e32af5b6d_1660702631728.png'),(7,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/fde37ac5-a839-453a-adb3-ecd17aa5cda0_1660702653243.png'),(8,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/8ed71cd4-6a43-4939-8935-f81ca79b8f4b_1660702667313.png'),(9,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/fee7ebcd-83e0-4e24-906d-7b4c759ec308_1660702974810.png'),(10,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/21b14abb-6584-48f3-971e-252e02aee27a_1660703073121.png'),(11,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/aef9115c-e2db-46f7-83d8-5ac2d275d35a_1660703097887.png'),(12,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/ee6a59d7-636e-4bae-a0a2-d1171a68817c_1660703127303.png'),(13,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/a5bf9216-968f-4932-8e83-e1448eb6be5b_1660703148729.png'),(14,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/1addbe09-605c-40e6-9ce8-bce52a455460_1660703171645.png'),(15,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/7fe57990-0efe-4376-9a37-d02281c932de_1660703192404.png'),(16,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/b4be158c-a6fb-46dd-8cf2-16e30b28ee4e_1660705733342.png'),(17,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/56037798-4231-498e-bbf6-e8c0a80e790b_1660705771347.png'),(18,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/b6c66759-9037-47b6-853a-0624390d5cc3_1660705830966.png'),(19,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/c7c49263-38f5-4ec0-a4c0-62135a3d6a97_1660705936491.png'),(22,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/e6350bc5-4fb7-40a9-bd3c-a5aa72885852_1660709184904.png');
/*!40000 ALTER TABLE `frame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (123);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_page`
--

DROP TABLE IF EXISTS `my_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_page` (
  `mypage_id` bigint NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `is_shared` bit(1) NOT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`mypage_id`),
  KEY `FKdenqamd3fy71s6a6pvfhegen1` (`post_id`),
  KEY `FKdrg005oa11v2donfrcrvhpvfj` (`user_id`),
  CONSTRAINT `FKdenqamd3fy71s6a6pvfhegen1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `FKdrg005oa11v2donfrcrvhpvfj` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_page`
--

LOCK TABLES `my_page` WRITE;
/*!40000 ALTER TABLE `my_page` DISABLE KEYS */;
INSERT INTO `my_page` VALUES (1,'frame',_binary '',1,1),(2,'frame',_binary '',2,1),(3,'frame',_binary '',3,1),(4,'frame',_binary '',4,1),(5,'frame',_binary '',5,1),(6,'frame',_binary '',6,1),(7,'frame',_binary '',7,1),(8,'frame',_binary '',8,1),(9,'frame',_binary '',9,1),(10,'frame',_binary '',10,1),(11,'frame',_binary '',11,1),(12,'frame',_binary '',12,1),(13,'frame',_binary '',13,1),(14,'frame',_binary '',14,1),(15,'frame',_binary '',15,1),(16,'frame',_binary '',16,1),(17,'frame',_binary '',17,1),(18,'frame',_binary '',18,1),(19,'frame',_binary '',19,1),(22,'photogroup',_binary '',21,3),(23,'photogroup',_binary '',21,4),(24,'photogroup',_binary '',23,5),(25,'photogroup',_binary '',24,5),(26,'photogroup',_binary '',24,3),(27,'photogroup',_binary '',25,5),(28,'photogroup',_binary '',25,3),(29,'photogroup',_binary '',26,3),(30,'frame',_binary '',27,1),(33,'photogroup',_binary '',28,3),(41,'photogroup',_binary '',29,3),(42,'photogroup',_binary '',30,3),(43,'photogroup',_binary '',32,8),(44,'photogroup',_binary '',31,8),(45,'photogroup',_binary '',30,8),(46,'photogroup',_binary '',29,8),(47,'photogroup',_binary '',25,8),(48,'photogroup',_binary '',28,8),(49,'photogroup',_binary '',24,8),(50,'photogroup',_binary '',26,8),(51,'photogroup',_binary '',26,5),(52,'photogroup',_binary '',28,5),(53,'photogroup',_binary '',29,5),(54,'photogroup',_binary '',30,5),(55,'photogroup',_binary '',31,5),(56,'photogroup',_binary '',32,5),(57,'photogroup',_binary '',34,9),(58,'photogroup',_binary '',32,9),(59,'photogroup',_binary '',31,9),(60,'photogroup',_binary '',35,3),(61,'photogroup',_binary '',30,9),(62,'photogroup',_binary '',29,9),(63,'photogroup',_binary '',35,8),(64,'photogroup',_binary '',25,9),(66,'photogroup',_binary '',28,9),(67,'photogroup',_binary '',26,9),(68,'photogroup',_binary '',36,4),(69,'photogroup',_binary '',26,4),(70,'photogroup',_binary '',24,4),(71,'photogroup',_binary '',28,4),(72,'photogroup',_binary '',25,4),(73,'photogroup',_binary '',37,10),(74,'photogroup',_binary '',37,11),(76,'photogroup',_binary '',39,14),(78,'photogroup',_binary '',39,15),(79,'photogroup',_binary '',39,16),(80,'photogroup',_binary '',40,17),(81,'photogroup',_binary '',42,3),(82,'photogroup',_binary '',42,9),(83,'photogroup',_binary '',42,17),(84,'photogroup',_binary '',43,19),(85,'photogroup',_binary '',43,18),(91,'photogroup',_binary '',42,5),(92,'photogroup',_binary '',42,8),(93,'frame',_binary '',2,20),(94,'photogroup',_binary '',44,5),(96,'frame',_binary '',2,2),(97,'frame',_binary '',1,2),(98,'frame',_binary '',2,2),(99,'frame',_binary '',2,2),(105,'photogroup',_binary '',42,10),(106,'photogroup',_binary '',46,4),(107,'photogroup',_binary '',41,10),(112,'photogroup',_binary '',50,27),(117,'photogroup',_binary '',50,8),(119,'photogroup',_binary '',56,27),(121,'photogroup',_binary '',42,27);
/*!40000 ALTER TABLE `my_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_group`
--

DROP TABLE IF EXISTS `photo_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo_group` (
  `photogroup_id` bigint NOT NULL AUTO_INCREMENT,
  `frame_id` bigint DEFAULT NULL,
  `human_count` bigint DEFAULT NULL,
  `photo_group_path` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`photogroup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_group`
--

LOCK TABLES `photo_group` WRITE;
/*!40000 ALTER TABLE `photo_group` DISABLE KEYS */;
INSERT INTO `photo_group` VALUES (1,12,2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/ea062231-462f-4bd8-8a6a-ad8bedf18e8d_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/484afd1b-e375-44e2-8db5-15462bbb8dbb_mergedVideo.mp4'),(2,11,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/8ae6aefa-21e3-41b0-857c-d244434075f9_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/4b842201-3225-4d7a-a2a0-c22ac5fcb97f_mergedVideo.mp4'),(3,9,5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/a45b736c-d23d-43b3-8c09-7a67258befa5_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/a327e098-5d06-4919-b6ce-c254f7b5a479_mergedVideo.mp4'),(4,21,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/b734c072-8c9e-4e09-bae9-4d646de3596d_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/24e5b4e9-b598-414d-b44a-66da94547c0b_mergedVideo.mp4'),(5,6,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/4b72b708-729e-4af5-b63a-f208c573681b_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/09dbff72-ac65-48c3-9f84-847ef52c5a72_mergedVideo.mp4'),(6,18,5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/1679d5fb-c195-4256-af9b-9ece4bc05414_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/0365ccb1-c683-4937-9a14-cb3ac8eb976f_mergedVideo.mp4'),(7,5,4,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/d13d8f68-2b4e-48e9-b64c-932d10979433_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/c1c6d6e4-61d9-4b95-9ae3-f76871ca9c88_mergedVideo.mp4'),(8,15,4,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/f3210769-91e2-480f-823b-09ca1d212a76_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/d22cdb8b-cce1-49c9-8ee2-e5e5c2420ede_mergedVideo.mp4'),(9,14,3,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/00d16597-ae0d-45e9-a34d-30bcefa4cf89_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/f21f01c6-3dce-472c-9139-8b0d393bf24b_mergedVideo.mp4'),(10,11,3,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/096530c7-3ba8-4e52-a03f-2a9d49aa0c9a_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/1e2fe0fc-dbb0-44c9-8373-be0a3208b34d_mergedVideo.mp4'),(12,19,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/b56837a3-0240-4d4c-83e1-b18c0b802042_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/28b9d77b-0b20-4c8c-8e5d-f55638bdd771_mergedVideo.mp4'),(13,13,2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/422c4728-2de3-4379-be52-871077c93df1_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/9d32966a-5098-42fc-a881-c05cd6f0a479_mergedVideo.mp4'),(14,4,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/e502798c-044d-4373-ba5c-50f0bc127935_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/48f4f186-26fc-459c-901d-e33765f83820_mergedVideo.mp4'),(15,22,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/b9beeab7-dec1-4d6e-8f69-5c6dde3441e7_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/51431823-613b-43ec-90c6-24d876fab47a_mergedVideo.mp4'),(16,22,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/4d84ce5d-74af-4e1d-a12e-95fea36de377_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/b9353a34-75e5-4a77-a7ad-16d2e396c70b_mergedVideo.mp4'),(17,16,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/c7c2c4cf-012e-43d1-8b84-2f9b5430564d_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/29fed2b9-9b27-4615-8897-fbaf83317776_mergedVideo.mp4'),(18,5,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/fdf53361-9110-4733-9be9-5102ecca3933_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/44f92a65-aa12-487c-b32d-321d7cb14a42_mergedVideo.mp4'),(19,18,2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/03299dc8-044d-4f92-91c6-40d1b6c75ed0_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/34e62e5a-276d-467a-a9db-0c9d672bc3f0_mergedVideo.mp4'),(20,11,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/e95fbe87-36a8-4f0b-be73-081ed16d69ba_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/b95d9d45-7742-4b84-a242-efd01e8b57f4_mergedVideo.mp4'),(21,2,5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/3241789f-82ab-4a03-be8e-38d859351c06_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/3c88232f-f460-40ba-9bef-2631a018da7a_mergedVideo.mp4'),(22,18,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/dcd79f56-4e19-491d-8324-90981bb70004_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/b6b36893-c7e6-4ee2-b015-8201d646bc31_mergedVideo.mp4'),(23,5,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/a762276d-0285-440d-803a-ee569bbaea82_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/ef3977ff-8bf7-41f2-b962-10cbb940a194_mergedVideo.mp4'),(24,15,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/7863a05d-301e-4e0a-8255-703898657d7c_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/4d82f883-e2f9-41f6-8efb-6e2f2db1035d_mergedVideo.mp4'),(25,15,5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/6cd8b4b4-f669-4e9f-af70-d79bb32d0350_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/b0b0886f-6648-412c-8e76-fd687e2f2a9e_mergedVideo.mp4'),(26,18,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/efe30152-cf2f-46d8-a339-7971f722804f_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/be93b707-9749-4078-8d3c-553e704fab50_mergedVideo.mp4'),(27,13,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/dd6ef4b0-cc39-4269-8be6-58c1dcabcb8c_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/c6fc13a6-3c50-489f-ab95-591f17116fa0_mergedVideo.mp4'),(28,16,2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/894a6a48-50ef-4f59-9b8a-40033dda1cb5_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/df4c4ce9-da59-45c0-a44e-e794c484dd13_mergedVideo.mp4');
/*!40000 ALTER TABLE `photo_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `is_shared` bit(1) NOT NULL,
  `like_count` int NOT NULL,
  `time` datetime(6) DEFAULT NULL,
  `frame_id` bigint DEFAULT NULL,
  `photogroup_id` bigint DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK185cacifusrxbpoao3txebxq1` (`frame_id`),
  KEY `FK6wg56xdsrjnjurvtxxpk6w81t` (`photogroup_id`),
  CONSTRAINT `FK185cacifusrxbpoao3txebxq1` FOREIGN KEY (`frame_id`) REFERENCES `frame` (`frame_id`),
  CONSTRAINT `FK6wg56xdsrjnjurvtxxpk6w81t` FOREIGN KEY (`photogroup_id`) REFERENCES `photo_group` (`photogroup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'frame','기본프레임 1번입니다.',_binary '',0,'2022-08-17 11:15:29.769919',1,NULL),(2,'frame','기본프레임 2번입니다.',_binary '',0,'2022-08-17 11:15:55.042319',2,NULL),(3,'frame','기본프레임 3번입니다.',_binary '',0,'2022-08-17 11:16:26.293284',3,NULL),(4,'frame','기본프레임 4번입니다.',_binary '',0,'2022-08-17 11:16:41.272636',4,NULL),(5,'frame','기본프레임 5번입니다.',_binary '',0,'2022-08-17 11:17:01.577421',5,NULL),(6,'frame','기본프레임 6번입니다.',_binary '',0,'2022-08-17 11:17:12.878271',6,NULL),(7,'frame','기본프레임 7번입니다.',_binary '',0,'2022-08-17 11:17:34.400595',7,NULL),(8,'frame','기본프레임 8번입니다.',_binary '',0,'2022-08-17 11:17:48.479542',8,NULL),(9,'frame','벚꽃 프레임입니다. 꽃잎이 살랑살랑~',_binary '',0,'2022-08-17 11:22:56.111440',9,NULL),(10,'frame','나뭇잎 프레임입니다. 나뭇잎이 푸릇푸릇!',_binary '',0,'2022-08-17 11:24:34.461234',10,NULL),(11,'frame','고양이 프레임입니다냥!',_binary '',0,'2022-08-17 11:24:59.008881',11,NULL),(12,'frame','고래 프레임입니다. 철썩철썩',_binary '',0,'2022-08-17 11:25:28.506329',12,NULL),(13,'frame','마카롱 프레임입니다. 달콤한 하루되세요!',_binary '',0,'2022-08-17 11:25:49.981545',13,NULL),(14,'frame','체크무늬 프레임입니다. 체크는 클래식이죠^^',_binary '',0,'2022-08-17 11:26:12.853285',14,NULL),(15,'frame','수박 프레임입니다. 수박 먹고 시원한 여름 나세요~',_binary '',0,'2022-08-17 11:26:33.698061',15,NULL),(16,'frame','싸피 로고 프레임입니다. 싸피에 진심인 사람 모여!!!',_binary '',2,'2022-08-17 12:08:53.811527',16,NULL),(17,'frame','싸피 색연필 프레임입니다. 옹기종기 귀여운 우리 싸피 친구들~ 여기 모여라~',_binary '',0,'2022-08-17 12:09:31.816100',17,NULL),(18,'frame','사탕 껍질 재질 프레임입니다. 문구점 불량식품 맛 기억하시는 분?',_binary '',0,'2022-08-17 12:10:31.466570',18,NULL),(19,'frame','감성 프레임입니다. 수채화 물감 한방울!',_binary '',0,'2022-08-17 12:12:18.151571',19,NULL),(21,'photogroup','none',_binary '',2,'2022-08-17 12:14:08.509407',NULL,1),(23,'photogroup','none',_binary '',6,'2022-08-17 12:41:03.141685',NULL,2),(24,'photogroup','none',_binary '',2,'2022-08-17 12:48:43.736117',NULL,3),(25,'photogroup','none',_binary '',2,'2022-08-17 12:56:35.665110',NULL,4),(26,'photogroup','none',_binary '',2,'2022-08-17 13:03:37.161886',NULL,5),(27,'frame','SSAFY simple logo 입니다~',_binary '',1,'2022-08-17 13:05:44.314280',22,NULL),(28,'photogroup','none',_binary '',1,'2022-08-17 13:08:22.471880',NULL,6),(29,'photogroup','none',_binary '',0,'2022-08-17 13:12:33.744242',NULL,7),(30,'photogroup','none',_binary '',1,'2022-08-17 13:16:44.996640',NULL,8),(31,'photogroup','none',_binary '',1,'2022-08-17 13:19:51.010461',NULL,9),(32,'photogroup','none',_binary '',3,'2022-08-17 13:24:03.980371',NULL,10),(34,'photogroup','none',_binary '',2,'2022-08-17 13:41:30.125262',NULL,12),(35,'photogroup','none',_binary '',2,'2022-08-17 13:44:05.408187',NULL,13),(36,'photogroup','none',_binary '',4,'2022-08-17 13:46:42.706807',NULL,14),(37,'photogroup','none',_binary '',9,'2022-08-17 14:03:33.756846',NULL,15),(38,'photogroup','none',_binary '\0',0,'2022-08-17 14:12:15.601542',NULL,16),(39,'photogroup','none',_binary '',6,'2022-08-17 14:16:29.909639',NULL,17),(40,'photogroup','none',_binary '',3,'2022-08-17 14:51:10.971437',NULL,18),(41,'photogroup','none',_binary '',1,'2022-08-17 14:55:21.921966',NULL,19),(42,'photogroup','none',_binary '',4,'2022-08-17 15:01:05.504986',NULL,20),(43,'photogroup','none',_binary '',1,'2022-08-17 15:04:17.862573',NULL,21),(44,'photogroup','none',_binary '',1,'2022-08-17 15:23:45.412429',NULL,22),(45,'photogroup','none',_binary '\0',0,'2022-08-17 16:05:27.908413',NULL,23),(46,'photogroup','none',_binary '',1,'2022-08-17 16:10:56.122271',NULL,24),(49,'photogroup','none',_binary '\0',0,'2022-08-17 16:45:39.599288',NULL,25),(50,'photogroup','none',_binary '',0,'2022-08-17 17:21:13.847409',NULL,26),(56,'photogroup','none',_binary '',0,'2022-08-17 17:40:00.536757',NULL,27),(58,'photogroup','none',_binary '\0',0,'2022-08-17 17:58:27.815537',NULL,28);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postlike`
--

DROP TABLE IF EXISTS `postlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postlike` (
  `like_id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `FK3srt471ix9w98mcbbghlryvgd` (`post_id`),
  KEY `FKd2ixit27ape17um580q9em91n` (`user_id`),
  CONSTRAINT `FK3srt471ix9w98mcbbghlryvgd` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `FKd2ixit27ape17um580q9em91n` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postlike`
--

LOCK TABLES `postlike` WRITE;
/*!40000 ALTER TABLE `postlike` DISABLE KEYS */;
INSERT INTO `postlike` VALUES (1,23,6),(2,24,6),(3,25,6),(4,23,5),(5,32,8),(6,23,10),(7,36,10),(8,34,10),(9,25,3),(10,26,3),(11,23,3),(12,36,3),(13,34,3),(14,35,3),(15,21,3),(16,32,3),(17,31,3),(18,37,10),(20,37,5),(21,37,8),(22,37,3),(23,16,14),(24,39,16),(26,39,15),(27,39,14),(28,37,9),(29,36,4),(30,36,8),(31,40,8),(45,23,17),(46,16,17),(47,27,17),(48,23,4),(49,37,17),(50,44,5),(51,40,21),(52,43,21),(53,42,5),(54,46,4),(58,37,4),(59,42,4),(61,21,4),(62,26,4),(63,24,4),(64,28,4),(65,35,4),(66,32,4),(67,30,4),(69,39,4),(70,42,27),(71,37,11),(72,40,11),(73,41,10),(74,42,10),(75,39,5);
/*!40000 ALTER TABLE `postlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `access_token` varchar(255) DEFAULT NULL,
  `activated` bit(1) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  `iskakao` bit(1) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profileurl` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_589idila9li6a4arw1t8ht1gx` (`phone`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,_binary '\0','PhoRest 공식 계정입니다.',_binary '\0','PhoRest','$2a$10$xc0sYHeyGL4QdbSyiDJMRuUI2MzMmzaadYLsxY/EA7S5DB.AT4.q.','01000000000','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/4e60b9cb-4c66-4a98-9e15-7a6bd287b513_logo.png',NULL,'USER','phorest'),(2,NULL,_binary '',NULL,_binary '\0','탈퇴한 회원','$2a$10$uDn/oj78SqwB/WvsN.yX8el.pOvYsTa3qQ1ccnyGhP6Z.hjpj2ucK','01000001111',NULL,NULL,'USER','unkn0wnuser'),(3,'YaV0qpDI9qVVG2z2ym5OVAScYkME_O9VdBKKpu9sCj1y6gAAAYKpzB1J',_binary '','',_binary '','naran','$2a$10$Ex.akwKana8wOo66pMMxW.ypkXdw6nMYwRH9hF/UTiZwxXo8r6X26',NULL,'http://k.kakaocdn.net/dn/bedMKS/btq80yBXRUQ/q3KoXqIZjDVuCjSYKLOqZ1/img_640x640.jpg','Y-0pKH90mnwGHpC754-U7Luftom8-zMwyMqG-NJ8Cj1y6gAAAYKpzB1I','USER','2378533762@k'),(4,'T2cH6daInULh35P5gVGr7jibxtR04fg53BJ1ZEKrCj1zTgAAAYKpzSaU',_binary '','저는 싸피의 유현우입니다',_binary '','유현우','$2a$10$fXCNXA9NLivZOWEdBiG9xOihBWGhLss2VDwye.x0.XofpMQXria8e',NULL,'http://k.kakaocdn.net/dn/bQwQ72/btrIptESA9k/ZfXki16hTLoQhnACPQh7I1/img_640x640.jpg','-H2Ln-Jrtx62j9sw9meylB8RcXrDLVIKU4InFF0dCj1zTgAAAYKpzSaS','USER','2382940731@k'),(5,'5fVZbtmEuaw5UB-f3H38D9VFewModuZov42gnV3vCisMpgAAAYKp5qRU',_binary '',NULL,_binary '','최희선','$2a$10$LapvY6kV4omJr/78AsLFeOVM06FFNLDApdcBYYylnuFxeGK0OBTm2',NULL,'http://k.kakaocdn.net/dn/bAVjnM/btrHzn6GKdM/kNX6ROkU0ySfFo0urxSydk/img_640x640.jpg','3hhW2JSdiFFHPw1SAW8PtzPmBtii7pV2p8mPRsflCisMpgAAAYKp5qRT','USER','2376488902@k'),(6,'1AZO9SIbEp4tS0NL5ajI6RmsVjZv_s86zRExb6rRCj1z7AAAAYKp-0fP',_binary '',NULL,_binary '','양현모','$2a$10$.x0y3Wn7ePp/49Gmz12u8ugSU2rEKa7j/qgEazRLl2Xj3R1ja79gG',NULL,'http://k.kakaocdn.net/dn/19NR2/btrHrvEF4D2/bpqoYIAIUhHYwen2fyUoR0/img_640x640.jpg','tf4-l4H-7ZxG0mUuGjps1ufStZ0L2vgngrwLFJKyCj1z7AAAAYKp-0fO','USER','2392005465@k'),(8,'o-oGHM2qsf9y-KD695ZPMwoSGLRFZWPpTeOzc9bTCisM1AAAAYKqDsVE',_binary '','저는 사용자입니다',_binary '','히히히','$2a$10$Mlrot.rto/g7s8h4qvEFmuKE.t5n3Pv15mmT0BNZm2JkEEPjIFOWa',NULL,'http://k.kakaocdn.net/dn/j4AHI/btrIxBERtX1/22QkASKvtN7JY1UHoD4MMK/img_640x640.jpg','47MasO14e3_nhRDmsCbvqFJHspixrzI3urmNRd2nCisM1AAAAYKqDsVC','USER','2382940880@k'),(9,'Uzrr91UnDNVF_84vEnH5GDl0kzNiB-wAQ6zTqFIKCilv1QAAAYKqHTZ8',_binary '',NULL,_binary '','김보경','$2a$10$1yWgs2Px91ROsrpR1PfeV.Yi.XuB9mJNduR5pqm4P67XH4DcMSMwO',NULL,'http://k.kakaocdn.net/dn/cmkAgB/btrJARTbm3X/qdhxAhzIjjoS0q8SKT4md1/img_640x640.jpg','YLhGOLJANraYMMfaIhGNJlHsAE60D8i1CODK0WnpCilv1QAAAYKqHTZ6','USER','2378511088@k'),(10,NULL,_binary '','나는 라이언입니다.',_binary '\0','라이언','$2a$10$0HNBLOb.VKp26UvVC9/6c.KXaQxR0wyQODHnA4nyRHTuLLwN871mS','01012341222','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/62582505-4924-4845-b16d-bf2841a85b67_%EB%9D%BC%EC%9D%B4%EC%96%B8%EC%97%84%EC%A7%80.gif',NULL,'USER','test123'),(11,'GBwiRDVe9bt_Ez6W01HUR8-cH74kcxi09f_0f_XQCinJXwAAAYKqMdrA',_binary '',NULL,_binary '','천민우','$2a$10$k1iI7wIkY2ShMKyJcXXKEOfSpHqzhyIf7CfF5lxWSXzE4pxGodtX2',NULL,'http://k.kakaocdn.net/dn/dpyfiq/btrJBEz8onZ/9fPMCN6szV5Tm9nUtKX131/img_640x640.jpg','pAlD5MP5SCPsU61w97C_g-ljgyErNP9HTiMs1pFhCinJXwAAAYKqMdq_','USER','2392088995@k'),(12,NULL,_binary '',NULL,_binary '\0','호에엥','$2a$10$VJPWTAcW5fPWFKRYq.1f1OYbRozecR/vjYtDc9HegXt.9Q0dE3IRm','01011112222',NULL,NULL,'USER','tpq0310'),(13,'WV96c0TBNg50UlKnuz27KzW4vdN6MzXl230LbopBCj10EQAAAYKqMoXl',_binary '',NULL,_binary '','서요셉','$2a$10$0iXTHW4gx2xx0s9wghOcpOi4DrKEuaN8uKK45X70vbR1hfW2OkYPa',NULL,'http://k.kakaocdn.net/dn/UFlWR/btrE516WC2X/Ge9sVidrK09zwrUR9VALm0/img_640x640.jpg','waGvJUb2_Ug0WMSZ38h59y2qCXT0P2dq7GQ8AypuCj10EQAAAYKqMoXk','USER','2392090596@k'),(14,'ThjgH2eDivXSOSUT3aWpbUgggUitPUU_R_vWPHOfCilwngAAAYKqPcR-',_binary '',NULL,_binary '','안예림','$2a$10$o9roWB9txqmrlFR9z5jTk.ZQNlscYkqkXW3G6XhMZSqLfIJJ/lKxy',NULL,'http://k.kakaocdn.net/dn/bLCfir/btrI9luAtng/bOJ6xk4gb2hYbtKkhOzl20/m1.jpg','XdvpS3612Qcl_7T5KxZ9A4gG925EWte-SstmguyhCilwngAAAYKqPcR8','USER','2392112096@k'),(15,NULL,_binary '','',_binary '\0','Zishsj','$2a$10$jGlBQiDoQsZ1h29kghXJYu8Q17q6P9Amfjtyz0U05cnG43XARvMT6','01049403959','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/68667102-5a8e-46d1-8370-2c0ffc044ed7_BE71A329-5998-40B2-B188-9BCD4BD15133.jpeg',NULL,'USER','Zzingnee'),(16,NULL,_binary '',NULL,_binary '\0','나만ㅇ업ㄱ어','$2a$10$KIVkojJInYKw.Y37lEqM5Okl9uGAEyuBkexqun8uGqJZfjZDWc79m','01026280246',NULL,NULL,'USER','qwer1234'),(17,'gqf3u5svwr0Ud5sxeM_G1Tpvly1dP1FgXGMxIzYPCinJXwAAAYKqXPTV',_binary '',NULL,_binary '','이상현(Ryan)','$2a$10$rno13hh.6s/L2Pww64b5K.uNqcd7QgS.52soO1q2AOuHLy6gsBM/y',NULL,'http://k.kakaocdn.net/dn/hhu7E/btrJwuJYKUc/FYEOAFbDjNfROAhZ5PgVJ1/img_640x640.jpg','LP4VoCgBWrDwbHGKQHE2nJ3LUwQG8Y9pLE8P9yYRCinJXwAAAYKqXPTU','USER','2392164365@k'),(18,'jakwzYQcSzbikMFlr66lawN0bU7EiHeM9_7KHxltCj10mAAAAYKqaky5',_binary '',NULL,_binary '','석인','$2a$10$eoUwuv.R.a9ogoLLE9jNheIKy8/jayt3ZGVUsf79S.6kmjkWUcDNy',NULL,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','0FzFEPV-Or04iArqzyTQ7adi5pOkc0hrNT-tgB-hCj10mAAAAYKqaky4','USER','2392186189@k'),(19,'MET9H5m_5uHX_y-j-p4SCuu0eRoUJlaAcB92-dDpCj1zTgAAAYKqas3A',_binary '\0',NULL,_binary '','태경','$2a$10$sUc58FXc/u532gJ/ijeE7.GkUYYdkrYDJClyTKQe/3cdOMtrTSrJe',NULL,'http://k.kakaocdn.net/dn/b0ANSv/btrGg3wx2WH/NnX5eiByRa3bK7J79rfzAK/m1.jpg','q8R-AdskRJ1ERapNLsxTswpeJvq1-gdzxov-ZPLeCj1zTgAAAYKqas2_','USER','2392187004@k'),(20,NULL,_binary '\0',NULL,_binary '\0','MoCCo','$2a$10$sbxRkDVmlafx/ZpvVZl3deA/fT.0SxRW0SUPGVp8IU7/qI4sML28.','01056362345',NULL,NULL,'USER','kd8317'),(21,'CSvMnmzQlqT10Q3xsEJ5LaMVaeMfZ1Ln8WifEom3CisM0gAAAYKqftfb',_binary '',NULL,_binary '','박철민','$2a$10$eXzUh.AjKpe4fiuVmULEweAY3U0zI.Pf/7TK6Dj96k/KaaynNaFKC',NULL,'http://k.kakaocdn.net/dn/btt0r4/btroLDHZjMX/kzwADF4Py7qTRacjnafvlK/img_640x640.jpg','JJGdFAI3OB3b1Zh9CV2D3mEpoiY6yu8R81THjDViCisM0gAAAYKqftfa','USER','2392218543@k'),(27,'EybLz48EEOsSIaUwyDrWJv_rNe0XNO7eNg-bdsTkCj11mwAAAYKq0ObS',_binary '',NULL,_binary '','김도현','$2a$10$jxWW1w6OSPzUv23KqewcIOPThCuVX9lxUtJm0f93ZUCgFq.f5k.TC',NULL,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','3HIOM6sO8CXls5MR_e3jeDt5OHW8EOikd9V2uXuFCj11mwAAAYKq0ObQ','USER','2378532693@k');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-17 21:51:21
