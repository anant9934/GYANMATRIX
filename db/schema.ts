import { 
  pgTable, 
  uuid, 
  text, 
  boolean, 
  timestamp, 
  jsonb,
  uniqueIndex,
  index
} from 'drizzle-orm/pg-core';

export const surveyRespondents = pgTable(
  'survey_respondents',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    surveyVersion: text('survey_version').notNull(),
    consentGiven: boolean('consent_given').notNull(),
    startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    surveyVersionIdx: index('survey_version_idx').on(table.surveyVersion),
  })
);

export const surveyResponses = pgTable(
  'survey_responses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    respondentId: uuid('respondent_id')
      .notNull()
      .references(() => surveyRespondents.id, { onDelete: 'cascade' }),
    questionId: text('question_id').notNull(),
    rawAnswer: jsonb('raw_answer').notNull(),
    normalizedAnswer: jsonb('normalized_answer'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    respondentIdIdx: index('respondent_id_idx').on(table.respondentId),
    questionIdIdx: index('question_id_idx').on(table.questionId),
    uniqueResponse: uniqueIndex('unique_response_idx').on(table.respondentId, table.questionId),
  })
);
