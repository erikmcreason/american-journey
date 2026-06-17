import { stageData } from "@/app/data/stages";

export function getStageProgress(
  stageKey: string
) {
  const stage = stageData[stageKey];

  if (!stage) {
    return 0;
  }

  if (typeof window === "undefined") {
    return 0;
  }

  const savedTasks = localStorage.getItem(
    `american-journey-${stageKey}`
  );

  const completedTasks = savedTasks
    ? JSON.parse(savedTasks).length
    : 0;

  const progress = Math.round(
    (completedTasks / stage.tasks.length) * 100
  );

  return progress;
}

export function isStageUnlocked(
  stageKey: string
) {
  const stageKeys = Object.keys(stageData);

  const stageIndex =
    stageKeys.indexOf(stageKey);

  if (stageIndex === 0) {
    return true;
  }

  const previousStage =
    stageKeys[stageIndex - 1];

  return (
    getStageProgress(previousStage) === 100
  );
}