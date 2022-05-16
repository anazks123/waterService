-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2022 at 07:36 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `water`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `img` varchar(255) NOT NULL,
  `id` int(100) NOT NULL,
  `discription` varchar(25) NOT NULL,
  `likes` int(20) NOT NULL DEFAULT 0,
  `sellerID` int(170) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`img`, `id`, `discription`, `likes`, `sellerID`) VALUES
('seed2.jpg', 1, 'newSeed in our GreenFarm', 3, 3),
('shoping diagram.jpg', 3, 'new blog  updated', 3, 3),
('seed2.jpg', 4, 'new blog test', 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `Id` int(255) NOT NULL,
  `userMail` varchar(255) NOT NULL,
  `Product_id` int(255) NOT NULL,
  `qnty` int(50) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`Id`, `userMail`, `Product_id`, `qnty`) VALUES
(37, 'anazksunil46@gmail.com', 23, 1),
(38, 'anazksunil46@gmail.com', 24, 10),
(40, 'anazksunil2@gmail.com', 26, 5),
(41, 'anazksunil2@gmail.com', 30, 1),
(42, 'anazksunil2@gmail.com', 32, 1),
(43, 'anazksunil2@gmail.com', 27, 1),
(44, 'anazksunil2@gmail.com', 24, 2),
(45, 'anazksunil2@gmail.com', 31, 2);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `userMail` varchar(50) NOT NULL,
  `sellerMail` varchar(50) NOT NULL,
  `id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`userMail`, `sellerMail`, `id`) VALUES
('anazksunil2@gmail.com', 'anazksunil46@gmail.com', 1),
('anazksunil2@gmail.com', 'anazksunil46@gmail.com', 3),
('anazksunil2@gmail.com', 'anazksunil46@gmail.com', 4),
('anazksunil2@gmail.com', 'anazksunil46@gmail.com', 5);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `pid` int(20) NOT NULL,
  `usermail` varchar(50) NOT NULL,
  `set_Like` int(170) NOT NULL DEFAULT 1,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`pid`, `usermail`, `set_Like`, `id`) VALUES
(1, 'zana2@gmail.com', 1, 24),
(3, 'zana2@gmail.com', 1, 26),
(4, 'zana2@gmail.com', 1, 27),
(1, 'anazksunil46@gmail.com', 1, 28),
(3, 'anazksunil46@gmail.com', 1, 29),
(1, 'anazksunil2@gmail.com', 1, 30),
(3, 'anazksunil2@gmail.com', 1, 31),
(4, 'anazksunil2@gmail.com', 1, 32);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `img` varchar(100) NOT NULL,
  `id` int(11) NOT NULL,
  `mail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`img`, `id`, `mail`) VALUES
('greenfarm.jpg', 1, 'anazksunil46@gmail.com'),
('offer4.jpg', 2, 'anazksunil46@gmail.com'),
('offer3.jpg', 3, 'anazksunil46@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `Product_id` int(50) NOT NULL,
  `amount` int(50) NOT NULL,
  `status` varchar(250) NOT NULL DEFAULT 'Not updated by seller',
  `sellerid` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `email`, `Product_id`, `amount`, `status`, `sellerid`) VALUES
(10, 'anazksunil46@gmail.com', 24, 2500, 'Shipped', 3),
(11, 'anazksunil2@gmail.com', 25, 300, 'Not updated by seller', 3),
(12, 'anazksunil2@gmail.com', 26, 350, 'order placed', 3),
(13, 'anazksunil2@gmail.com', 26, 350, 'Not updated by seller', 3),
(14, 'anazksunil2@gmail.com', 25, 1500, 'Not updated by seller', 3),
(15, 'anazksunil2@gmail.com', 26, 1400, 'Not updated by seller', 3),
(16, 'anazksunil2@gmail.com', 26, 1400, 'Not updated by seller', 3),
(17, 'anazksunil2@gmail.com', 26, 1750, 'order placed', 3);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Product_name` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Price` int(50) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `id` int(255) NOT NULL,
  `sellerID` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Product_name`, `Description`, `Price`, `Image`, `id`, `sellerID`) VALUES
('Seed1', 'Good for helth.natural item', 250, 'seed1.jpg', 24, 3),
('Seed2', 'Good for helth.natural items', 300, 'seed3.jpg', 25, 3),
('Seed3', 'Good for helth.natural item', 350, 'seed3.jpg', 26, 3),
('Seed4', 'Good for helth.natural item', 357, 'seed2.jpg', 27, 3),
('Seed5', 'Good for helth.natural item', 250, 'seed3.jpg', 28, 3),
('Seed6', 'Good for helth.natural item', 334, 'seed2.jpg', 29, 3),
('Seed7', 'Good for helth.natural item', 250, 'seed1.jpg', 30, 3),
('Seed8', 'Good for helth.natural items', 250, 'seed3.jpg', 31, 3),
('Seed8', 'Good for helth.natural item', 500, 'seed1.jpg', 32, 3);

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `email` varchar(170) NOT NULL,
  `mobile` varchar(170) NOT NULL,
  `userName` varchar(170) NOT NULL,
  `place` varchar(170) NOT NULL,
  `id` int(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `cpassword` varchar(26) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`email`, `mobile`, `userName`, `place`, `id`, `password`, `cpassword`, `status`) VALUES
('anazksunil46@gmail.com', '8606414384', 'GreenFarm', 'kochi', 3, '123', '123', 'approved'),
('zana2@gmail.com', '8078330921', 'zanafarm', 'ekm', 4, '123', '123', 'approved'),
('', '', '', '', 5, '', '', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` int(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_name`, `email`, `mobile`, `pass`, `id`) VALUES
('anchu', 'anchu@gmail.com', 985321245, '111', 1),
('manu', 'manu@gmail.com', 8854367, '222', 5),
('cinu', 'cinu@gmail.com', 7854367, '333', 6),
('AnazKsunil', 'anazksunil2@gmail.com', 98957858, '999', 10),
('ann', 'ann@gmail.com', 977545477, '888', 12),
('anaz', 'anazksunil204@gmail.com', 977545477, '111', 13),
('anju', 'anju123@gmail.com', 2147483647, '999', 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
