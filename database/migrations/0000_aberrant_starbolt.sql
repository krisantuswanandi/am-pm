CREATE TABLE `order_lines` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`quantity` integer,
	`price` integer,
	`notes` text,
	`order_id` integer,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`address` text,
	`transaction_date` text
);
