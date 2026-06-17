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
    }[]
  >([]);

  useEffect(() => {
    const stages = Object.keys(stageData).map((stageKey) => {
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
        name: stage.title,
        progress,
        status,
        completedTasks,
        totalTasks,
      };
    });

    setProgressData(stages);
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        American Journey Dashboard
      </h1>

      <div className="grid gap-4">
        {progressData.map((stage) => (
          <Link
            key={stage.name}
            href={`/journey/${stage.name.toLowerCase()}`}
            className="bg-slate-800 rounded-xl p-6 block hover:bg-slate-700 transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">
                {stage.name}
              </h2>

              <span className="text-sm bg-slate-700 px-3 py-1 rounded-full">
                {stage.status}
              </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${stage.progress}%` }}
              />
            </div>

            <p className="text-slate-300 mt-2">
              {stage.progress}% complete
            </p>

            <p className="text-slate-400 text-sm mt-1">
              {stage.completedTasks} / {stage.totalTasks} Tasks Complete
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}