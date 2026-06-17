"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { stageData } from "@/app/data/stages";

export default function JourneyPage() {
  const [stages, setStages] = useState<any[]>([]);

  useEffect(() => {
    const stageKeys = Object.keys(stageData);

    const calculatedStages = stageKeys.map(
      (stageKey, index) => {
        const stage = stageData[stageKey];

        const savedTasks = localStorage.getItem(
          `american-journey-${stageKey}`
        );

        const completedTasks = savedTasks
          ? JSON.parse(savedTasks).length
          : 0;

        const progress = Math.round(
          (completedTasks / stage.tasks.length) * 100
        );

        let unlocked = false;

        if (index === 0) {
          unlocked = true;
        } else {
          const previousKey =
            stageKeys[index - 1];

          const previousTasks =
            localStorage.getItem(
              `american-journey-${previousKey}`
            );

          const previousCompleted =
            previousTasks
              ? JSON.parse(previousTasks).length
              : 0;

          const previousProgress =
            Math.round(
              (previousCompleted /
                stageData[previousKey].tasks.length) *
                100
            );

          unlocked =
            previousProgress === 100;
        }

        return {
          key: stageKey,
          title: stage.title,
          description: stage.description,
          progress,
          unlocked,
        };
      }
    );

    setStages(calculatedStages);
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-10 text-center">
        The American Journey
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {stages.map((stage) => {
          const card = (
            <div
              className={`p-6 rounded-lg transition ${
                stage.unlocked
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-slate-950 opacity-50"
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">
                {stage.title}
              </h2>

              <p className="mb-4">
                {stage.description}
              </p>

              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${stage.progress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-sm">
                {stage.progress}% Complete
              </p>

              {!stage.unlocked && (
                <p className="text-yellow-400 text-sm mt-2">
                  Locked
                </p>
              )}
            </div>
          );

          if (stage.unlocked) {
            return (
              <Link
                key={stage.key}
                href={`/journey/${stage.key}`}
              >
                {card}
              </Link>
            );
          }

          return (
            <div key={stage.key}>
              {card}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/dashboard"
          className="bg-blue-700 hover:bg-blue-600 px-6 py-3 rounded-lg"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}