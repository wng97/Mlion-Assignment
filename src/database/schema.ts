import {
  pgTable,
  serial,
  varchar,
  decimal,
  numeric,
  integer,
} from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  // [[x,y],[x,y],[x,y],[x,y]]
  coordinate: decimal("coordinate", { precision: 6, scale: 2 })
    .array()
    .array()
    // this is due to drizzle array auto cast it to string, so we have to specified it as number
    .$type<number[][]>()
    .notNull(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(),
  length: numeric("length", { precision: 6, scale: 2 })
    .$type<number>()
    .notNull(),
  width: numeric("width", { precision: 6, scale: 2 }).$type<number>().notNull(),
  height: numeric("height", { precision: 6, scale: 2 })
    .$type<number>()
    .notNull(),
  location_id: integer("location_id")
    .references(() => locations.id)
    .notNull(),
});
