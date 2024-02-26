import {
  pgTable,
  varchar,
  boolean,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

export const tasks = pgTable("task", {
  id: serial("id").primaryKey(),
  user: varchar("user", { length: 16 }).notNull(),
  title: varchar("title", { length: 64 }).notNull(),
  description: varchar("description", { length: 255 }),
  date: timestamp("date").defaultNow().notNull(),
  done: boolean("done").default(false).notNull(),
});
