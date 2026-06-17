"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { stageData } from "@/app/data/stages";
import { isStageUnlocked } from "@/app/lib/unlockRules";

export default function StagePage() {
  const params = useParams();
  const stage = params.stage as string;

  const currentStage = stageData[stage];

  const stageKeys = Object.keys(stageData);

  const currentIndex = stageKeys.indexOf(stage);

  const previousStage =
    currentIndex > 0
      ? stageKeys[currentIndex - 1]
      : null;

  const nextStage =
    currentIndex < stageKeys.length - 1
      ? stageKeys[currentIndex + 1]
      : null;

  const unlocked = isStageUnlocked(stage);

  const storageKey = `american-journey-${stage}`;

  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem(storageKey);

    if (savedTasks) {
      setCompletedTasks(JSON.parse(savedTasks));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(completedTasks)
    );
  }, [completedTasks, storageKey]);

  if (!currentStage) {
    return (
      <main className="min-h-screen bg-slate-900 text-white p-8">
        <h1 className="text-4xl font-bold">
          Stage Not Found
        </h1>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-slate-900 text-white p-8">
        <h1 className="text-5xl font-bold mb-6">
          Stage Locked
        </h1>

        <p className="mb-6">
          Complete the previous stage before
          accessing this section.
        </p>

        <Link
          href="/journey"
          className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          Return to Journey
        </Link>
      </main>
    );
  }

  function toggleTask(task: string) {
    if (completedTasks.includes(task)) {
      setCompletedTasks(
        completedTasks.filter((t) => t !== task)
      );
    } else {
      setCompletedTasks([...completedTasks, task]);
    }
  }

  const progressPercent = Math.round(
    (completedTasks.length / currentStage.tasks.length) * 100
  );

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <Link
        href="/journey"
        className="text-blue-300 underline"
      >
        Back to Journey
      </Link>

      <h1 className="text-5xl font-bold mt-8 mb-4">
        {currentStage.title}
      </h1>

      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Overview
        </h2>

        <p>{currentStage.description}</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Progress
        </h2>

        <div className="w-full bg-slate-700 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="mt-3">
          {progressPercent}% Complete
        </p>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Tasks
        </h2>

        <ul className="space-y-3">
          {currentStage.tasks.map((task) => {
            const completed =
              completedTasks.includes(task);

            return (
              <li key={task}>
                <button
                  onClick={() => toggleTask(task)}
                  className="text-left hover:text-green-400"
                >
                  {completed ? "☑" : "☐"} {task}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-between mt-8">
        <div>
          {previousStage && (
            <Link
              href={`/journey/${previousStage}`}
              className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
            >
              ← {stageData[previousStage].title}
            </Link>
          )}
        </div>

        <div>
          {nextStage &&
            progressPercent === 100 &&
            isStageUnlocked(nextStage) && (
              <Link
                href={`/journey/${nextStage}`}
                className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg"
              >
                {stageData[nextStage].title} →
              </Link>
            )}
        </div>
      </div>
    </main>
  );
}