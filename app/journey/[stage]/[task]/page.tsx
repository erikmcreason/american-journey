"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { stageData, Task } from "@/app/data/stages";
import { supabase } from "@/app/lib/supabase";

function getCompletedTaskIds(
  rows: any[] | null | undefined,
  tasks: Task[]
) {
  const completedRows =
    rows?.filter((row) => row.completed) || [];

  return tasks
    .filter((task) =>
      completedRows.some(
        (row) => row.task_name === task.id
      )
    )
    .map((task) => task.id);
}

export default function TaskPage() {
  const params = useParams();
  const stage = params.stage as string;
  const task = params.task as string;

  const currentStage = stageData[stage];
  const currentTask =
    currentStage?.tasks.find(
      (stageTask) => stageTask.id === task
    ) || null;

  const stageKeys = Object.keys(stageData);
  const currentIndex = stageKeys.indexOf(stage);

  const previousStage =
    currentIndex > 0
      ? stageKeys[currentIndex - 1]
      : null;

  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    async function loadTaskProgress() {
      setAuthChecked(false);
      setCompletedTasks([]);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUserId(null);
        setUnlocked(false);
        setAuthChecked(true);
        return;
      }

      setUserId(user.id);

      if (!currentStage || !currentTask) {
        setUnlocked(false);
        setAuthChecked(true);
        return;
      }

      if (currentIndex === 0) {
        setUnlocked(true);
      } else if (previousStage) {
        const { data: previousData, error: previousError } =
          await supabase
            .from("user_progress")
            .select("*")
            .eq("user_id", user.id)
            .eq("stage_key", previousStage)
            .eq("completed", true);

        if (previousError) {
          console.error(previousError);
          setUnlocked(false);
          setAuthChecked(true);
          return;
        }

        const previousCompletedTaskIds =
          getCompletedTaskIds(
            previousData,
            stageData[previousStage].tasks
          );

        const previousProgress =
          previousCompletedTaskIds.length ===
          stageData[previousStage].tasks.length;

        setUnlocked(previousProgress);

        if (!previousProgress) {
          setAuthChecked(true);
          return;
        }
      }

      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("stage_key", stage)
        .eq("completed", true);

      if (error) {
        console.error(error);
        setAuthChecked(true);
        return;
      }

      const completedTaskIds =
        getCompletedTaskIds(data, currentStage.tasks);

      setCompletedTasks(completedTaskIds);
      setAuthChecked(true);
    }

    loadTaskProgress();
  }, [stage, task]);

  if (!currentStage || !currentTask) {
    return (
      <main className="min-h-screen bg-slate-900 text-white p-8">
        <h1 className="text-4xl font-bold">
          Task Not Found
        </h1>

        <Link
          href="/journey"
          className="text-blue-300 underline block mt-6"
        >
          Return to Journey
        </Link>
      </main>
    );
  }

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-slate-900 text-white p-8">
        <h1 className="text-4xl font-bold">
          Loading Task...
        </h1>
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="min-h-screen bg-slate-900 text-white p-8">
        <h1 className="text-5xl font-bold mb-6">
          Login Required
        </h1>

        <p className="mb-6">
          Sign in before accessing your journey progress.
        </p>

        <Link
          href="/login"
          className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          Go to Login
        </Link>
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
          Complete the previous stage before accessing this task.
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

  async function toggleTaskCompletion() {
    if (!userId || !currentTask) {
      return;
    }

    const alreadyCompleted =
      completedTasks.includes(currentTask.id);

    if (alreadyCompleted) {
      const { error } = await supabase
        .from("user_progress")
        .delete()
        .eq("user_id", userId)
        .eq("stage_key", stage)
        .eq("task_name", currentTask.id);

      if (error) {
        console.error(error);
        return;
      }

      setCompletedTasks(
        completedTasks.filter(
          (taskId) => taskId !== currentTask.id
        )
      );
    } else {
      const { error } = await supabase
        .from("user_progress")
        .insert([
          {
            user_id: userId,
            stage_key: stage,
            task_name: currentTask.id,
            completed: true,
          },
        ]);

      if (error) {
        console.error(error);
        return;
      }

      setCompletedTasks([
        ...completedTasks,
        currentTask.id,
      ]);
    }
  }

  const currentTaskIndex =
    currentStage.tasks.findIndex(
      (stageTask) => stageTask.id === currentTask.id
    );

  const previousTask =
    currentTaskIndex > 0
      ? currentStage.tasks[currentTaskIndex - 1]
      : null;

  const nextTask =
    currentTaskIndex < currentStage.tasks.length - 1
      ? currentStage.tasks[currentTaskIndex + 1]
      : null;

  const completed =
    completedTasks.includes(currentTask.id);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <Link
        href={`/journey/${stage}`}
        className="text-blue-300 underline"
      >
        Back to {currentStage.title}
      </Link>

      <div className="mt-8 bg-slate-800 rounded-xl p-6 mb-6">
        <p className="text-slate-400 mb-2">
          {currentStage.title}
        </p>

        <h1 className="text-5xl font-bold mb-4">
          {currentTask.title}
        </h1>

        <p className="text-slate-300 mb-4">
          {currentTask.description}
        </p>

        <div className="grid gap-3 md:grid-cols-3 mb-6">
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-400 text-sm">
              Estimated Time
            </p>
            <p className="font-semibold">
              {currentTask.estimatedMinutes} minutes
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-400 text-sm">
              Readiness Category
            </p>
            <p className="font-semibold">
              {currentTask.readinessCategory}
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-400 text-sm">
              Readiness Points
            </p>
            <p className="font-semibold">
              +{currentTask.readinessPoints}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            Task Content
          </h2>

          <p className="text-slate-300">
            {currentTask.content ||
              "Task content will be added here as the curriculum expands."}
          </p>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            Resources
          </h2>

          {currentTask.resources.length > 0 ? (
            <ul className="list-disc pl-6 text-slate-300">
              {currentTask.resources.map((resource) => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-300">
              No resources added yet.
            </p>
          )}
        </div>

        <div className="bg-slate-900 rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            Assessment
          </h2>

          <p className="text-slate-300">
            {currentTask.assessment ||
              "No assessment attached to this task yet."}
          </p>
        </div>

        <button
          onClick={toggleTaskCompletion}
          className={`px-5 py-3 rounded-lg ${
            completed
              ? "bg-slate-700 hover:bg-slate-600"
              : "bg-green-700 hover:bg-green-600"
          }`}
        >
          {completed ? "Mark Task Incomplete" : "Complete Task"}
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <div>
          {previousTask && (
            <Link
              href={`/journey/${stage}/${previousTask.id}`}
              className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
            >
              ← {previousTask.title}
            </Link>
          )}
        </div>

        <div>
          {nextTask && (
            <Link
              href={`/journey/${stage}/${nextTask.id}`}
              className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg"
            >
              {nextTask.title} →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}