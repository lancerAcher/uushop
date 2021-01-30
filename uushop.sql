/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80021
Source Host           : localhost:3306
Source Database       : uushop

Target Server Type    : MYSQL
Target Server Version : 80021
File Encoding         : 65001

Date: 2021-01-30 22:11:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT COMMENT '轮播图id',
  `title` varchar(50) NOT NULL COMMENT '轮播图标题',
  `img` varchar(255) NOT NULL COMMENT '轮播图图片地址',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='轮播图表';

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('9', '5', '', '1');
INSERT INTO `banner` VALUES ('10', '电视', '/uploads/banner/811ff330-61e2-11eb-9a7f-8d74850c54a7.webp', '1');
INSERT INTO `banner` VALUES ('11', '口罩', '/uploads/banner/b942ad70-61e2-11eb-9a7f-8d74850c54a7.webp', '1');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '购物车主键',
  `uid` varchar(50) NOT NULL COMMENT '用户id',
  `goodsid` int NOT NULL COMMENT '商品编号',
  `num` tinyint NOT NULL COMMENT '数量',
  `status` tinyint(1) NOT NULL COMMENT '选中状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uid` (`uid`,`goodsid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='购物车表';

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('2', 'bd0a1390-610f-11eb-bbf1-27af7282a3d9', '12', '1', '1');
INSERT INTO `cart` VALUES ('4', 'bd0a1390-610f-11eb-bbf1-27af7282a3d9', '7', '1', '1');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT COMMENT '分类编号',
  `pid` smallint unsigned NOT NULL COMMENT '上级分类编号',
  `catename` varchar(50) NOT NULL COMMENT '分类名称',
  `img` varchar(255) NOT NULL COMMENT '分类图片',
  `status` tinyint unsigned NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品分类表';

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('5', '0', '2356', '', '1');
INSERT INTO `category` VALUES ('6', '5', '2', '/uploads/category/af79f850-5a28-11eb-8a31-e3fac9c44c79.jpg', '1');
INSERT INTO `category` VALUES ('7', '5', '33', '/uploads/category/451d9e20-5a29-11eb-8a31-e3fac9c44c79.jpg', '1');
INSERT INTO `category` VALUES ('9', '5', '222', '/uploads/category/f6887f10-5a31-11eb-8a31-e3fac9c44c79.jpg', '1');
INSERT INTO `category` VALUES ('10', '5', '233', '', '1');
INSERT INTO `category` VALUES ('11', '0', '23', '', '1');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '商品编号',
  `first_cateid` smallint unsigned NOT NULL COMMENT '一级分类编号',
  `second_cateid` smallint NOT NULL COMMENT '二级分类编号',
  `goodsname` varchar(100) NOT NULL COMMENT '商品名称',
  `price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `market_price` decimal(10,2) NOT NULL COMMENT '市场价格',
  `img` varchar(255) NOT NULL COMMENT '商品图片',
  `description` text COMMENT '商品描述',
  `specsid` int NOT NULL COMMENT '规格id',
  `specsattr` varchar(255) NOT NULL COMMENT '规则属性值',
  `isnew` tinyint(1) NOT NULL COMMENT '是否新品1是2不是',
  `ishot` tinyint(1) NOT NULL COMMENT '是否热卖1是2不是',
  `status` tinyint(1) NOT NULL COMMENT '状态1启用2禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品表';

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('7', '5', '6', '猫', '10.00', '10.00', '', '', '5', '朱门酒臭肉', '1', '3', '1');
INSERT INTO `goods` VALUES ('8', '5', '6', '333', '33.00', '33.00', '', '', '5', '新肉', '1', '3', '1');
INSERT INTO `goods` VALUES ('9', '5', '7', '4', '4.00', '44.00', '', '<p>444</p>', '3', '新肉', '1', '3', '1');
INSERT INTO `goods` VALUES ('10', '5', '7', '555', '15.00', '16.00', '', '<p>66666666666666</p>', '7', '酒肉', '1', '3', '1');
INSERT INTO `goods` VALUES ('11', '5', '6', '9', '89.00', '90.00', '', '', '3', '老肉', '1', '4', '1');
INSERT INTO `goods` VALUES ('12', '5', '6', '123', '123.00', '123.00', '', '', '3', '新肉', '1', '1', '1');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL COMMENT '用户编号',
  `phone` char(11) NOT NULL COMMENT '手机号',
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  `password` char(32) NOT NULL COMMENT '密码',
  `randstr` char(5) NOT NULL COMMENT '密码随机串',
  `addtime` char(13) NOT NULL COMMENT '注册时间',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='会员表';

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES ('3', '32c04240-610a-11eb-bbf1-27af7282a3d9', '55222', '2222322222222', '9c2ae0cb4c7c054732e10dbf5a5dd782', 'wYZgC', '1611798199396', '1');
INSERT INTO `member` VALUES ('4', '4766b520-610b-11eb-bbf1-27af7282a3d9', '5544', '2222aaaaa', '25bc97625ee814570e0697f83eecb73a', '0OZXk', '1611798663538', '1');
INSERT INTO `member` VALUES ('5', 'bd0a1390-610f-11eb-bbf1-27af7282a3d9', '13838408478', 'admin', '5cba5ed3548416a5794a7e7ed4335667', 'QDFi4', '1611800578889', '1');
INSERT INTO `member` VALUES ('6', 'e85bbac0-6255-11eb-9a7f-8d74850c54a7', '123456', 'admin', '0d88397eda54c6f49efbcd3e909f228f', 'TmPpL', '1611940667500', '1');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT COMMENT '菜单编号',
  `pid` smallint NOT NULL COMMENT '上级菜单编号',
  `title` varchar(50) NOT NULL COMMENT '菜单名称',
  `icon` varchar(100) NOT NULL COMMENT '菜单图标',
  `type` tinyint(1) NOT NULL COMMENT '菜单类型1目录2菜单',
  `url` varchar(100) NOT NULL COMMENT '菜单地址',
  `status` tinyint(1) NOT NULL COMMENT '菜单状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='后台菜单权限表';

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('25', '0', '系统管理', 'el-icon-s-tools', '1', '', '1');
INSERT INTO `menu` VALUES ('26', '0', '商城管理', 'el-icon-s-tools', '1', '', '1');
INSERT INTO `menu` VALUES ('27', '25', '菜单管理', 'el-icon-s-tools', '2', '/menu', '1');
INSERT INTO `menu` VALUES ('28', '26', '商品分类', '', '2', '/shopGoods', '1');
INSERT INTO `menu` VALUES ('30', '25', '角色管理', '', '2', '/role', '1');
INSERT INTO `menu` VALUES ('32', '25', '管理员管理', '', '2', '/admin', '1');
INSERT INTO `menu` VALUES ('34', '26', '商品规格', '', '2', '/shopSize', '1');
INSERT INTO `menu` VALUES ('35', '26', '商品管理', '', '2', '/shop', '1');
INSERT INTO `menu` VALUES ('36', '26', '会员管理', '', '2', '/Vip', '1');
INSERT INTO `menu` VALUES ('37', '26', '轮播图管理', '', '2', '/banner', '1');
INSERT INTO `menu` VALUES ('39', '26', '秒杀活动', '', '2', '/seckill', '1');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `rolename` varchar(100) NOT NULL COMMENT '角色名称',
  `menus` varchar(255) NOT NULL COMMENT '菜单权限 存放的是菜单编号，用逗号隔开',
  `status` tinyint(1) NOT NULL COMMENT '角色状态1正常2禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='后台用户角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('19', '超级管理员', '26,28', '1');
INSERT INTO `role` VALUES ('21', 'admin', '25,27,30,32,26,28,34,35,36,37,39', '1');

-- ----------------------------
-- Table structure for seckill
-- ----------------------------
DROP TABLE IF EXISTS `seckill`;
CREATE TABLE `seckill` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '秒杀表id',
  `title` varchar(100) NOT NULL COMMENT '活动名称',
  `begintime` char(13) NOT NULL COMMENT '秒杀开始时间',
  `endtime` char(13) NOT NULL COMMENT '秒杀结束时间',
  `first_cateid` smallint NOT NULL COMMENT '商品一级分类编号',
  `second_cateid` smallint NOT NULL COMMENT '商品二级分类编号',
  `goodsid` int NOT NULL COMMENT '商品编号',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='限时秒杀活动表';

-- ----------------------------
-- Records of seckill
-- ----------------------------
INSERT INTO `seckill` VALUES ('3', '57', '1617120000000', '1617120000000', '5', '6', '6', '1');
INSERT INTO `seckill` VALUES ('4', '6', '1611936000000', '1614355200000', '5', '9', '6', '1');

-- ----------------------------
-- Table structure for specs
-- ----------------------------
DROP TABLE IF EXISTS `specs`;
CREATE TABLE `specs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '规格id',
  `specsname` varchar(50) NOT NULL COMMENT '规格名称',
  `status` tinyint(1) NOT NULL COMMENT '规格状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品规格表';

-- ----------------------------
-- Records of specs
-- ----------------------------
INSERT INTO `specs` VALUES ('3', '牛肉', '1');
INSERT INTO `specs` VALUES ('5', '猪肉', '1');
INSERT INTO `specs` VALUES ('7', '肌肉', '1');
INSERT INTO `specs` VALUES ('8', '恐龙肉', '1');

-- ----------------------------
-- Table structure for specs_attr
-- ----------------------------
DROP TABLE IF EXISTS `specs_attr`;
CREATE TABLE `specs_attr` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '规格项编号',
  `specsid` int NOT NULL COMMENT '规格的specsid',
  `specsval` varchar(50) NOT NULL COMMENT '规格值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品规格明细表';

-- ----------------------------
-- Records of specs_attr
-- ----------------------------
INSERT INTO `specs_attr` VALUES ('12', '3', '新肉');
INSERT INTO `specs_attr` VALUES ('13', '3', '旧肉');
INSERT INTO `specs_attr` VALUES ('14', '3', '老肉');
INSERT INTO `specs_attr` VALUES ('15', '7', '新肉');
INSERT INTO `specs_attr` VALUES ('16', '7', '酒肉');
INSERT INTO `specs_attr` VALUES ('17', '8', '大块的');
INSERT INTO `specs_attr` VALUES ('18', '8', '小块的');
INSERT INTO `specs_attr` VALUES ('19', '5', '新肉');
INSERT INTO `specs_attr` VALUES ('20', '5', '旧肉');
INSERT INTO `specs_attr` VALUES ('21', '5', '朱门酒臭肉');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT COMMENT '住建',
  `uid` varchar(50) NOT NULL COMMENT '管理员编号',
  `roleid` smallint NOT NULL COMMENT '角色编号',
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `password` char(32) NOT NULL COMMENT '密码',
  `randstr` char(5) NOT NULL COMMENT '随机加密串',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='后台管理员用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('42', 'dd2a0e30-5987-11eb-91e8-310bfe72bbd8', '21', 'admin', 'b31434fc752475370f611783de6e1f4c', 'PAGtL', '1');
INSERT INTO `user` VALUES ('45', '93935a20-5be8-11eb-b17e-5f0230e65953', '19', '123', 'f07e74451f1783845c8bd036cd0fe458', 'it8Y3', '1');
