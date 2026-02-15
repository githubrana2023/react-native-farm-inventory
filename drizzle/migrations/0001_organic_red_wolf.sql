ALTER TABLE `users_table` RENAME TO `itemTable`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_itemTable` (
	`id` text PRIMARY KEY NOT NULL,
	`supplier_id` text NOT NULL,
	`item_code` text NOT NULL,
	`item_description` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_itemTable`("id", "supplier_id", "item_code", "item_description", "createdAt", "updatedAt") SELECT "id", "supplier_id", "item_code", "item_description", "createdAt", "updatedAt" FROM `itemTable`;--> statement-breakpoint
DROP TABLE `itemTable`;--> statement-breakpoint
ALTER TABLE `__new_itemTable` RENAME TO `itemTable`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `itemTable_id_unique` ON `itemTable` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `itemTable_item_code_unique` ON `itemTable` (`item_code`);--> statement-breakpoint
CREATE TABLE `__new_barcode` (
	`id` text PRIMARY KEY NOT NULL,
	`barcode` text NOT NULL,
	`price` real NOT NULL,
	`description` text,
	`item_code_id` text NOT NULL,
	`unit_id` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`item_code_id`) REFERENCES `itemTable`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_barcode`("id", "barcode", "price", "description", "item_code_id", "unit_id", "createdAt", "updatedAt") SELECT "id", "barcode", "price", "description", "item_code_id", "unit_id", "createdAt", "updatedAt" FROM `barcode`;--> statement-breakpoint
DROP TABLE `barcode`;--> statement-breakpoint
ALTER TABLE `__new_barcode` RENAME TO `barcode`;--> statement-breakpoint
CREATE UNIQUE INDEX `barcode_id_unique` ON `barcode` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `barcode_barcode_unique` ON `barcode` (`barcode`);