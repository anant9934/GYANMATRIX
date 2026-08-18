import { QuestionConfig } from "../types/survey";

export const SURVEY_QUESTIONS: QuestionConfig[] = [
  // SECTION 1: Your Profile
  {
    id: "Q01_ROLE",
    type: "single-select",
    section: "Your Profile",
    title: "What is your primary current role?",
    required: true,
    options: [
      { id: "software_engineer", label: "Software Engineer" },
      { id: "frontend_engineer", label: "Frontend Engineer" },
      { id: "backend_engineer", label: "Backend Engineer" },
      { id: "fullstack_engineer", label: "Full Stack Engineer" },
      { id: "data_scientist", label: "Data Scientist" },
      { id: "ai_ml_engineer", label: "AI / ML Engineer" },
      { id: "devops_engineer", label: "DevOps / SRE" },
      { id: "product_manager", label: "Product Manager" },
      { id: "other", label: "Other Technology Role" }
    ]
  },
  {
    id: "Q02_EXPERIENCE",
    type: "single-select",
    section: "Your Profile",
    title: "How many years of professional experience do you have?",
    required: true,
    options: [
      { id: "0_1", label: "0 - 1 years" },
      { id: "1_3", label: "1 - 3 years" },
      { id: "3_5", label: "3 - 5 years" },
      { id: "5_10", label: "5 - 10 years" },
      { id: "10_plus", label: "10+ years" }
    ]
  },
  {
    id: "Q03_DEGREE",
    type: "dual-select",
    section: "Your Profile",
    title: "What is your highest relevant educational degree?",
    required: true,
    partA: {
      label: "Degree",
      options: [
        { id: "btech_be", label: "B.Tech / B.E." },
        { id: "bs", label: "B.S." },
        { id: "bca", label: "BCA" },
        { id: "mtech_me", label: "M.Tech / M.E." },
        { id: "ms", label: "M.S." },
        { id: "mca", label: "MCA" },
        { id: "phd", label: "Ph.D." },
        { id: "no_degree", label: "No Formal Degree" }
      ]
    },
    partB: {
      label: "Branch / Field",
      options: [
        { id: "cs", label: "Computer Science" },
        { id: "it", label: "Information Technology" },
        { id: "ece", label: "Electronics & Communication" },
        { id: "ee", label: "Electrical Engineering" },
        { id: "mech", label: "Mechanical Engineering" },
        { id: "civil", label: "Civil Engineering" },
        { id: "other_stem", label: "Other STEM" },
        { id: "non_stem", label: "Non-STEM" }
      ]
    }
  },
  {
    id: "Q04_CGPA",
    type: "single-select",
    section: "Your Profile",
    title: "What was your final CGPA or grade equivalent?",
    required: true,
    options: [
      { id: "under_7", label: "< 7.0 / 70%" },
      { id: "7_8", label: "7.0 - 8.0 / 70 - 80%" },
      { id: "8_9", label: "8.0 - 9.0 / 80 - 90%" },
      { id: "above_9", label: "> 9.0 / 90%+" },
      { id: "not_applicable", label: "Not Applicable" }
    ]
  },

  // SECTION 2: Where You Started
  {
    id: "Q05_STARTING_SKILLS",
    type: "matrix",
    section: "Where You Started",
    title: "Rate your skills at the very beginning of your serious career preparation.",
    required: true,
    rows: [
      { id: "programming", label: "Programming" },
      { id: "dsa", label: "DSA" },
      { id: "problem_solving", label: "Problem Solving" },
      { id: "sql_db", label: "SQL / Databases" },
      { id: "communication", label: "Communication" }
    ],
    scale: { min: 1, max: 5, minLabel: "Beginner", maxLabel: "Advanced" }
  },
  {
    id: "Q06_TECHNOLOGIES",
    type: "multi-select",
    section: "Where You Started",
    title: "Which core technologies did you learn first?",
    description: "Choose the ones that gave you your foundational knowledge.",
    required: true,
    options: [
      { id: "c_cpp", label: "C / C++" },
      { id: "java", label: "Java" },
      { id: "python", label: "Python" },
      { id: "javascript", label: "JavaScript / TypeScript" },
      { id: "html_css", label: "HTML & CSS" },
      { id: "sql", label: "SQL" },
      { id: "go", label: "Go" },
      { id: "rust", label: "Rust" },
      { id: "php", label: "PHP" },
      { id: "ruby", label: "Ruby" }
    ]
  },
  {
    id: "Q07_PREPARATION_START",
    type: "single-select",
    section: "Where You Started",
    title: "When did you start seriously preparing for a career in CS?",
    required: true,
    options: [
      { id: "before_college", label: "Before College" },
      { id: "first_year", label: "1st Year of College" },
      { id: "second_year", label: "2nd Year of College" },
      { id: "third_year", label: "3rd Year of College" },
      { id: "final_year", label: "Final Year of College" },
      { id: "post_graduation", label: "After Graduation" }
    ]
  },

  // SECTION 3: What You Built
  {
    id: "Q08_PROJECT_COUNT",
    type: "single-select",
    section: "What You Built",
    title: "How many substantial projects did you build before your first major role?",
    required: true,
    options: [
      { id: "0", label: "0" },
      { id: "1_2", label: "1 - 2" },
      { id: "3_4", label: "3 - 4" },
      { id: "5_plus", label: "5+" }
    ]
  },
  {
    id: "Q09_PROJECT_TYPES",
    type: "multi-select",
    section: "What You Built",
    title: "What types of projects did you build?",
    required: true,
    options: [
      { id: "frontend_web", label: "Frontend Web Apps" },
      { id: "backend_api", label: "Backend APIs / Services" },
      { id: "fullstack", label: "Full Stack Apps" },
      { id: "mobile", label: "Mobile Apps" },
      { id: "ml_ai", label: "Machine Learning / AI Models" },
      { id: "cli_tools", label: "CLI Tools / Scripts" },
      { id: "hardware_iot", label: "Hardware / IoT" },
      { id: "games", label: "Games" }
    ]
  },

  // SECTION 4: Your Opportunity Journey
  {
    id: "Q10_PRE_OPPORTUNITY_EXPERIENCE",
    type: "multi-select",
    section: "Your Opportunity Journey",
    title: "Did you have any of these experiences before landing your first full-time role?",
    required: true,
    options: [
      { id: "internships", label: "Internships" },
      { id: "open_source", label: "Open Source Contributions" },
      { id: "freelance", label: "Freelance Work" },
      { id: "hackathons", label: "Hackathons" },
      { id: "bootcamps", label: "Bootcamps" },
      { id: "none", label: "None of the above" }
    ]
  },
  {
    id: "Q11_TIME_TO_OPPORTUNITY",
    type: "single-select",
    section: "Your Opportunity Journey",
    title: "How long did it take to land your first significant role after starting your job search?",
    required: true,
    options: [
      { id: "less_than_3_months", label: "Less than 3 months" },
      { id: "3_6_months", label: "3 - 6 months" },
      { id: "6_12_months", label: "6 - 12 months" },
      { id: "more_than_1_year", label: "More than 1 year" }
    ]
  },
  {
    id: "Q12_APPLICATIONS",
    type: "single-select",
    section: "Your Opportunity Journey",
    title: "Approximately how many applications did you submit to get your first role?",
    required: true,
    options: [
      { id: "less_10", label: "Less than 10" },
      { id: "10_50", label: "10 - 50" },
      { id: "50_100", label: "50 - 100" },
      { id: "100_plus", label: "100+" }
    ]
  },
  {
    id: "Q13_FIRST_OPPORTUNITY",
    type: "single-select",
    section: "Your Opportunity Journey",
    title: "What was the nature of your first significant opportunity?",
    required: true,
    options: [
      { id: "full_time_mnc", label: "Full-time (MNC / Large Corp)" },
      { id: "full_time_startup", label: "Full-time (Startup)" },
      { id: "internship", label: "Internship" },
      { id: "freelance", label: "Freelance Gig" },
      { id: "founder", label: "Startup Founder" }
    ]
  },
  {
    id: "Q14_SELECTION_STAGES",
    type: "multi-select",
    section: "Your Opportunity Journey",
    title: "What did the selection process look like for that role?",
    required: true,
    options: [
      { id: "resume_screening", label: "Resume Screening" },
      { id: "online_assessment", label: "Online Assessment (OA)" },
      { id: "technical_interview", label: "Technical Interview(s)" },
      { id: "take_home", label: "Take-home Assignment" },
      { id: "system_design", label: "System Design Interview" },
      { id: "behavioral", label: "HR / Behavioral Interview" }
    ]
  },

  // SECTION 5: What Actually Helped
  {
    id: "Q15_SUCCESS_FACTORS",
    type: "multi-select",
    section: "What Actually Helped",
    title: "What were the biggest factors that helped you succeed?",
    description: "Pick the 3 that mattered most.",
    required: true,
    maxSelections: 3,
    options: [
      { id: "dsa_skills", label: "DSA / Competitive Programming Skills" },
      { id: "strong_projects", label: "Strong Projects / Portfolio" },
      { id: "past_experience", label: "Past Experience (Internships/Freelance)" },
      { id: "communication", label: "Communication Skills" },
      { id: "referrals", label: "Referrals / Network" },
      { id: "college_brand", label: "College Brand" },
      { id: "luck_timing", label: "Luck / Timing" }
    ]
  },
  {
    id: "Q16_LOW_IMPACT",
    type: "multi-select",
    section: "What Actually Helped",
    title: "What do you think mattered the LEAST in your success?",
    description: "Pick up to 3.",
    required: true,
    maxSelections: 3,
    options: [
      { id: "cgpa", label: "CGPA" },
      { id: "certifications", label: "Number of Certifications" },
      { id: "many_languages", label: "Knowing too many programming languages" },
      { id: "college_brand", label: "College Brand" },
      { id: "complex_math", label: "Complex Math / Theory" },
      { id: "perfect_code", label: "Writing perfectly optimized code in interviews" }
    ]
  },

  // SECTION 6: Experience & Outcome
  {
    id: "Q17_INTERNSHIPS",
    type: "single-select",
    section: "Experience & Outcome",
    title: "How many internships did you complete before graduating?",
    required: true,
    options: [
      { id: "0", label: "0" },
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3_plus", label: "3+" }
    ]
  },
  {
    id: "Q18_PROJECTS_BEFORE_JOB",
    type: "single-select",
    section: "Experience & Outcome",
    title: "How many projects did you list on the resume that got you hired?",
    required: true,
    options: [
      { id: "0", label: "0" },
      { id: "1_2", label: "1 - 2" },
      { id: "3_4", label: "3 - 4" },
      { id: "5_plus", label: "5+" }
    ]
  },
  {
    id: "Q19_FIRST_COMPENSATION",
    type: "single-select",
    section: "Experience & Outcome",
    title: "How did you feel about your first compensation compared to your expectations?",
    required: true,
    options: [
      { id: "below_expectations", label: "Below Expectations" },
      { id: "met_expectations", label: "Met Expectations" },
      { id: "above_expectations", label: "Above Expectations" },
      { id: "unpaid", label: "It was unpaid / pure learning" }
    ]
  },
  {
    id: "Q20_GOAL_MATCH",
    type: "scale",
    section: "Experience & Outcome",
    title: "How closely did your first role match what you originally wanted to do?",
    required: true,
    scale: { min: 1, max: 5, minLabel: "Completely different", maxLabel: "Exactly what I wanted" }
  },

  // SECTION 7: The Most Valuable Questions
  {
    id: "Q21_RESTART",
    type: "short-text",
    section: "The Most Valuable Questions",
    title: "If you could restart your CS career journey from your starting point, what would you do differently?",
    description: "One to three sentences is enough.",
    required: false,
    maxLength: 500,
    placeholder: "I would have focused more on..."
  },
  {
    id: "Q22_ADVICE",
    type: "short-text",
    section: "The Most Valuable Questions",
    title: "What is the ONE thing you wish someone had told you before you started?",
    description: "One or two sentences is enough.",
    required: false,
    maxLength: 300,
    placeholder: "You don't need to know every framework to start building."
  }
];
