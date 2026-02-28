import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-indigo-50/40 to-white text-slate-800">
      {/* NAVBAR */}
      <div className="flex items-center justify-between px-10 py-6 ">
        <h1 className="text-2xl font-semibold">applitrackr.</h1>

        <button
          onClick={() => navigate("/applications")}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
        >
          Open App
        </button>
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-10 pt-24 pb-16 text-center">
        <h2 className="text-5xl font-bold leading-tight mb-6">
          Organize Your Job Search.
          <br />
          <span className="text-indigo-600">Land Your Next Role Faster.</span>
        </h2>

        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
          Track every application, monitor your progress, and stay on top of
          interviews — all in one clean, distraction‑free dashboard.
        </p>

        <button
          onClick={() => navigate("/applications")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-sm transition"
        >
          Get Started
        </button>

        {/* DASHBOARD MOCKUP */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-5xl rounded-2xl border border-slate-200 shadow-2xl bg-white overflow-hidden">
            {/* Fake top bar */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>

            {/* Fake dashboard content */}
            <div className="p-8 space-y-6 text-left">
              <div className="h-6 w-40 bg-slate-200 rounded"></div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="h-4 w-20 bg-indigo-200 rounded-full"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-4 w-36 bg-slate-200 rounded"></div>
                  <div className="h-4 w-24 bg-green-200 rounded-full"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-4 w-28 bg-slate-200 rounded"></div>
                  <div className="h-4 w-20 bg-red-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-semibold mb-4">
              Everything You Need to Stay Organized
            </h3>
            <p className="text-slate-500">
              Designed to simplify and streamline your job hunt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              title="Track Applications"
              description="Log every job you apply to with company, role, salary, and status — all in one place."
            />
            <FeatureCard
              title="Monitor Progress"
              description="Move applications from applied to interview, offer, or rejected with clean status updates."
            />
            <FeatureCard
              title="Stay Focused"
              description="Search, filter, and manage everything without messy spreadsheets."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center">
        <h3 className="text-3xl font-semibold mb-6">
          Ready to take control of your job search?
        </h3>

        <button
          onClick={() => navigate("/applications")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-sm transition"
        >
          Start Tracking Today
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} <span className="font-bold text-slate-600">applitrackr.</span> Built for modern job seekers.
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
      <h4 className="text-lg font-semibold mb-3">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default Landing;