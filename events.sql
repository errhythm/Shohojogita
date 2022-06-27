-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 04, 2022 at 09:04 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `events`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `idcomments` int(11) NOT NULL,
  `commentBody` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `events_idevents` int(11) NOT NULL,
  `users_idusers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`idcomments`, `commentBody`, `username`, `events_idevents`, `users_idusers`) VALUES
(24, 'Such a good cause. ', 'rhythm', 11, 4);

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `idDonations` int(11) NOT NULL,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `users_idusers` int(11) NOT NULL,
  `events_idevents` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`idDonations`, `username`, `message`, `amount`, `users_idusers`, `events_idevents`) VALUES
(11, 'Rhythm', 'Wish you all the best.', 1500, 4, 11);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `idevents` int(11) NOT NULL,
  `title` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `goal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`idevents`, `title`, `description`, `goal`) VALUES
(11, 'Help Build a Water Well in Bangladesh', 'Salaams everyone, I hope you are well keeping well. Inshallah my next project is to raise £600 to build a much needed water well in the poorest part of Bangladesh. Please donate what you can, and inshallah you will all be in our duas! ', 50000),
(12, 'Provide Meals for Orphans in Bangladesh', ' The funding provided would be used in order to give the children daily meals, clothing and resources to help support their journey in practicing Islam (i.e., will provide them with Qurans, prayer mats, etc.).', 40000);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `idreports` int(11) NOT NULL,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `complaints` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idusers` int(11) NOT NULL,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idusers`, `username`, `password`) VALUES
(2, 'arnob', '20101129'),
(3, 'admin', 'password'),
(4, 'rhythm', '20101298');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`idcomments`),
  ADD KEY `fk_comments_events_idx` (`events_idevents`),
  ADD KEY `fk_comments_users1_idx` (`users_idusers`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`idDonations`),
  ADD KEY `fk_Donations_users1_idx` (`users_idusers`),
  ADD KEY `fk_Donations_events1_idx` (`events_idevents`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`idevents`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`idreports`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idusers`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `idcomments` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `idDonations` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `idevents` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `idreports` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idusers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_events` FOREIGN KEY (`events_idevents`) REFERENCES `events` (`idevents`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comments_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`);

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `fk_Donations_events1` FOREIGN KEY (`events_idevents`) REFERENCES `events` (`idevents`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Donations_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
