CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`order` integer
);
--> statement-breakpoint
CREATE TABLE `menu` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`price` integer,
	`image` text,
	`order` integer,
	`category_id` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
