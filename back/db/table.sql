-- MySQL dump 10.13  Distrib 9.6.0, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: notion2
-- ------------------------------------------------------
-- Server version	9.6.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '95f108ee-00c0-11f1-89b7-07b98e9b5f0b:1-189';

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `title` varchar(150) NOT NULL,
                            `due_date` varchar(100) DEFAULT NULL,
                            `description` text,
                            `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                            `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `due_date`, `description`, `created_at`, `updated_at`) VALUES (1,'Notion2 - MVP','2026-02-28','Basic projects + tasks CRUD','2026-02-12 20:21:22','2026-02-12 20:21:22');
INSERT INTO `projects` (`id`, `title`, `due_date`, `description`, `created_at`, `updated_at`) VALUES (2,'Fitness Plan','March 15','Weekly workout + diet tasks','2026-02-12 20:21:22','2026-02-12 20:21:22');
INSERT INTO `projects` (`id`, `title`, `due_date`, `description`, `created_at`, `updated_at`) VALUES (3,'Backend Learning','No deadline','Node/Express/MySQL practice roadmap','2026-02-12 20:21:22','2026-02-12 20:21:22');
INSERT INTO `projects` (`id`, `title`, `due_date`, `description`, `created_at`, `updated_at`) VALUES (4,'gym gnal','12.23.45','af','2026-02-12 22:47:36','2026-02-12 22:47:36');

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `project_id` int NOT NULL,
                         `title` varchar(200) NOT NULL,
                         `status` enum('pending','in_progress','complete') NOT NULL DEFAULT 'pending',
                         PRIMARY KEY (`id`),
                         KEY `idx_tasks_project_id` (`project_id`),
                         KEY `idx_tasks_status` (`status`),
                         CONSTRAINT `fk_tasks_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (4,2,'Buy groceries','pending');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (5,2,'Workout - Day 1','pending');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (6,2,'Track calories','in_progress');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (9,3,'Deploy to Render','pending');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (10,1,'change db','complete');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (11,3,'af','complete');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (12,1,'adf','in_progress');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (14,4,'asf','pending');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (15,1,'bhjnkml','pending');
INSERT INTO `tasks` (`id`, `project_id`, `title`, `status`) VALUES (16,1,'b nm,','complete');
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-24 20:25:45
