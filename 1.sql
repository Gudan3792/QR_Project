CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `price` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
);
 
 
INSERT INTO `menu` VALUES (1,'자장면',3000,NOW());
INSERT INTO `menu` VALUES (2,'깐풍기',4000,NOW());
INSERT INTO `menu` VALUES (3,'탕수육',5000,NOW());
INSERT INTO `menu` VALUES (4,'족발',6000,NOW());
INSERT INTO `menu` VALUES (5,'버블티',7000,NOW());
INSERT INTO `menu` VALUES (6,'ZICO',8000,NOW());
INSERT INTO `menu` VALUES (7,'짬뽕',7000,NOW());
INSERT INTO `menu` VALUES (8,'생맥주',3000,NOW());