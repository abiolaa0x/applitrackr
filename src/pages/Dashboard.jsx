import AppLayout from "../components/layouts/AppLayout";
import { useApplicationStore } from "../store/useApplicationStore";
import ApplicationCard from "../components/applications/ApplicationCard";
import ApplicationForm from "../components/applications/ApplicationForm";
import Modal from "../components/ui/Modal";

import { getBoardStatusMeta } from "../utils/getBoardStatusMeta";
import { useState } from "react";
const STATUSES = ["applied", "interviewing", "offer", "rejected"];

const Dashboard = () => {
  const applications = useApplicationStore((state) => state.applications);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const grouped = STATUSES.reduce((acc, status) => {
    acc[status] = applications.filter((app) => app.status === status);
    return acc;
  }, {});

  return (
    <AppLayout>
      <div className="bg-slate-50 min-h-screen p-8">
        {/* Empty State */}
        {applications.length === 0 ?
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h1 className="text-3xl font-semibold mb-4">Welcome 👋</h1>
            <p className="text-slate-500 max-w-md mb-8">
              You haven’t added any applications yet.
            </p>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md font-medium shadow-sm transition"
              onClick={() => setIsAddOpen(true)}
            >
              + Add Application
            </button>
          </div>
        : <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">
                Applications Board
              </h1>
              <p className="text-slate-500 mt-1">
                Organize and track your progress
              </p>
            </div>

            {/* Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
              {STATUSES.map((status) => {
                const { label, dot, countBg, countText } =
                  getBoardStatusMeta(status);

                return (
                  <div key={status} className="flex flex-col">
                    {/* Column Header */}
                    <div className="flex items-center gap-8 mb-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${dot}`} />
                        <h3 className="text-xs font-semibold tracking-wider text-slate-600">
                          {label}
                        </h3>
                      </div>

                      <span
                        className={`
              text-xs px-2.5 py-0.5 rounded-full
              ${countBg} ${countText}
            `}
                      >
                        {grouped[status].length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="space-y-4">
                      {grouped[status].map((app) => (
                        <ApplicationCard key={app.id} application={app} />
                      ))}

                      {grouped[status].length === 0 && (
                        <p className="text-xs text-slate-300 ">
                          No applications yet.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        }
        <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
          <ApplicationForm onClose={() => setIsAddOpen(false)} />
        </Modal>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
