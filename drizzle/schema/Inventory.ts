
import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text, } from "drizzle-orm/sqlite-core";

const inventoryTable = sqliteTable('ItamMaster', {
    barcode: text('barcode').primaryKey().notNull().unique(),
    uom: text('uom').notNull(),
    baruom: text('baruom').notNull(),
    packing: integer('packing').notNull(),
    quantity: integer('quantity').notNull(),
    title: text('title').notNull(),
    pflag: text('pflag')
})