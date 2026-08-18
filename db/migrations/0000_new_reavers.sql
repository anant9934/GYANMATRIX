CREATE TABLE "survey_respondents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"survey_version" text NOT NULL,
	"consent_given" boolean NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "survey_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"respondent_id" uuid NOT NULL,
	"question_id" text NOT NULL,
	"raw_answer" jsonb NOT NULL,
	"normalized_answer" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "survey_responses" ADD CONSTRAINT "survey_responses_respondent_id_survey_respondents_id_fk" FOREIGN KEY ("respondent_id") REFERENCES "public"."survey_respondents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "survey_version_idx" ON "survey_respondents" USING btree ("survey_version");--> statement-breakpoint
CREATE INDEX "respondent_id_idx" ON "survey_responses" USING btree ("respondent_id");--> statement-breakpoint
CREATE INDEX "question_id_idx" ON "survey_responses" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_response_idx" ON "survey_responses" USING btree ("respondent_id","question_id");