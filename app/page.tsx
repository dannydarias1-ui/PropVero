export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">
            PropVero
          </h1>

          <p className="text-2xl text-yellow-500 mb-4">
            Real Estate Intelligence
          </p>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-10">
            Discover high-potential investment opportunities across the Dominican Republic
            using advanced analytics, deal scoring, market intelligence, and yield insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-lg">
              Explore Markets
            </button>

            <button className="border border-slate-600 hover:border-yellow-500 px-8 py-4 rounded-lg">
              View Top Deals
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Deal Scores</h2>
            <p className="text-slate-400">
              Identify undervalued properties using our proprietary VeroScore™ methodology.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Market Intelligence</h2>
            <p className="text-slate-400">
              Track pricing trends, liquidity, and market momentum across the DR.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Yield Analytics</h2>
            <p className="text-slate-400">
              Evaluate rental returns and investment performance with confidence.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}