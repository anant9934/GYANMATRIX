import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '../db';
import { surveyRespondents, surveyResponses } from '../db/schema';
import { normalizeAnswer, NORMALIZATION_VERSION } from '../lib/survey-normalization';

const mockAnswers = {
  Q01_ROLE: "ai_ml_engineer",
  Q02_EXPERIENCE: "1_3",
  Q03_DEGREE: { partA: "btech_be", partB: "cs" },
  Q04_CGPA: "8_9",
  Q05_STARTING_SKILLS: { programming: 4, dsa: 3, problem_solving: 4, sql_db: 2, communication: 3 },
  Q06_TECHNOLOGIES: ["python", "sql"],
  Q07_PREPARATION_START: "second_year",
  Q08_PROJECT_COUNT: "3_4",
  Q09_PROJECT_TYPES: ["ml_ai", "backend_api"],
  Q10_PRE_OPPORTUNITY_EXPERIENCE: ["internships"],
  Q11_TIME_TO_OPPORTUNITY: "3_6_months",
  Q12_APPLICATIONS: "50_100",
  Q13_FIRST_OPPORTUNITY: "full_time_startup",
  Q14_SELECTION_STAGES: ["resume_screening", "technical_interview", "take_home"],
  Q15_SUCCESS_FACTORS: ["strong_projects", "dsa_skills", "referrals"],
  Q16_LOW_IMPACT: ["cgpa", "certifications", "college_brand"],
  Q17_INTERNSHIPS: "1",
  Q18_PROJECTS_BEFORE_JOB: "3_4",
  Q19_FIRST_COMPENSATION: "met_expectations",
  Q20_GOAL_MATCH: 4,
  Q21_RESTART: "I would focus more on backend.",
  Q22_ADVICE: "Build more projects."
};

async function runTest() {
  console.log("Starting test submission...");
  
  try {
    const respondentId = crypto.randomUUID();
    console.log("Preparing batch insertion...");
    
    const respondentInsert = db.insert(surveyRespondents).values({
      id: respondentId,
      surveyVersion: "v1-test",
      consentGiven: true,
      startedAt: new Date(),
      completedAt: new Date(),
    });

    const responsesToInsert = Object.entries(mockAnswers).map(([questionId, rawAnswer]) => {
      const normalized = normalizeAnswer(questionId, rawAnswer);
      return {
        respondentId,
        questionId,
        rawAnswer,
        normalizedAnswer: { version: NORMALIZATION_VERSION, data: normalized }
      };
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries: any[] = [respondentInsert];
    if (responsesToInsert.length > 0) {
      queries.push(db.insert(surveyResponses).values(responsesToInsert));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await db.batch(queries as any);

    console.log("Batch Insertion SUCCESS.");
    console.log("Inserted ID:", respondentId);
  } catch (err) {
    console.error("Transaction FAILED, rolled back.", err);
  } finally {
    process.exit(0);
  }
}

runTest();
