CREATE TABLE `aircraft` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`status` text DEFAULT 'parked' NOT NULL,
	`make` text NOT NULL,
	`model` text NOT NULL,
	`capacity` integer NOT NULL,
	`passenger_count` integer DEFAULT 0 NOT NULL,
	`pilot_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `airline` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`country` text NOT NULL,
	`year` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `airport` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`city` text NOT NULL,
	`country` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `crew_member` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`aircraft_id` text,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `flight` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`route_id` text NOT NULL,
	`aircraft_id` text NOT NULL,
	`departure` integer NOT NULL,
	`arrival` integer NOT NULL,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`price` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `incident` (
	`id` text PRIMARY KEY NOT NULL,
	`flight_id` text NOT NULL,
	`description` text NOT NULL,
	`date` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `maintenance` (
	`id` text PRIMARY KEY NOT NULL,
	`aircraft_id` text NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `passenger` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`registeration_date` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pilot` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`aircraft_id` text,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `route` (
	`id` text PRIMARY KEY NOT NULL,
	`departure_airport_id` text NOT NULL,
	`arrival_airport_id` text NOT NULL,
	`duration_minutes` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ticket` (
	`id` text PRIMARY KEY NOT NULL,
	`flight_id` text NOT NULL,
	`passenger_id` text NOT NULL,
	`date` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `airports_to_airlines` (
	`airport_id` text NOT NULL,
	`airline_id` text NOT NULL,
	PRIMARY KEY(`airline_id`, `airport_id`),
	FOREIGN KEY (`airport_id`) REFERENCES `airport`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`airline_id`) REFERENCES `airline`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `airline_name_unique` ON `airline` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `airline_email_unique` ON `airline` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `passenger_phone_unique` ON `passenger` (`phone`);