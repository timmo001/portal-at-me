DO $$ BEGIN
 CREATE TYPE "public"."search" AS ENUM('bing', 'chatgpt', 'duckduckgo', 'google');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "portalatme"."dashboard" ADD COLUMN "search" "search";