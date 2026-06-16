const stages = [
  { name: "Arrival", status: "Completed", progress: 100 },
  { name: "Foundation", status: "In Progress", progress: 45 },
  { name: "Work", status: "Not Started", progress: 0 },
  { name: "Citizenship", status: "Not Started", progress: 0 },
  { name: "Leadership", status: "Not Started", progress: 0 },
  { name: "Legacy", status: "Not Started", progress: 0 },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        American Journey Dashboard
      </h1>

      <div className="grid gap-4">
        {stages.map((stage) => (
          <div
            key={stage.name}
            className="bg-slate-800 rounded-xl p-6"
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
          </div>
        ))}
      </div>
    </main>
  );
}