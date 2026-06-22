"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function TestAuthPage() {
  const [result, setResult] = useState("");

  async function checkUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    setResult(
      JSON.stringify(
        {
          user,
          error,
        },
        null,
        2
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        Auth Test
      </h1>

      <button
        onClick={checkUser}
        className="bg-green-700 hover:bg-green-600 px-6 py-3 rounded-lg mb-6"
      >
        Check User
      </button>

      <pre className="bg-slate-800 p-4 rounded-lg overflow-auto">
        {result}
      </pre>
    </main>
  );
}