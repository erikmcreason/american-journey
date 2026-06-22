"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [result, setResult] =
    useState("");

  async function signIn() {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setResult(
      JSON.stringify(
        {
          data,
          error,
        },
        null,
        2
      )
    );
  }

  async function signOut() {
    const { error } =
      await supabase.auth.signOut();

    setResult(
      JSON.stringify(
        {
          signedOut: true,
          error,
        },
        null,
        2
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Login Test
      </h1>

      <div className="max-w-md space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
        />

        <div className="flex gap-4">
          <button
            onClick={signIn}
            className="bg-green-700 hover:bg-green-600 px-6 py-3 rounded-lg"
          >
            Sign In
          </button>

          <button
            onClick={signOut}
            className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>

      <pre className="bg-slate-800 p-4 rounded-lg overflow-auto mt-8">
        {result}
      </pre>
    </main>
  );
}