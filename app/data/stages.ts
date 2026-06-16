export const stageData: Record<
  string,
  {
    title: string;
    description: string;
    tasks: string[];
  }
> = {
  arrival: {
    title: "Arrival",
    description:
      "Welcome to The American Journey. This stage introduces the participant to the roadmap ahead.",
    tasks: [
      "Complete onboarding",
      "Review the journey map",
      "Understand the six stages",
      "Complete the introduction assessment",
    ],
  },

  foundation: {
    title: "Foundation",
    description:
      "Build the core skills, habits, and understanding needed for long-term success.",
    tasks: [
      "Learn the platform",
      "Study foundational principles",
      "Complete first lessons",
      "Establish baseline goals",
    ],
  },

  work: {
    title: "Work",
    description:
      "Develop career readiness, work ethic, and economic contribution.",
    tasks: [
      "Create a resume",
      "Learn interview skills",
      "Understand workplace expectations",
      "Complete employment module",
    ],
  },

  citizenship: {
    title: "Citizenship",
    description:
      "Learn how communities, responsibilities, and civic participation work.",
    tasks: [
      "Study civic responsibilities",
      "Learn community engagement",
      "Review local government basics",
      "Complete citizenship lessons",
    ],
  },

  leadership: {
    title: "Leadership",
    description:
      "Develop influence, responsibility, communication, and service.",
    tasks: [
      "Practice leadership skills",
      "Complete service project",
      "Study decision making",
      "Review leadership principles",
    ],
  },

  legacy: {
    title: "Legacy",
    description:
      "Focus on long-term contribution, mentorship, and impact.",
    tasks: [
      "Create personal vision",
      "Identify mentorship opportunities",
      "Build legacy plan",
      "Complete final reflection",
    ],
  },
};