import AppLayout from "../components/layouts/AppLayout";
import { useApplicationStore } from "../store/useApplicationStore";
import { formatDate } from "../utils/formatDate";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const FollowUps = () => {
  const navigate = useNavigate();
  const applications = useApplicationStore((state) => state.applications);

  // Applications that need follow-up (7+ days stale)
  const followUps = useMemo(() => {
    const today = new Date();

    return applications.filter((app) => {
      // No updates at all → needs follow-up
      if (!app.updates || app.updates.length === 0) return true;

      const latestUpdate = [...app.updates].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )[0];

      const diff =
        (today - new Date(latestUpdate.createdAt)) /
        (1000 * 60 * 60 * 24);

      return diff >= 7;
    });
  }, [applications]);

  return (
    <AppLayout>
      <div className="p-8 h-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Follow-up Reminders
          </h1>
          <p className="text-slate-500 mt-1">
            Applications that haven't had a status change or contact in 7+ days.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {followUps.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              No follow-ups needed right now.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-8 py-6 text-left">Company</th>
                  <th className="px-8 py-6 text-left">Role</th>
                  <th className="px-8 py-6 text-left">Status</th>
                  <th className="px-8 py-6 text-left">Applied Date</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {followUps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => navigate(`/applications/${app.id}`)}
                    className="border-t border-slate-100 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <td className="px-8 py-6 font-medium text-slate-800">
                      {app.company}
                    </td>

                    <td className="px-8 py-6 text-slate-600">
                      {app.role}
                    </td>

                    <td className="px-8 py-6">
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
                        {app.status}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-slate-500">
                      {formatDate(app.appliedDate)}
                    </td>

                    <td className="px-8 py-6 text-right text-indigo-600 hover:underline">
                      View
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default FollowUps;