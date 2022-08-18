-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: admin
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frame`
--

LOCK TABLES `frame` WRITE;
/*!40000 ALTER TABLE `frame` DISABLE KEYS */;
INSERT INTO `frame` VALUES (1,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/53fe0728-a2de-47e8-ab9b-64b0776b0ba2_1660702528563.png'),(2,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/ecb620d3-2341-4979-8e7c-30ceac5129bd_1660702553864.png'),(3,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/7087de43-8e24-47d1-bb44-69413c0fb04a_1660702585147.png'),(4,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/3aa45150-7b34-48cc-bdc4-078ba9b8802f_1660702600126.png'),(5,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/d5071278-7954-485c-9619-fa913725aa9e_1660702620364.png'),(6,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/f889c143-18dc-46de-853e-9b9e32af5b6d_1660702631728.png'),(7,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/fde37ac5-a839-453a-adb3-ecd17aa5cda0_1660702653243.png'),(8,'https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/frame/8ed71cd4-6a43-4939-8935-f81ca79b8f4b_1660702667313.png');
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
INSERT INTO `hibernate_sequence` VALUES (9);
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
INSERT INTO `my_page` VALUES (1,'frame',_binary '',1,1),(2,'frame',_binary '',2,1),(3,'frame',_binary '',3,1),(4,'frame',_binary '',4,1),(5,'frame',_binary '',5,1),(6,'frame',_binary '',6,1),(7,'frame',_binary '',7,1),(8,'frame',_binary '',8,1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_group`
--

LOCK TABLES `photo_group` WRITE;
/*!40000 ALTER TABLE `photo_group` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'frame','기본프레임 1번입니다.',_binary '',0,'2022-08-17 11:15:29.769919',1,NULL),(2,'frame','기본프레임 2번입니다.',_binary '',0,'2022-08-17 11:15:55.042319',2,NULL),(3,'frame','기본프레임 3번입니다.',_binary '',0,'2022-08-17 11:16:26.293284',3,NULL),(4,'frame','기본프레임 4번입니다.',_binary '',0,'2022-08-17 11:16:41.272636',4,NULL),(5,'frame','기본프레임 5번입니다.',_binary '',0,'2022-08-17 11:17:01.577421',5,NULL),(6,'frame','기본프레임 6번입니다.',_binary '',0,'2022-08-17 11:17:12.878271',6,NULL),(7,'frame','기본프레임 7번입니다.',_binary '',0,'2022-08-17 11:17:34.400595',7,NULL),(8,'frame','기본프레임 8번입니다.',_binary '',0,'2022-08-17 11:17:48.479542',8,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postlike`
--

LOCK TABLES `postlike` WRITE;
/*!40000 ALTER TABLE `postlike` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,_binary '','PhoRest 공식 계정입니다.',_binary '\0','PhoRest','$2a$10$xc0sYHeyGL4QdbSyiDJMRuUI2MzMmzaadYLsxY/EA7S5DB.AT4.q.','01000000000','https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/profileimage/4e60b9cb-4c66-4a98-9e15-7a6bd287b513_logo.png',NULL,'USER','phorest'),(2,NULL,_binary '',NULL,_binary '\0','탈퇴한 회원','$2a$10$uDn/oj78SqwB/WvsN.yX8el.pOvYsTa3qQ1ccnyGhP6Z.hjpj2ucK','01000001111',NULL,NULL,'USER','unkn0wnuser');
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

-- Dump completed on 2022-08-17 11:20:59
