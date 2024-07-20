ALTER TABLE "portalatme"."dashboard" RENAME COLUMN "user" TO "user_id";--> statement-breakpoint
ALTER TABLE "portalatme"."link" ALTER COLUMN "dashboard_id" SET DATA TYPE integer;