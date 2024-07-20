CREATE SCHEMA IF NOT EXISTS "portalatme";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portalatme"."dashboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar,
	"user" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portalatme"."link" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"url" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "portalatme"."dashboard" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "portalatme"."link" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "url_idx" ON "portalatme"."link" USING btree ("url");