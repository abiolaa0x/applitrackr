import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import AppLayout from "../components/layouts/AppLayout";
import StatusBadge from "../components/applications/StatusBadge";
import Modal from "../components/ui/Modal";
import ApplicationForm from "../components/applications/ApplicationForm";

import { useApplicationStore } from "../store/useApplicationStore";
import { formatDate } from "../utils/formatDate";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getApplicationById = useApplicationStore(
    (state) => state.getApplicationById,
  );
  const deleteApplication = useApplicationStore(
    (state) => state.deleteApplication,
  );
  const updateApplication = useApplicationStore(
    (state) => state.updateApplication,
  );

  const application = getApplicationById(id);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newUpdate, setNewUpdate] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (!application) {
    return (
      <AppLayout hideSidebar>
        <div className="p-8">
          <p className="text-slate-500">Application not found.</p>
        </div>
      </AppLayout>
    );
  }

  const handleAddUpdate = () => {
    if (!newUpdate.trim()) return;

    const updatedApp = {
      ...application,
      updates: [
        ...(application.updates || []),
        {
          id: crypto.randomUUID(),
          content: newUpdate,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    updateApplication(application.id, updatedApp);
    setNewUpdate("");
  };

  const handleDelete = () => {
    deleteApplication(application.id);
    navigate("/applications");
  };

  const avatarLetter = application.company.charAt(0).toUpperCase();
  const daysSinceApplied = Math.floor(
    (new Date() - new Date(application.appliedDate)) / (1000 * 60 * 60 * 24),
  );

  return (
    <AppLayout hideSidebar>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/applications")}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg shadow-xs text-sm font-medium text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all duration-200"
        >
          <span className="text-indigo-600 text-base">←</span>
          Back to Applications
        </button>

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-34 h-34 rounded-[10px] bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-semibold">
                {avatarLetter}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {application.company}
                </h2>

                <p className="text-slate-500 mt-1">
                  {application.role} •{" "}
                  {application.jobType.charAt(0).toUpperCase() +
                    application.jobType.slice(1)}
                  {application.location && ` • ${application.location}`}
                </p>

                {application.salary && (
                  <p className="text-sm text-slate-400 mt-1">
                    Salary: {application.salary}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-4">
                  <div className="relative inline-block">
                    <select
                      value={application.status}
                      onChange={(e) =>
                        updateApplication(application.id, {
                          ...application,
                          status: e.target.value,
                        })
                      }
                      className="appearance-none text-sm font-medium pl-4 pr-9 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all duration-150 hover:border-indigo-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 cursor-pointer"
                    >
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    {/* Custom Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg
                        className="w-3.5 h-3.5 text-slate-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <span className="text-sm text-slate-400">
                    Applied on {formatDate(application.appliedDate)}
                  </span>
                  <span className="text-xs text-slate-400">
                    {daysSinceApplied} days ago
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsEditOpen(true)}
                className="text-slate-500 hover:text-indigo-600 transition"
              >
                ✏️
              </button>

              <button
                onClick={() => setIsDeleteOpen(true)}
                className="text-slate-500 hover:text-red-600 transition"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        {/* Add Update */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Add Update</h3>

          <textarea
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            rows={3}
            placeholder="Write an update about this application..."
            className="w-full border border-slate-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddUpdate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Add Update
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-6">Activity</h3>

          {application.updates && application.updates.length > 0 ?
            <div className="space-y-6">
              {application.updates.map((update) => (
                <div key={update.id} className="relative pl-6">
                  <p className="text-slate-700 text-sm">{update.content}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatDate(update.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          : <p className="text-sm text-slate-400">No activity yet.</p>}
        </div>

        {/* Quick Links */}
        {application.jobUrl && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 text-sm hover:underline"
            >
              View Job Posting
            </a>
          </div>
        )}

        <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
          <ApplicationForm
            mode="edit"
            application={application}
            onClose={() => setIsEditOpen(false)}
          />
        </Modal>

        {/* DELETE MODAL (Styled Like Screenshot) */}
        <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
          {" "}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M10.29 3.86l-7.39 12.8A1 1 0 003.76 18h16.48a1 1 0 00.86-1.34l-7.39-12.8a1 1 0 00-1.72 0z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Delete Application?
            </h2>

            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              This action cannot be undone. This will permanently delete the
              application for{" "}
              <span className="font-semibold text-slate-800">
                {application.role}
              </span>{" "}
              and remove all associated data.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-6 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-6 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
};

export default ApplicationDetails;
