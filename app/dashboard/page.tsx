"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { stageData } from "@/app/data/stages";

export default function DashboardPage() {
  const [progressData, setProgressData] = useState<
    {
      name: string;
      progress: number;
      status: string;
      completedTasks: number;
      totalTasks: number;
      unlocked: boolean;
    }[]
  >([]);

  useEffect(() => {
    const stageKeys = Object.keys(stageData);

    const stages = stageKeys.map((stageKey) => {
      const stage = stageData[stageKey];

      const storageKey = `american-journey-${stageKey}`;

      const savedTasks = localStorage.getItem(storageKey);

      const completedTasks = savedTasks
        ? JSON.parse(savedTasks).length
        : 0;

      const totalTasks = stage.tasks.length;

      const progress = Math.round(
        (completedTasks / totalTasks) * 100
      );

      let status = "Not Started";

      if (progress > 0) {
        status = "In Progress";
      }

      if (progress === 100) {
        status = "Completed";
      }

      return {
        key: stageKey,
        name: stage.title,
        progress,
        status,
        completedTasks,
        totalTasks,
      };
    });

    const stagesWithUnlocks = stages.map((stage, index) => {
      if (index === 0) {
        return {
          ...stage,
          unlocked: true,
        };
      }

      const previousStage = stages[index - 1];

      return {
        ...stage,
        unlocked: previousStage.progress === 100,
      };
    });

    setProgressData(stagesWithUnlocks);
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        American Journey Dashboard
      </h1>

      <div className="grid gap-4">
        {progressData.map((stage) => {
          const card = (
            <div
              className={`rounded-xl p-6 transition ${
                stage.unlocked
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-slate-950 opacity-60"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold">
                  {stage.name}
                </h2>

                <span className="text-sm bg-slate-700 px-3 py-1 rounded-full">
                  {stage.unlocked
                    ? stage.status
                    : "Locked"}
                </span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${stage.progress}%`,
                  }}
                />
              </div>

              <p className="text-slate-300 mt-2">
                {stage.progress}% complete
              </p>

              <p className="text-slate-400 text-sm mt-1">
                {stage.completedTasks} / {stage.totalTasks} Tasks Complete
              </p>

              {!stage.unlocked && (
                <p className="text-yellow-400 text-sm mt-3">
                  Complete the previous stage to unlock.
                </p>
              )}
            </div>
          );

          if (stage.unlocked) {
            return (
              <Link
                key={stage.name}
                href={`/journey/${stage.name.toLowerCase()}`}
              >
                {card}
              </Link>
            );
          }

          return (
            <div key={stage.name}>
              {card}
            </div>
          );
        })}
      </div>
    </main>
  );
}