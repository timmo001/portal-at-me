// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgSchema,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const mySchema = pgSchema("portalatme");

export const dashboards = mySchema.table(
  "dashboard",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: varchar("description", {}),
    userId: varchar("user_id", {}).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const dashboardsRelations = relations(dashboards, ({ many }) => ({
  dashboardLinks: many(links),
}));

export const links = mySchema.table(
  "link",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    url: varchar("url", {}).notNull(),
    dashboardId: integer("dashboard_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
    urlIndex: index("url_idx").on(example.url),
  }),
);

export const linksRelations = relations(links, ({ one }) => ({
  dashboard: one(dashboards, {
    fields: [links.dashboardId],
    references: [dashboards.id],
  }),
}));
