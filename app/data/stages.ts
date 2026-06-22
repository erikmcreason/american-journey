export type ReadinessCategory =
  | "Integration"
  | "Career"
  | "Citizenship"
  | "Leadership"
  | "Legacy";

export type Task = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  readinessCategory: ReadinessCategory;
  readinessPoints: number;
  content: string;
  resources: string[];
  assessment: string | null;
};

export type Stage = {
  title: string;
  description: string;
  tasks: Task[];
};

export const stageData: Record<string, Stage> = {
  arrival: {
    title: "Arrival",
    description:
      "Welcome to The American Journey. This stage introduces the participant to the roadmap ahead.",
    tasks: [
      {
        id: "complete-onboarding",
        title: "Complete Onboarding",
        description:
          "Learn how The American Journey works and how progress is tracked.",
        estimatedMinutes: 10,
        readinessCategory: "Integration",
        readinessPoints: 10,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "review-journey-map",
        title: "Review The Journey Map",
        description:
          "Understand the stages and progression system.",
        estimatedMinutes: 10,
        readinessCategory: "Integration",
        readinessPoints: 10,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "understand-six-stages",
        title: "Understand The Six Stages",
        description:
          "Learn how each stage contributes to long-term success.",
        estimatedMinutes: 15,
        readinessCategory: "Integration",
        readinessPoints: 15,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "complete-introduction-assessment",
        title: "Complete Introduction Assessment",
        description:
          "Establish a baseline understanding of the platform.",
        estimatedMinutes: 15,
        readinessCategory: "Integration",
        readinessPoints: 20,
        content: "",
        resources: [],
        assessment: null,
      },
    ],
  },

  foundation: {
    title: "Foundation",
    description:
      "Build the core skills, habits, and understanding needed for long-term success.",
    tasks: [
      {
        id: "learn-platform",
        title: "Learn The Platform",
        description:
          "Become comfortable navigating the platform and tracking progress.",
        estimatedMinutes: 10,
        readinessCategory: "Integration",
        readinessPoints: 10,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "study-foundational-principles",
        title: "Study Foundational Principles",
        description:
          "Understand the key principles that drive success.",
        estimatedMinutes: 20,
        readinessCategory: "Integration",
        readinessPoints: 20,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "complete-first-lessons",
        title: "Complete First Lessons",
        description:
          "Finish the initial learning modules.",
        estimatedMinutes: 30,
        readinessCategory: "Integration",
        readinessPoints: 25,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "establish-baseline-goals",
        title: "Establish Baseline Goals",
        description:
          "Create your starting goals and benchmarks.",
        estimatedMinutes: 20,
        readinessCategory: "Integration",
        readinessPoints: 25,
        content: "",
        resources: [],
        assessment: null,
      },
    ],
  },

  work: {
    title: "Work",
    description:
      "Develop career readiness, work ethic, and economic contribution.",
    tasks: [
      {
        id: "create-resume",
        title: "Create A Resume",
        description: "Build a professional resume.",
        estimatedMinutes: 30,
        readinessCategory: "Career",
        readinessPoints: 25,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "learn-interview-skills",
        title: "Learn Interview Skills",
        description: "Prepare for employment interviews.",
        estimatedMinutes: 30,
        readinessCategory: "Career",
        readinessPoints: 25,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "understand-workplace-expectations",
        title: "Understand Workplace Expectations",
        description: "Learn workplace culture and expectations.",
        estimatedMinutes: 20,
        readinessCategory: "Career",
        readinessPoints: 20,
        content: "",
        resources: [],
        assessment: null,
      },
      {
        id: "complete-employment-module",
        title: "Complete Employment Module",
        description: "Finish the employment readiness module.",
        estimatedMinutes: 45,
        readinessCategory: "Career",
        readinessPoints: 30,
        content: "",
        resources: [],
        assessment: null,
      },
    ],
  },

  citizenship: {
    title: "Citizenship",
    description:
      "Learn how communities, responsibilities, and civic participation work.",
    tasks: [],
  },

  leadership: {
    title: "Leadership",
    description:
      "Develop influence, responsibility, communication, and service.",
    tasks: [],
  },

  legacy: {
    title: "Legacy",
    description:
      "Focus on long-term contribution, mentorship, and impact.",
    tasks: [],
  },
};