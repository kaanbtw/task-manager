CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" varchar(16) NOT NULL,
	"title" varchar(64) NOT NULL,
	"description" varchar(255),
	"date" timestamp DEFAULT now() NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
