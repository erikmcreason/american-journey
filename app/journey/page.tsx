export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-10 text-center">
        The American Journey
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">

        <div className="bg-green-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Arrival</h2>
          <p>Your immigration journey begins.</p>
        </div>

        <div className="bg-blue-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Foundation</h2>
          <p>Learn language, culture, and essential life skills.</p>
        </div>

        <div className="bg-yellow-600 p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Opportunity</h2>
          <p>Career development, education, and financial growth.</p>
        </div>

        <div className="bg-purple-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Integration</h2>
          <p>Community involvement and civic participation.</p>
        </div>

        <div className="bg-red-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Citizenship</h2>
          <p>Complete the path to becoming a citizen.</p>
        </div>

        <div className="bg-amber-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Legacy</h2>
          <p>Build prosperity for future generations.</p>
        </div>

      </div>
    </main>
  );
}