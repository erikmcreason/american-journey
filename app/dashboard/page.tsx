"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { stageData } from "@/app/data/stages";
import { supabase } from "@/app/lib/supabase";

export default function DashboardPage() {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: progressRows, error } =
        await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const stageKeys = Object.keys(stageData);

      let totalCompleted = 0;
      let totalTasks = 0;

      const stages = stageKeys.map((stageKey) => {
        const stage = stageData[stageKey];

        const completedTasks = Array.from(
          new Set(
            progressRows
              ?.filter(
                (row) =>
                  row.stage_key === stageKey &&
                  row.completed
              )
              .map((row) => row.task_name) || []
          )
        ).length;

        totalCompleted += completedTasks;
        totalTasks += stage.tasks.length;

        const progress = Math.round(
          (completedTasks / stage.tasks.length) * 100
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
          description: stage.description,
          progress,
          status,
          completedTasks,
          totalTasks: stage.tasks.length,
        };
      });

      const stagesWithUnlocks = stages.map(
        (stage, index) => {
          if (index === 0) {
            return {
              ...stage,
              unlocked: true,
            };
          }

          const previousStage =
            stages[index - 1];

          return {
            ...stage,
            unlocked:
              previousStage.progress === 100,
          };
        }
      );

      const overallProgress = Math.round(
        (totalCompleted / totalTasks) * 100
      );

      setProgressData([
        {
          overallProgress,
          totalCompleted,
          totalTasks,
          isSummary: true,
        },
        ...stagesWithUnlocks,
      ]);

      setLoading(false);
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-900 text-white p-8">
        <h1 className="text-4xl font-bold">
          Loading Dashboard...
        </h1>
      </main>
    );
  }

  const summary = progressData[0];
  const stages = progressData.slice(1);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        American Journey Dashboard
      </h1>

      <div className="bg-slate-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Overall Progress
        </h2>

        <div className="w-full bg-slate-700 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${summary?.overallProgress || 0}%`,
            }}
          />
        </div>

        <p className="mt-3">
          {summary?.overallProgress || 0}% Complete
        </p>

        <p className="text-slate-400">
          {summary?.totalCompleted || 0} /{" "}
          {summary?.totalTasks || 0} Tasks Completed
        </p>
      </div>

      <div className="grid gap-4">
        {stages.map((stage: any) => {
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
                {stage.progress}% Complete
              </p>

              <p className="text-slate-400 text-sm mt-1">
                {stage.completedTasks} / {stage.totalTasks} Tasks Complete
              </p>
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
    </main>
  );
}