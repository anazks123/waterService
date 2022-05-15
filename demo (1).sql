-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2022 at 11:51 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

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
(10, 'anazksunil46@gmail.com', 1, 2),
(11, 'anazksunil46@gmail.com', 3, 1),
(13, 'anazksunil46@gmail.com', 7, 1),
(15, 'anchu@gmail.com', 12, 5),
(18, 'anazksunil46@gmail.com', 15, 4),
(21, 'anchu@gmail.com', 15, 2),
(22, 'anchu@gmail.com', 23, 3),
(24, 'anchu@gmail.com', 22, 7),
(29, 'anazksunil46@gmail.com', 17, 1),
(32, 'anazksunil46@gmail.com', 18, 1),
(33, 'anazksunil46@gmail.com', 6, 2),
(34, 'anazksunil46@gmail.com', 23, 2),
(35, 'anazksunil46@gmail.com', 21, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `Product_id` int(50) NOT NULL,
  `amount` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `email`, `Product_id`, `amount`) VALUES
(3, 'anazksunil46@gmail.com', 15, 140000),
(4, 'anazksunil46@gmail.com', 18, 18000),
(5, 'anazksunil46@gmail.com', 17, 70000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Product_name` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Price` int(50) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Product_name`, `Description`, `Price`, `Image`, `id`) VALUES
('Laptop', 'A product by ACER', 80000, 'Acer-Swift-1_SF114-33_Gold_modelmain.png', 6),
('Laptop', 'A product by Lenovo', 60000, '157226-laptops-review-microsoft-surface-laptop-4-review-image1-shvxgffygd.jpg', 12),
('Watch', 'A product by Realme', 18000, 'watch_realme.png', 14),
('Watch', 'A product by apple', 70000, '2_a25aff7a-b5c4-4565-a111-6e1ce2d5b5f0.png', 15),
('Watch', 'A product by apple', 18000, 'watch_realme.png', 16),
('Laptop', 'A product by ACER', 70000, 'hp-spectre-x360-14-press-1.jpg', 17),
('Laptop', 'A product by hp', 18000, '157226-laptops-review-microsoft-surface-laptop-4-review-image1-shvxgffygd.jpg', 18),
('Watch', 'A product by apple', 30000, 'watch_realme.png', 19),
('Laptop', 'A product by Del', 70000, '157226-laptops-review-microsoft-surface-laptop-4-review-image1-shvxgffygd.jpg', 20),
('Watch', 'A product by apple', 35000, '61WixzlVuXL._UL1280_.jpg', 21),
('Laptop', 'A product by ACER', 80000, 'Acer-Swift-1_SF114-33_Gold_modelmain.png', 22),
('Watch', 'A product by Realme', 18000, 'watch_realme.png', 23);

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
('AnazKsunil', 'anazksunil46@gmail.com', 98957858, '999', 10),
('ann', 'ann@gmail.com', 977545477, '888', 12),
('anaz', 'anazksunil204@gmail.com', 977545477, '111', 13),
('anju', 'anju123@gmail.com', 2147483647, '999', 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`Id`);

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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
