// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgSchema,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const mySchema = pgSchema("portalatme");

export const links = mySchema.table(
  "link",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }),
    url: varchar("url", {}),
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
