import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import StatusBadge from "../components/applications/StatusBadge";
import { useApplicationStore } from "../store/useApplicationStore";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const application = useApplicationStore((state) =>
    state.applications.find((app) => app.id === id),
  );

  if (!application) {
    return (
      <AppLayout>
        <div className="p-8">
          <h2 className="text-xl font-semibold text-slate-800">
            Application not found
          </h2>
          <button
            onClick={() => navigate("/applications")}
            className="mt-4 text-indigo-600 hover:underline"
          >
            Go back
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-8 max-w-3xl">
        <button
          onClick={() => navigate("/applications")}
          className="text-sm text-slate-500 hover:text-slate-700 mb-6"
        >
          ← Back to Applications
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {application.role}
              </h1>
              <p className="text-slate-500">{application.company}</p>
            </div>

            <StatusBadge status={application.status} />
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Applied Date</p>
              <p className="text-slate-800 font-medium">
                {application.appliedDate}
              </p>
            </div>

            <div>
              <p className="text-slate-500 mb-1">Created</p>
              <p className="text-slate-800 font-medium">
                {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-slate-500 mb-1">Last Updated</p>
              <p className="text-slate-800 font-medium">
                {new Date(application.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {application.link && (
              <div>
                <p className="text-slate-500 mb-1">Job Link</p>
                <a
                  href={application.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View Posting
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ApplicationDetails;
