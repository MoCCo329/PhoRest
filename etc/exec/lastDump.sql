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
INSERT INTO `bookmark` VALUES (31,23,6),(32,24,6),(77,16,14),(89,23,17),(90,27,17),(108,37,4),(109,42,4),(125,24,5),(126,32,5),(127,42,5),(140,50,5),(142,23,5),(152,16,3),(157,40,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (2,'멋있는 척 지리는거 아닙니까?',NULL,'2022-08-17 13:57:37.046173',36,10),(3,'쏘 큐트!',NULL,'2022-08-17 13:57:56.565758',34,10),(4,'바글바글 와글와글ㅋㅋㅋㅋㅋㅋㅋㅋ',NULL,'2022-08-17 14:11:45.162759',37,10),(5,'너무 멋져요~~',NULL,'2022-08-17 14:19:35.233373',37,8),(6,'사람은 3명이지만 마음은 6명',NULL,'2022-08-17 14:23:10.799614',39,16),(7,'싸피가 좋아~~',NULL,'2022-08-17 14:28:14.262036',16,14),(8,'히야아',NULL,'2022-08-17 14:29:06.929230',39,15),(9,'다들 어디갔오..ㅠ',NULL,'2022-08-17 14:29:49.871956',39,14),(10,'너 납치된거야..',NULL,'2022-08-17 15:10:37.768059',36,4),(11,'유석구.. 그는 대체..',NULL,'2022-08-17 15:10:42.009126',36,8),(12,'씸플로고 좋아요!',NULL,'2022-08-17 15:12:01.269355',27,17),(15,'쏘큐트!',NULL,'2022-08-17 16:23:26.540563',34,4),(19,'A101 팀 화이팅!',NULL,'2022-08-17 17:22:56.111469',50,5),(20,'hello',NULL,'2022-08-17 17:23:48.354859',50,2),(21,'A101팀 최고야~!~!~! 수고했어',NULL,'2022-08-17 17:40:55.352861',56,5),(22,'하트 예뻐요!',NULL,'2022-08-17 17:40:59.458914',23,8),(23,'꺄악 하트가 너무 이뻐요',NULL,'2022-08-17 17:41:00.391087',56,4),(24,'와! 너무 멋진 하트에요!',NULL,'2022-08-17 17:41:00.393375',56,3),(27,'퀄리티 넘 좋아여~~',NULL,'2022-08-17 19:33:08.245245',37,11),(28,'콩순이 뺨치는 깜찍함',NULL,'2022-08-17 20:41:55.570881',46,5),(29,'넘 귀여워요..🫶🏻',NULL,'2022-08-17 20:50:05.394736',39,5),(30,'완전 대박대박!! 우리 컨설턴트님 최고십니당! ㅎㅎ',NULL,'2022-08-18 09:30:26.307863',40,9),(31,'인스타 올렸어?? 인스타 각이다 완전 잘 나왔따 ㅋㅋㅋ',NULL,'2022-08-18 09:31:02.665226',36,9),(32,'A101 화이팅',NULL,'2022-08-18 11:18:41.577973',42,20),(33,'상큼상큼 여름 더위야 물러가라~',NULL,'2022-08-18 13:46:07.024243',30,9),(34,'역시 싸피가 최고~!!',NULL,'2022-08-18 13:53:14.880039',16,34),(35,'공통 1반 A101 FOREVER!',NULL,'2022-08-18 14:20:03.811575',42,34),(38,'우와악ㅎㅎ',NULL,'2022-08-18 14:43:34.768500',50,5),(39,'내가 만든 프레임!',NULL,'2022-08-18 14:44:16.175219',59,5),(42,'싸피 정말 최고!!',NULL,'2022-08-18 15:17:13.419640',16,3),(43,'컨설턴트님 너무 멋져요!',NULL,'2022-08-18 15:20:41.577426',40,3),(45,'다들 귀여워 ㅋㅋㅋ',NULL,'2022-08-18 17:49:22.613400',30,34),(46,'내가 젤 귀여움 ㅋ',NULL,'2022-08-18 17:49:42.327357',30,9);
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (1,6,5),(2,8,14),(3,8,5),(5,5,4),(6,5,17),(8,4,5),(10,10,5),(11,5,8),(21,20,4),(22,9,17),(25,20,17),(28,5,1),(30,5,10),(34,3,17),(36,9,5),(37,9,34);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frame`
--

LOCK TABLES `frame` WRITE;
/*!40000 ALTER TABLE `frame` DISABLE KEYS */;
INSERT INTO `frame` VALUES (1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/53fe0728-a2de-47e8-ab9b-64b0776b0ba2_1660702528563.png'),(2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/a2036200-b1c6-4f55-b4dd-a7a2d6d72af6_1660775385768.png'),(3,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/7087de43-8e24-47d1-bb44-69413c0fb04a_1660702585147.png'),(4,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/3aa45150-7b34-48cc-bdc4-078ba9b8802f_1660702600126.png'),(5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/d5071278-7954-485c-9619-fa913725aa9e_1660702620364.png'),(6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/f889c143-18dc-46de-853e-9b9e32af5b6d_1660702631728.png'),(7,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/fde37ac5-a839-453a-adb3-ecd17aa5cda0_1660702653243.png'),(8,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/8ed71cd4-6a43-4939-8935-f81ca79b8f4b_1660702667313.png'),(9,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/fee7ebcd-83e0-4e24-906d-7b4c759ec308_1660702974810.png'),(10,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/21b14abb-6584-48f3-971e-252e02aee27a_1660703073121.png'),(11,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/aef9115c-e2db-46f7-83d8-5ac2d275d35a_1660703097887.png'),(12,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/ee6a59d7-636e-4bae-a0a2-d1171a68817c_1660703127303.png'),(13,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/a5bf9216-968f-4932-8e83-e1448eb6be5b_1660703148729.png'),(14,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/1addbe09-605c-40e6-9ce8-bce52a455460_1660703171645.png'),(15,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/7fe57990-0efe-4376-9a37-d02281c932de_1660703192404.png'),(16,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/b4be158c-a6fb-46dd-8cf2-16e30b28ee4e_1660705733342.png'),(17,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/56037798-4231-498e-bbf6-e8c0a80e790b_1660705771347.png'),(18,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/b6c66759-9037-47b6-853a-0624390d5cc3_1660705830966.png'),(19,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/c7c49263-38f5-4ec0-a4c0-62135a3d6a97_1660705936491.png'),(22,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/e6350bc5-4fb7-40a9-bd3c-a5aa72885852_1660709184904.png'),(31,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/d507cc21-1495-4289-8772-645174f88128_1660747975491.png'),(37,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/fc401c17-8401-4eda-af9d-7cc7768f1210_1660801598704.png'),(39,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/af1fbba5-bbca-4b8b-93e1-0c1f3c7041ef_1660801685363.png');
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
INSERT INTO `hibernate_sequence` VALUES (164);
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
  `message` varchar(100) DEFAULT '일주일 전에 찍은 PhoRest를 확인해보세요!',
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
INSERT INTO `my_page` VALUES (1,'frame',_binary '',1,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(3,'frame',_binary '',3,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(4,'frame',_binary '',4,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(5,'frame',_binary '',5,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(6,'frame',_binary '',6,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(7,'frame',_binary '',7,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(8,'frame',_binary '',8,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(9,'frame',_binary '',9,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(10,'frame',_binary '',10,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(11,'frame',_binary '',11,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(12,'frame',_binary '',12,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(13,'frame',_binary '',13,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(14,'frame',_binary '',14,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(15,'frame',_binary '',15,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(16,'frame',_binary '',16,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(17,'frame',_binary '',17,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(18,'frame',_binary '',18,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(19,'frame',_binary '',19,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(22,'photogroup',_binary '',21,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(23,'photogroup',_binary '',21,4,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(24,'photogroup',_binary '',23,5,'하트 만들기 장인이었지!!'),(25,'photogroup',_binary '',24,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(26,'photogroup',_binary '\0',24,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(27,'photogroup',_binary '',25,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(28,'photogroup',_binary '',25,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(29,'photogroup',_binary '',26,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(30,'frame',_binary '',27,1,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(33,'photogroup',_binary '',28,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(41,'photogroup',_binary '',29,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(42,'photogroup',_binary '',30,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(43,'photogroup',_binary '',32,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(44,'photogroup',_binary '',31,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(45,'photogroup',_binary '',30,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(46,'photogroup',_binary '',29,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(47,'photogroup',_binary '',25,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(48,'photogroup',_binary '',28,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(49,'photogroup',_binary '',24,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(50,'photogroup',_binary '',26,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(51,'photogroup',_binary '',26,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(52,'photogroup',_binary '',28,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(53,'photogroup',_binary '',29,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(54,'photogroup',_binary '',30,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(55,'photogroup',_binary '',31,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(56,'photogroup',_binary '',32,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(57,'photogroup',_binary '',34,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(58,'photogroup',_binary '',32,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(59,'photogroup',_binary '',31,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(60,'photogroup',_binary '',35,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(61,'photogroup',_binary '',30,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(62,'photogroup',_binary '',29,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(63,'photogroup',_binary '',35,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(64,'photogroup',_binary '',25,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(66,'photogroup',_binary '',28,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(67,'photogroup',_binary '',26,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(68,'photogroup',_binary '',36,4,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(69,'photogroup',_binary '',26,4,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(70,'photogroup',_binary '',24,4,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(71,'photogroup',_binary '',28,4,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(72,'photogroup',_binary '',25,4,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(73,'photogroup',_binary '',37,10,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(74,'photogroup',_binary '',37,11,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(76,'photogroup',_binary '',39,14,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(78,'photogroup',_binary '',39,15,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(79,'photogroup',_binary '',39,16,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(80,'photogroup',_binary '',40,17,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(81,'photogroup',_binary '',42,3,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(82,'photogroup',_binary '',42,9,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(83,'photogroup',_binary '',42,17,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(84,'photogroup',_binary '',43,19,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(85,'photogroup',_binary '',43,18,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(92,'photogroup',_binary '',42,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(94,'photogroup',_binary '',44,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(97,'frame',_binary '',1,2,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(105,'photogroup',_binary '',42,10,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(106,'photogroup',_binary '',46,4,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(107,'photogroup',_binary '',41,10,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(117,'photogroup',_binary '',50,8,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(123,'frame',_binary '',59,5,'이틀 전에 찍은 PhoRest를 확인해보세요!'),(133,'frame',_binary '',63,1,'일주일 전에 찍은 PhoRest를 확인해보세요!'),(135,'photogroup',_binary '',42,20,'testtest'),(136,'photogroup',_binary '',50,30,'hi'),(137,'photogroup',_binary '',50,35,'hi'),(138,'photogroup',_binary '',25,34,'일주일 전에 찍은 PhoRest를 확인해보세요!'),(139,'photogroup',_binary '',42,34,'일주일 전에 찍은 PhoRest를 확인해보세요!'),(143,'frame',_binary '',66,5,'일주일 전에 찍은 PhoRest를 확인해보세요!'),(145,'frame',_binary '',68,5,'일주일 전에 찍은 PhoRest를 확인해보세요!'),(146,'photogroup',_binary '',50,5,'일주일 전에 찍은 PhoRest를 확인해보세요!'),(147,'photogroup',_binary '',42,5,'일주일 전에 찍은 PhoRest를 확인해보세요!'),(158,'photogroup',_binary '',50,20,'일주일 전에 찍은 PhoRest를 확인해보세요!'),(162,'photogroup',_binary '',50,40,'일주일 전에 찍은 PhoRest를 확인해보세요!');
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
  `ar_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`photogroup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_group`
--

LOCK TABLES `photo_group` WRITE;
/*!40000 ALTER TABLE `photo_group` DISABLE KEYS */;
INSERT INTO `photo_group` VALUES (1,12,2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/ea062231-462f-4bd8-8a6a-ad8bedf18e8d_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/484afd1b-e375-44e2-8db5-15462bbb8dbb_mergedVideo.mp4','\"https://studio.onirix.com/projects/8822326c52a54df69be57cf849e7ee99/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTExLCJyb2xlIjozLCJpYXQiOjE2NjA3Mzk3NTh9.05C6Dolc9vnGREz6h-vh-O1NkTkMr7KDkKIUwHZKur4\"'),(2,11,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/8ae6aefa-21e3-41b0-857c-d244434075f9_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/4b842201-3225-4d7a-a2a0-c22ac5fcb97f_mergedVideo.mp4','\"https://studio.onirix.com/projects/6e59f60b736840b892e90d5c7c1d71aa/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTEyLCJyb2xlIjozLCJpYXQiOjE2NjA3Mzk5MjR9.rXZvJntA2pwFjF2jJeIH9OiL39ZnDWZvlwFnW9jYoiY\"'),(3,9,5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/a45b736c-d23d-43b3-8c09-7a67258befa5_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/a327e098-5d06-4919-b6ce-c254f7b5a479_mergedVideo.mp4','\"https://studio.onirix.com/projects/6629ddda1f9f49aab13a6003bd09815a/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTEzLCJyb2xlIjozLCJpYXQiOjE2NjA3Mzk5OTh9.YZB38vUgTDB6fsQcqo-74MBSBU0WZepzC-IrbhhK1FM\"'),(4,21,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/b734c072-8c9e-4e09-bae9-4d646de3596d_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/24e5b4e9-b598-414d-b44a-66da94547c0b_mergedVideo.mp4','\"https://studio.onirix.com/projects/dc9ef482eb3d480fb03244ad0b17aca7/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTE2LCJyb2xlIjozLCJpYXQiOjE2NjA3NDQ4NTd9.MYMv6aYWkeo0AwRhof_Eqydn2Hahuu3pAGC-6sl5DOU\"'),(5,6,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/4b72b708-729e-4af5-b63a-f208c573681b_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/09dbff72-ac65-48c3-9f84-847ef52c5a72_mergedVideo.mp4','\"https://studio.onirix.com/projects/0e7914c4ea1e489f8318b0da14d76db6/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTE3LCJyb2xlIjozLCJpYXQiOjE2NjA3NDQ5Njh9.nJg0NRoz9Y2F2ntR6xGZKDh8-c7jsHJWEojsIi4hIFM\"'),(6,18,5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/1679d5fb-c195-4256-af9b-9ece4bc05414_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/0365ccb1-c683-4937-9a14-cb3ac8eb976f_mergedVideo.mp4','\"https://studio.onirix.com/projects/fb71e1de041b467882a8d0d58133f75c/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTE4LCJyb2xlIjozLCJpYXQiOjE2NjA3NDUwNTd9.3JlCcm1bWmcidr8GV25Uyds8MM33jjTNvKUzEDyvh4Y\"'),(7,5,4,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/d13d8f68-2b4e-48e9-b64c-932d10979433_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/c1c6d6e4-61d9-4b95-9ae3-f76871ca9c88_mergedVideo.mp4','\"https://studio.onirix.com/projects/ea9c4e73465943fa8763cdec147a0820/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTE5LCJyb2xlIjozLCJpYXQiOjE2NjA3NDUxNTl9.PG_WkjF_PQbrzzzQOHgx0Axuzth9v8_lHmgP-qFHD-o\"'),(8,15,4,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/f3210769-91e2-480f-823b-09ca1d212a76_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/d22cdb8b-cce1-49c9-8ee2-e5e5c2420ede_mergedVideo.mp4','\"https://studio.onirix.com/projects/01da3e18472e42b68cd3cb4e7ec312da/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTIwLCJyb2xlIjozLCJpYXQiOjE2NjA3NDUyODV9.YbEJ1jMItpZQOVNppzh-yBthKKQoLjowgHAU9g0ZWuI\"'),(9,14,3,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/00d16597-ae0d-45e9-a34d-30bcefa4cf89_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/f21f01c6-3dce-472c-9139-8b0d393bf24b_mergedVideo.mp4','\"https://studio.onirix.com/projects/018f342a65d940e6bc7f43d14c643218/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTIxLCJyb2xlIjozLCJpYXQiOjE2NjA3NDUzNzh9.-Fe_YVtof7SXbAYHHWQXKYcYASwhG1MRdNvERZnvzf0\"'),(10,11,3,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/096530c7-3ba8-4e52-a03f-2a9d49aa0c9a_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/1e2fe0fc-dbb0-44c9-8373-be0a3208b34d_mergedVideo.mp4','\"https://studio.onirix.com/projects/55b7673707d547de8519188fc6bd4248/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTIyLCJyb2xlIjozLCJpYXQiOjE2NjA3NDU0NjV9.Jm_TsGadKgNZNseYXniRQPGfpMqsRq6sByF9ArYuhI4\"'),(12,19,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/b56837a3-0240-4d4c-83e1-b18c0b802042_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/28b9d77b-0b20-4c8c-8e5d-f55638bdd771_mergedVideo.mp4','\"https://studio.onirix.com/projects/e2d0dac95b35418caaf5be2d5785a2f3/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTIzLCJyb2xlIjozLCJpYXQiOjE2NjA3NDYyMDV9.6NowenJZDb5MEcrqKEYKJ-gCS3uXklfihJ0Vb7tJfsw\"'),(13,13,2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/422c4728-2de3-4379-be52-871077c93df1_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/9d32966a-5098-42fc-a881-c05cd6f0a479_mergedVideo.mp4','\"https://studio.onirix.com/projects/f57043e51fa04b159a2bf8a92fe29438/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTI0LCJyb2xlIjozLCJpYXQiOjE2NjA3NDYyODV9.dPimtdN-wpXwEvGyy2BqhlkQm2ry_IcTwJHaZsJWhIY\"'),(14,4,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/e502798c-044d-4373-ba5c-50f0bc127935_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/48f4f186-26fc-459c-901d-e33765f83820_mergedVideo.mp4','\"https://studio.onirix.com/projects/ce498022ce2e4683ba34e955de6a0480/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTI1LCJyb2xlIjozLCJpYXQiOjE2NjA3NDYzNjF9.L99u9iNHwsV5MigCXuDUVv8Wf2_Y6dBa6cbds3amCAY\"'),(15,22,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/b9beeab7-dec1-4d6e-8f69-5c6dde3441e7_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/51431823-613b-43ec-90c6-24d876fab47a_mergedVideo.mp4','\"https://studio.onirix.com/projects/2d2497e4890a4c80a2f4b88c8b753a22/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTI3LCJyb2xlIjozLCJpYXQiOjE2NjA3NDc0OTR9.T9BUIXk4_3OVLVuVOkC5w3yMjDX20od8SdmMIrhqwmo\"'),(16,22,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/4d84ce5d-74af-4e1d-a12e-95fea36de377_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/b9353a34-75e5-4a77-a7ad-16d2e396c70b_mergedVideo.mp4','\"https://studio.onirix.com/projects/2d2497e4890a4c80a2f4b88c8b753a22/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTI3LCJyb2xlIjozLCJpYXQiOjE2NjA3NDc0OTR9.T9BUIXk4_3OVLVuVOkC5w3yMjDX20od8SdmMIrhqwmo\"'),(17,16,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/c7c2c4cf-012e-43d1-8b84-2f9b5430564d_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/29fed2b9-9b27-4615-8897-fbaf83317776_mergedVideo.mp4','\"https://studio.onirix.com/projects/5ec218436361467f99679675f14802a6/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTI4LCJyb2xlIjozLCJpYXQiOjE2NjA3NDc2Mjl9.6Ke8zjlR52DZMHH6F5kBRpNxT_olP_2cxtRgzU4b0gw\"'),(18,5,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/fdf53361-9110-4733-9be9-5102ecca3933_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/44f92a65-aa12-487c-b32d-321d7cb14a42_mergedVideo.mp4','\"https://studio.onirix.com/projects/86503c5164c242898a9dcd3207f7404e/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTI5LCJyb2xlIjozLCJpYXQiOjE2NjA3NDc3MjZ9.h5HWmLXJ2DypRgzsbJ7a6RdGOwBZ05O2MUd4m9iO37M\"'),(19,18,2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/03299dc8-044d-4f92-91c6-40d1b6c75ed0_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/34e62e5a-276d-467a-a9db-0c9d672bc3f0_mergedVideo.mp4','\"https://studio.onirix.com/projects/9dd82b860c624c5f96f4e11a21811b2f/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTMwLCJyb2xlIjozLCJpYXQiOjE2NjA3NDc3OTN9.uB87W-Ad4zFD3RwCsW_Ty82gyNKxmgE9MizFkg5zpu0\"'),(20,11,6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/e95fbe87-36a8-4f0b-be73-081ed16d69ba_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/b95d9d45-7742-4b84-a242-efd01e8b57f4_mergedVideo.mp4','\"https://studio.onirix.com/projects/16749cf61bc74f4aab8bb819fe6c3d77/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTMxLCJyb2xlIjozLCJpYXQiOjE2NjA3NDc4NzN9.K_fY0ocHDbdqOALciX0zu_d1YqbwHlu_nvSAmGnlmy0\"'),(21,2,5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/3241789f-82ab-4a03-be8e-38d859351c06_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/3c88232f-f460-40ba-9bef-2631a018da7a_mergedVideo.mp4','\"https://studio.onirix.com/projects/49a5bd4cf6ec4d248af9be9aba406ce7/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTMyLCJyb2xlIjozLCJpYXQiOjE2NjA3NDc5ODJ9.zzxBGbwKZJAUdISW5J9ewIHL9Uv5AGcpvV7bQz7NHmQ\"'),(22,18,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/dcd79f56-4e19-491d-8324-90981bb70004_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/b6b36893-c7e6-4ee2-b015-8201d646bc31_mergedVideo.mp4','\"https://studio.onirix.com/projects/172efea63f32403cb355781e03fa9a7f/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTMzLCJyb2xlIjozLCJpYXQiOjE2NjA3NDgwNDN9.dh3gLBawvGkXiOrHNdD1ReYJyfsJxWNcA1ej2s2U96M\"'),(23,5,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/a762276d-0285-440d-803a-ee569bbaea82_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/ef3977ff-8bf7-41f2-b962-10cbb940a194_mergedVideo.mp4','\"https://studio.onirix.com/projects/732c73d7352e497cbe0df87c2ba5812b/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTM1LCJyb2xlIjozLCJpYXQiOjE2NjA3NDgxMTN9.UhoRNSv9R2zkUXGehwOOvFeeOld1te46DNGyISz5Hb0\"'),(24,15,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/7863a05d-301e-4e0a-8255-703898657d7c_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/4d82f883-e2f9-41f6-8efb-6e2f2db1035d_mergedVideo.mp4','\"https://studio.onirix.com/projects/731e61ee0d7a4cfba1c325cbbca450b2/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTM2LCJyb2xlIjozLCJpYXQiOjE2NjA3NDgxODh9.t78aPsHn-dl-tkKxG4tq9g7N8vJek0xA7vUfojARb0c\"'),(25,15,5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/6cd8b4b4-f669-4e9f-af70-d79bb32d0350_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/b0b0886f-6648-412c-8e76-fd687e2f2a9e_mergedVideo.mp4','\"https://studio.onirix.com/projects/3850f231d8fb406383fb83e03f67d5b9/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTM3LCJyb2xlIjozLCJpYXQiOjE2NjA3NDgyNjZ9.Yh0yK28QInAwKA4gGAoL432G7s1eA8iaMUyzeSVwwQk\"'),(26,18,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/efe30152-cf2f-46d8-a339-7971f722804f_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/be93b707-9749-4078-8d3c-553e704fab50_mergedVideo.mp4','\"https://studio.onirix.com/projects/3b63931d08e742c9b1d806707c187d41/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTM4LCJyb2xlIjozLCJpYXQiOjE2NjA3NDgzMjV9.KEE6I2oRmai1d1EcLKuiv_JxzpFrosxVvnMN349l_6Q\"'),(27,13,1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/dd6ef4b0-cc39-4269-8be6-58c1dcabcb8c_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/c6fc13a6-3c50-489f-ab95-591f17116fa0_mergedVideo.mp4','\"https://studio.onirix.com/projects/c19fdc848b704b62bcf90b547f318234/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTM5LCJyb2xlIjozLCJpYXQiOjE2NjA3NDg0MTN9.IkCut0sm92uYFMIwJSV8fh9F6FaTqzUdAKVekSCmzBA\"'),(28,16,2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/894a6a48-50ef-4f59-9b8a-40033dda1cb5_FramePlusImg.png','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/video/df4c4ce9-da59-45c0-a44e-e794c484dd13_mergedVideo.mp4','\"https://studio.onirix.com/projects/4486bca30e14403da7197b41494ade44/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzkwLCJwcm9qZWN0SWQiOjMwOTQyLCJyb2xlIjozLCJpYXQiOjE2NjA3NDg0OTB9.wLD-k3T6LFZLccjIhdq_tZ_WzSlGnJcGVOxe5esJPoo\"');
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
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'frame','기본프레임 1번입니다.',_binary '',0,'2022-08-17 11:15:29.769919',1,NULL),(3,'frame','기본프레임 3번입니다.',_binary '',0,'2022-08-17 11:16:26.293284',3,NULL),(4,'frame','기본프레임 4번입니다.',_binary '',0,'2022-08-17 11:16:41.272636',4,NULL),(5,'frame','기본프레임 5번입니다.',_binary '',0,'2022-08-17 11:17:01.577421',5,NULL),(6,'frame','기본프레임 6번입니다.',_binary '',0,'2022-08-17 11:17:12.878271',6,NULL),(7,'frame','기본프레임 7번입니다.',_binary '',0,'2022-08-17 11:17:34.400595',7,NULL),(8,'frame','기본프레임 8번입니다.',_binary '',0,'2022-08-17 11:17:48.479542',8,NULL),(9,'frame','벚꽃 프레임입니다. 꽃잎이 살랑살랑~',_binary '',0,'2022-08-17 11:22:56.111440',9,NULL),(10,'frame','나뭇잎 프레임입니다. 나뭇잎이 푸릇푸릇!',_binary '',0,'2022-08-17 11:24:34.461234',10,NULL),(11,'frame','고양이 프레임입니다냥!',_binary '',0,'2022-08-17 11:24:59.008881',11,NULL),(12,'frame','고래 프레임입니다. 철썩철썩',_binary '',2,'2022-08-17 11:25:28.506329',12,NULL),(13,'frame','마카롱 프레임입니다. 달콤한 하루되세요!',_binary '',0,'2022-08-17 11:25:49.981545',13,NULL),(14,'frame','체크무늬 프레임입니다. 체크는 클래식이죠^^',_binary '',0,'2022-08-17 11:26:12.853285',14,NULL),(15,'frame','수박 프레임입니다. 수박 먹고 시원한 여름 나세요~',_binary '',0,'2022-08-17 11:26:33.698061',15,NULL),(16,'frame','싸피 로고 프레임입니다. 싸피에 진심인 사람 모여!!!',_binary '',4,'2022-08-17 12:08:53.811527',16,NULL),(17,'frame','싸피 색연필 프레임입니다. 옹기종기 귀여운 우리 싸피 친구들~ 여기 모여라~',_binary '',0,'2022-08-17 12:09:31.816100',17,NULL),(18,'frame','사탕 껍질 재질 프레임입니다. 문구점 불량식품 맛 기억하시는 분?',_binary '',2,'2022-08-17 12:10:31.466570',18,NULL),(19,'frame','감성 프레임입니다. 수채화 물감 한방울!',_binary '',0,'2022-08-17 12:12:18.151571',19,NULL),(21,'photogroup','none',_binary '',2,'2022-08-17 12:14:08.509407',NULL,1),(23,'photogroup','none',_binary '',6,'2022-08-17 12:41:03.141685',NULL,2),(24,'photogroup','none',_binary '',2,'2022-08-17 12:48:43.736117',NULL,3),(25,'photogroup','none',_binary '',2,'2022-08-17 12:56:35.665110',NULL,4),(26,'photogroup','none',_binary '',2,'2022-08-17 13:03:37.161886',NULL,5),(27,'frame','SSAFY simple logo 입니다~',_binary '',1,'2022-08-17 13:05:44.314280',22,NULL),(28,'photogroup','none',_binary '',1,'2022-08-17 13:08:22.471880',NULL,6),(29,'photogroup','none',_binary '',0,'2022-08-17 13:12:33.744242',NULL,7),(30,'photogroup','none',_binary '',1,'2022-08-17 13:16:44.996640',NULL,8),(31,'photogroup','none',_binary '',1,'2022-08-17 13:19:51.010461',NULL,9),(32,'photogroup','none',_binary '',3,'2022-08-17 13:24:03.980371',NULL,10),(34,'photogroup','none',_binary '',2,'2022-08-17 13:41:30.125262',NULL,12),(35,'photogroup','none',_binary '',2,'2022-08-17 13:44:05.408187',NULL,13),(36,'photogroup','none',_binary '',7,'2022-08-17 13:46:42.706807',NULL,14),(37,'photogroup','none',_binary '',9,'2022-08-17 14:03:33.756846',NULL,15),(38,'photogroup','none',_binary '\0',0,'2022-08-17 14:12:15.601542',NULL,16),(39,'photogroup','none',_binary '',6,'2022-08-17 14:16:29.909639',NULL,17),(40,'photogroup','none',_binary '',5,'2022-08-17 14:51:10.971437',NULL,18),(41,'photogroup','none',_binary '',1,'2022-08-17 14:55:21.921966',NULL,19),(42,'photogroup','none',_binary '',5,'2022-08-17 15:01:05.504986',NULL,20),(43,'photogroup','none',_binary '',1,'2022-08-17 15:04:17.862573',NULL,21),(44,'photogroup','none',_binary '',1,'2022-08-17 15:23:45.412429',NULL,22),(45,'photogroup','none',_binary '\0',0,'2022-08-17 16:05:27.908413',NULL,23),(46,'photogroup','none',_binary '',0,'2022-08-17 16:10:56.122271',NULL,24),(49,'photogroup','none',_binary '\0',0,'2022-08-17 16:45:39.599288',NULL,25),(50,'photogroup','none',_binary '',1,'2022-08-17 17:21:13.847409',NULL,26),(56,'photogroup','none',_binary '\0',0,'2022-08-17 17:40:00.536757',NULL,27),(58,'photogroup','none',_binary '\0',0,'2022-08-17 17:58:27.815537',NULL,28),(59,'frame','싸피인에게 휴가란 없다..',_binary '',1,'2022-08-17 23:52:57.509234',31,NULL),(63,'frame','기본 프레임 2번입니다.',_binary '',0,'2022-08-17 11:15:50.144529',2,NULL),(66,'frame','첨벙첨벙하고파',_binary '',0,'2022-08-18 14:46:45.840162',37,NULL),(68,'frame','',_binary '',0,'2022-08-18 14:48:17.893525',39,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postlike`
--

LOCK TABLES `postlike` WRITE;
/*!40000 ALTER TABLE `postlike` DISABLE KEYS */;
INSERT INTO `postlike` VALUES (1,23,6),(2,24,6),(3,25,6),(4,23,5),(5,32,8),(6,23,10),(7,36,10),(8,34,10),(9,25,3),(10,26,3),(11,23,3),(12,36,3),(13,34,3),(14,35,3),(15,21,3),(16,32,3),(17,31,3),(18,37,10),(20,37,5),(21,37,8),(22,37,3),(23,16,14),(24,39,16),(26,39,15),(27,39,14),(28,37,9),(29,36,4),(30,36,8),(31,40,8),(45,23,17),(46,16,17),(47,27,17),(48,23,4),(49,37,17),(50,44,5),(51,40,21),(52,43,21),(53,42,5),(58,37,4),(59,42,4),(61,21,4),(62,26,4),(63,24,4),(64,28,4),(65,35,4),(66,32,4),(67,30,4),(69,39,4),(71,37,11),(72,40,11),(73,41,10),(74,42,10),(75,39,5),(76,36,5),(77,40,9),(78,36,9),(79,42,20),(80,12,9),(81,18,9),(82,18,34),(83,12,34),(84,16,34),(85,50,5),(86,59,5),(90,16,3),(94,40,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,_binary '\0','PhoRest 공식 계정입니다.',_binary '\0','PhoRest','$2a$10$xc0sYHeyGL4QdbSyiDJMRuUI2MzMmzaadYLsxY/EA7S5DB.AT4.q.','01000000000','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/4e60b9cb-4c66-4a98-9e15-7a6bd287b513_logo.png',NULL,'USER','phorest'),(2,NULL,_binary '',NULL,_binary '\0','탈퇴한 회원','$2a$10$uDn/oj78SqwB/WvsN.yX8el.pOvYsTa3qQ1ccnyGhP6Z.hjpj2ucK','01000001111',NULL,NULL,'USER','unkn0wnuser'),(3,'YaV0qpDI9qVVG2z2ym5OVAScYkME_O9VdBKKpu9sCj1y6gAAAYKpzB1J',_binary '','phorest 백엔드 개발자',_binary '','naran','$2a$10$Ex.akwKana8wOo66pMMxW.ypkXdw6nMYwRH9hF/UTiZwxXo8r6X26',NULL,'http://k.kakaocdn.net/dn/bedMKS/btq80yBXRUQ/q3KoXqIZjDVuCjSYKLOqZ1/img_640x640.jpg','Y-0pKH90mnwGHpC754-U7Luftom8-zMwyMqG-NJ8Cj1y6gAAAYKpzB1I','USER','2378533762@k'),(4,'T2cH6daInULh35P5gVGr7jibxtR04fg53BJ1ZEKrCj1zTgAAAYKpzSaU',_binary '','저는 싸피의 유현우입니다',_binary '','유현우','$2a$10$fXCNXA9NLivZOWEdBiG9xOihBWGhLss2VDwye.x0.XofpMQXria8e',NULL,'http://k.kakaocdn.net/dn/bQwQ72/btrIptESA9k/ZfXki16hTLoQhnACPQh7I1/img_640x640.jpg','-H2Ln-Jrtx62j9sw9meylB8RcXrDLVIKU4InFF0dCj1zTgAAAYKpzSaS','USER','2382940731@k'),(5,'5fVZbtmEuaw5UB-f3H38D9VFewModuZov42gnV3vCisMpgAAAYKp5qRU',_binary '','PhoRest 팀장 & 백엔드 개발자 최희선입니다 XD',_binary '','최희선','$2a$10$LapvY6kV4omJr/78AsLFeOVM06FFNLDApdcBYYylnuFxeGK0OBTm2',NULL,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/b42748db-c2ff-4360-8ba6-360f50d2aa1e_chocolatmeil.jpg','3hhW2JSdiFFHPw1SAW8PtzPmBtii7pV2p8mPRsflCisMpgAAAYKp5qRT','USER','2376488902@k'),(6,'1AZO9SIbEp4tS0NL5ajI6RmsVjZv_s86zRExb6rRCj1z7AAAAYKp-0fP',_binary '',NULL,_binary '','양현모','$2a$10$.x0y3Wn7ePp/49Gmz12u8ugSU2rEKa7j/qgEazRLl2Xj3R1ja79gG',NULL,'http://k.kakaocdn.net/dn/19NR2/btrHrvEF4D2/bpqoYIAIUhHYwen2fyUoR0/img_640x640.jpg','tf4-l4H-7ZxG0mUuGjps1ufStZ0L2vgngrwLFJKyCj1z7AAAAYKp-0fO','USER','2392005465@k'),(8,'o-oGHM2qsf9y-KD695ZPMwoSGLRFZWPpTeOzc9bTCisM1AAAAYKqDsVE',_binary '','저는 사용자입니다',_binary '','히히히','$2a$10$Mlrot.rto/g7s8h4qvEFmuKE.t5n3Pv15mmT0BNZm2JkEEPjIFOWa',NULL,'http://k.kakaocdn.net/dn/j4AHI/btrIxBERtX1/22QkASKvtN7JY1UHoD4MMK/img_640x640.jpg','47MasO14e3_nhRDmsCbvqFJHspixrzI3urmNRd2nCisM1AAAAYKqDsVC','USER','2382940880@k'),(9,'Uzrr91UnDNVF_84vEnH5GDl0kzNiB-wAQ6zTqFIKCilv1QAAAYKqHTZ8',_binary '','안녕~ 나랑 같이 에버랜드 갈 사람~  ',_binary '','김보경','$2a$10$1yWgs2Px91ROsrpR1PfeV.Yi.XuB9mJNduR5pqm4P67XH4DcMSMwO',NULL,'http://k.kakaocdn.net/dn/cmkAgB/btrJARTbm3X/qdhxAhzIjjoS0q8SKT4md1/img_640x640.jpg','YLhGOLJANraYMMfaIhGNJlHsAE60D8i1CODK0WnpCilv1QAAAYKqHTZ6','USER','2378511088@k'),(10,NULL,_binary '','나는 라이언입니다.',_binary '\0','라이언','$2a$10$0HNBLOb.VKp26UvVC9/6c.KXaQxR0wyQODHnA4nyRHTuLLwN871mS','01012341222','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/62582505-4924-4845-b16d-bf2841a85b67_%EB%9D%BC%EC%9D%B4%EC%96%B8%EC%97%84%EC%A7%80.gif',NULL,'USER','test123'),(11,'GBwiRDVe9bt_Ez6W01HUR8-cH74kcxi09f_0f_XQCinJXwAAAYKqMdrA',_binary '',NULL,_binary '','천민우','$2a$10$k1iI7wIkY2ShMKyJcXXKEOfSpHqzhyIf7CfF5lxWSXzE4pxGodtX2',NULL,'http://k.kakaocdn.net/dn/dpyfiq/btrJBEz8onZ/9fPMCN6szV5Tm9nUtKX131/img_640x640.jpg','pAlD5MP5SCPsU61w97C_g-ljgyErNP9HTiMs1pFhCinJXwAAAYKqMdq_','USER','2392088995@k'),(12,NULL,_binary '',NULL,_binary '\0','호에엥','$2a$10$VJPWTAcW5fPWFKRYq.1f1OYbRozecR/vjYtDc9HegXt.9Q0dE3IRm','01011112222',NULL,NULL,'USER','tpq0310'),(13,'WV96c0TBNg50UlKnuz27KzW4vdN6MzXl230LbopBCj10EQAAAYKqMoXl',_binary '',NULL,_binary '','서요셉','$2a$10$0iXTHW4gx2xx0s9wghOcpOi4DrKEuaN8uKK45X70vbR1hfW2OkYPa',NULL,'http://k.kakaocdn.net/dn/UFlWR/btrE516WC2X/Ge9sVidrK09zwrUR9VALm0/img_640x640.jpg','waGvJUb2_Ug0WMSZ38h59y2qCXT0P2dq7GQ8AypuCj10EQAAAYKqMoXk','USER','2392090596@k'),(14,'ThjgH2eDivXSOSUT3aWpbUgggUitPUU_R_vWPHOfCilwngAAAYKqPcR-',_binary '',NULL,_binary '','안예림','$2a$10$o9roWB9txqmrlFR9z5jTk.ZQNlscYkqkXW3G6XhMZSqLfIJJ/lKxy',NULL,'http://k.kakaocdn.net/dn/bLCfir/btrI9luAtng/bOJ6xk4gb2hYbtKkhOzl20/m1.jpg','XdvpS3612Qcl_7T5KxZ9A4gG925EWte-SstmguyhCilwngAAAYKqPcR8','USER','2392112096@k'),(15,NULL,_binary '','',_binary '\0','Zishsj','$2a$10$jGlBQiDoQsZ1h29kghXJYu8Q17q6P9Amfjtyz0U05cnG43XARvMT6','01049403959','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/68667102-5a8e-46d1-8370-2c0ffc044ed7_BE71A329-5998-40B2-B188-9BCD4BD15133.jpeg',NULL,'USER','Zzingnee'),(16,NULL,_binary '',NULL,_binary '\0','나만ㅇ업ㄱ어','$2a$10$KIVkojJInYKw.Y37lEqM5Okl9uGAEyuBkexqun8uGqJZfjZDWc79m','01026280246',NULL,NULL,'USER','qwer1234'),(17,'gqf3u5svwr0Ud5sxeM_G1Tpvly1dP1FgXGMxIzYPCinJXwAAAYKqXPTV',_binary '',NULL,_binary '','이상현(Ryan)','$2a$10$rno13hh.6s/L2Pww64b5K.uNqcd7QgS.52soO1q2AOuHLy6gsBM/y',NULL,'http://k.kakaocdn.net/dn/hhu7E/btrJwuJYKUc/FYEOAFbDjNfROAhZ5PgVJ1/img_640x640.jpg','LP4VoCgBWrDwbHGKQHE2nJ3LUwQG8Y9pLE8P9yYRCinJXwAAAYKqXPTU','USER','2392164365@k'),(18,'jakwzYQcSzbikMFlr66lawN0bU7EiHeM9_7KHxltCj10mAAAAYKqaky5',_binary '',NULL,_binary '','석인','$2a$10$eoUwuv.R.a9ogoLLE9jNheIKy8/jayt3ZGVUsf79S.6kmjkWUcDNy',NULL,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','0FzFEPV-Or04iArqzyTQ7adi5pOkc0hrNT-tgB-hCj10mAAAAYKqaky4','USER','2392186189@k'),(19,'MET9H5m_5uHX_y-j-p4SCuu0eRoUJlaAcB92-dDpCj1zTgAAAYKqas3A',_binary '\0',NULL,_binary '','태경','$2a$10$sUc58FXc/u532gJ/ijeE7.GkUYYdkrYDJClyTKQe/3cdOMtrTSrJe',NULL,'http://k.kakaocdn.net/dn/b0ANSv/btrGg3wx2WH/NnX5eiByRa3bK7J79rfzAK/m1.jpg','q8R-AdskRJ1ERapNLsxTswpeJvq1-gdzxov-ZPLeCj1zTgAAAYKqas2_','USER','2392187004@k'),(20,NULL,_binary '\0','test',_binary '\0','MoCCo','$2a$10$sbxRkDVmlafx/ZpvVZl3deA/fT.0SxRW0SUPGVp8IU7/qI4sML28.','01056362345',NULL,NULL,'USER','kd8317'),(21,'CSvMnmzQlqT10Q3xsEJ5LaMVaeMfZ1Ln8WifEom3CisM0gAAAYKqftfb',_binary '',NULL,_binary '','박철민','$2a$10$eXzUh.AjKpe4fiuVmULEweAY3U0zI.Pf/7TK6Dj96k/KaaynNaFKC',NULL,'http://k.kakaocdn.net/dn/btt0r4/btroLDHZjMX/kzwADF4Py7qTRacjnafvlK/img_640x640.jpg','JJGdFAI3OB3b1Zh9CV2D3mEpoiY6yu8R81THjDViCisM0gAAAYKqftfa','USER','2392218543@k'),(30,NULL,_binary '\0',NULL,_binary '\0','쇼콜라','$2a$10$pbqJcyQkock90JDvPRc/ju20MMsCWsMKClCWhslglDgxnwBWKgY8u','01021810197',NULL,NULL,'USER','tester'),(31,'znlicKFG-6fxcdkxvw_j8NL6F-9N7Tqv39ZrR4tMCj1zFwAAAYKu-aEe',_binary '',NULL,_binary '','이현우','$2a$10$dtBBezt.YL9yQmFNFeaExeAem3NdV8aFAwWPoGeeRsF3R7cEtsbim',NULL,'http://k.kakaocdn.net/dn/Rhmv4/btroxpDIXUo/vTU3xkxBZOjm8fzEK0FqY1/img_640x640.jpg','8R5Q6IUAg2I84VgiVlrmJ5W4Dl2zyzpnLQ9W9Gs0Cj1zFwAAAYKu-aEb','USER','2393318738@k'),(32,'gz74C6IY2G3j81rllq7bqatj2zG15ivD0iu8mTIeCinJXwAAAYKvEBKV',_binary '',NULL,_binary '','김현열','$2a$10$qejN.gPoPcm3YZVLUpi2xeBjo4j3jHdOrUyakJfJxsxtLIv9v.0Qi',NULL,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','UIPV0hbZJAdG5zf6JjLuIiCMqyoLfBXnm-C5p8CgCinJXwAAAYKvEBKU','USER','2389476964@k'),(33,'eJpXB4qa8Q6y3iGDio0jYnK4EmAcdElg16JCg0IhCinI2gAAAYKvEREx',_binary '',NULL,_binary '','지용','$2a$10$7lSntZFQThBSp4KWORrO0.BZlIeGrxTAzrSTQUlJSbmgdM67FFjv2',NULL,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','GNLVi4xlHMjmF_xFUgyOBSSa2mhicpJhgV0aVCimCinI2gAAAYKvEREw','USER','2393350622@k'),(34,NULL,_binary '\0','',_binary '\0','우영우','$2a$10$uyXRmY7kAYsL/gfFkzEMnuRF2q315nb40ygyoIXYaaBQiZt2S8TM2','01055555555','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/926c39cf-8f8d-4ccb-b0e6-4224df20886f_99db9e627d42d1e1bba2c3ca6811ed267154249a3890514a43687a85e6b6cc82.png',NULL,'USER','wooyu5'),(35,NULL,_binary '\0',NULL,_binary '\0','naranana','$2a$10$8Q/Nd4isMOiDO8wIXFBui.gPiHOiIQf0PC.Zzg2wybnD0C7WMOKRS','01001010101',NULL,NULL,'USER','junsu321'),(38,NULL,_binary '\0',NULL,_binary '\0','testuser','$2a$10$acTUIj5MnCbq4q6ILSHKKOuDLfO3Q.yq1tdVx0dTUHrmBaxuv8QKu','01012344321',NULL,NULL,'USER','test1234'),(40,'HMfI_w-D7jQ54MTqsKYUvupaISoKg0AWXN76B3QQCinI2gAAAYKvnGKv',_binary '',NULL,_binary '','김도현','$2a$10$WJfy9LeZ7j9Tn3PjR8ymnuJ4if4/yzjNTnEUkkVKiSQxyiMQ/BS52',NULL,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','pwePTaK6zxo7_rnrn39PfCvIM5GFtMdeeXuZxViQCinI2gAAAYKvnGKu','USER','2378532693@k'),(41,NULL,_binary '',NULL,_binary '\0','test_student','$2a$10$hkZBvGESFheXNZP2aj8gouzyZd6/B.YK5/ZeGkTSXqqa00xJqA2KS','01011113333',NULL,NULL,'USER','teststudent'),(42,NULL,_binary '',NULL,_binary '\0','coach_student','$2a$10$azNTtlpyMsyKt791NmtyIe18giz2OxwleFRqXT0SMSTE0W6iq2ouy','01022222222',NULL,NULL,'USER','coachstudent');
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

-- Dump completed on 2022-08-18 19:48:13
