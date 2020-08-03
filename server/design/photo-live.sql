CREATE TABLE `Users` (
  `user_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100),
  `password` varchar(100),
  `is_admin` boolean DEFAULT false,
  `created_at` timestamp DEFAULT (${now()})
);

CREATE TABLE `UsersDetails` (
  `user_details_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer(10),
  `username` varchar(100),
  `birthday_year` integer(10),
  `is_professional_photografer` boolean,
  `alias` varchar(100) DEFAULT "unknown",
  `city_of_live` varchar(100)
);

CREATE TABLE `Prize` (
  `prize_id` integer (10) PRIMARY KEY AUTO_INCREMENT,
  `title` varchar (100),
  `price` integer (100)
)

CREATE TABLE `Photos` (
  `photo_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `author` integer(10),
  `category_id` integer(10),
  `link_to_file` varchar(100),
  `link_to_instagram` varchar(100),
  `link_to_facebook` varchar(100),
  `camera_details_id` integer(10),
  `impressions_count` integer (256),
  `created_at` timestamp DEFAULT (${now()})
);

CREATE TABLE `PhotosDescription` (
  `photo_description_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `photo_id` integer(10),
  `text` varchar(256)
);

CREATE TABLE `PhotosCameraDetails` (
  `photo_camera_details_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `camera_name` varchar(100),
  `camera_type` varchar(10)
);

CREATE TABLE `PhotosTags` (
  `photo_tag_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(10),
  `content` varchar (100),
  `color` varchar(10),
  `photo_id` integer(10)
);

CREATE TABLE `PhotosCategories` (
  `photo_category_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100),
  `created_by_role` varchar(10)
);

CREATE TABLE `ContestsSubmittions` (
  `contests_submittions_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `author` integer(10),
  `photo_id` integer(10),
  `payment_id` integer(10),
  `contest_id` integer(10)
);

CREATE TABLE `ContestCategories` (
  `contest_category_id` integer (10),
  `name` varchar (256),
  `description` varchar (256)
)

CREATE TABLE `Contests` (
  `contest_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100),
  `participant_fee` integer(100),
  `participant_level` varchar(10),
  `participant_fee_currency` varchar (100),
  `category_id` integer (10),
  `winner` integer(10),
  `created_at` timestamp DEFAULT (${now()})
);

CREATE TABLE `ContestNews` (
  `contest_news_id` integer (10),
  `article_id` integer (10)
)

CREATE TABLE `ContestsDetails` (
  `contest_details_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `contest_id` integer(10),
  `description` varchar(255),
  `started_at` timestamp,
  `end_at` timestamp,
  `1_prize` integer (10),
  `2_prize` integer (10),
  `3_prize` integer (10),
  `avatar` varchar (256),
  `judle_id` integer (10)
);

CREATE TABLE `Judles` (
  `judle_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100),
  `locate_at` varchar(100),
  `avatar` varchar (100),
  `credo` varchar (100),
  `level` varchar(100)
);

CREATE TABLE `ContestsJudles` (
  `contest_judle_id` integer(10) PRIMARY KEY AUTO_INCREMENT,
  `judle_id` integer(10),
  `contest_id` integer(10)
);

CREATE TABLE `Articles` (
  `article_id` integer (10) PRIMARY KEY AUTO_INCREMENT,
  `title` varchar (100),
  `content` varchar (255),
  `description` varchar (100),
  `author` integer (10),
  `is_contest_news` boolean,
  `created_at` timestamp DEFAULT (${now()})
)

CREATE TABLE `ArticleTags` (
  `article_tags_id` integer (10) PRIMARY KEY AUTO_INCREMENT,
  `content` varchar (100)
)

CREATE TABLE `ArticleTag` (
  `article_tag_id` integer (10) PRIMARY KEY AUTO_INCREMENT,
  `article_tags_id` integer (10) REFERENCES `ArticleTags` (`article_tags_id`),
  `article_id` integer (10) REFERENCES `Articles` (`article_id`)
)

ALTER TABLE `UsersDetails` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Photos` ADD FOREIGN KEY (`author`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Photos` ADD FOREIGN KEY (`category_id`) REFERENCES `PhotosCategories` (`photo_category_id`);

ALTER TABLE `Photos` ADD FOREIGN KEY (`camera_details_id`) REFERENCES `PhotosCameraDetails` (`photo_camera_details_id`);

ALTER TABLE `PhotosDescription` ADD FOREIGN KEY (`photo_id`) REFERENCES `Photos` (`photo_id`);

ALTER TABLE `PhotosTags` ADD FOREIGN KEY (`photo_id`) REFERENCES `Photos` (`photo_id`);

ALTER TABLE `ContestsSubmittions` ADD FOREIGN KEY (`author`) REFERENCES `Users` (`user_id`);

ALTER TABLE `ContestsSubmittions` ADD FOREIGN KEY (`photo_id`) REFERENCES `Photos` (`photo_id`);

ALTER TABLE `ContestsDetails` ADD FOREIGN KEY (`contest_id`) REFERENCES `Contests` (`contest_id`);

ALTER TABLE `ContestsJudles` ADD FOREIGN KEY (`judle_id`) REFERENCES `Judles` (`judle_id`);

ALTER TABLE `ContestsJudles` ADD FOREIGN KEY (`contest_id`) REFERENCES `Contests` (`contest_id`);

ALTER TABLE `UsersDetails` ADD FOREIGN KEY (`username`) REFERENCES `UsersDetails` (`alias`);

ALTER TABLE `Contests` ADD FOREIGN KEY (`1_prize`) REFERENCES `Prize` (`prize_id`);

ALTER TABLE `Contests` ADD FOREIGN KEY (`2_prize`) REFERENCES `Prize` (`prize_id`);

ALTER TABLE `Contests` ADD FOREIGN KEY (`3_prize`) REFERENCES `Prize` (`prize_id`);
