"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function TestPage() {
  const [result, setResult] = useState("");

  async function saveProgress() {
    const response = await supabase
      .from("user_progress")
      .insert([
        {
          stage_key: "arrival",
          task_name: "Review journey map",
          completed: true,
        },
      ]);

    setResult(
      JSON.stringify(response, null, 2)
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        Save Progress Test
      </h1>

      <button
        onClick={saveProgress}
        className="bg-green-700 hover:bg-green-600 px-6 py-3 rounded-lg mb-6"
      >
        Save Progress
      </button>

      <pre className="bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
        {result}
      </pre>
    </main>
  );
}