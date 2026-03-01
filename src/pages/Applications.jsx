import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Modal from "../components/ui/Modal";
import ApplicationForm from "../components/applications/ApplicationForm";
import StatusBadge from "../components/applications/StatusBadge";

import { useApplicationStore } from "../store/useApplicationStore";
import { formatDate } from "../utils/formatDate";
import { formatStatusLabel } from "../utils/formatStatus";

const Applications = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const applications = useApplicationStore((state) => state.applications);
  const deleteApplication = useApplicationStore(
    (state) => state.deleteApplication,
  );

  const navigate = useNavigate();

  const uniqueStatuses = [...new Set(applications.map((app) => app.status))];

  const filteredApplications = applications.filter((app) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      app.company.toLowerCase().includes(term) ||
      app.role.toLowerCase().includes(term) ||
      app.status.toLowerCase().includes(term);

    const matchesStatus = selectedStatus ? app.status === selectedStatus : true;

    return matchesSearch && matchesStatus;
  });

  const isEmpty = applications.length === 0;
  const isSearchEmpty =
    filteredApplications.length === 0 &&
    (searchTerm.length > 0 || selectedStatus);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("");
  };

  const handleDelete = () => {
    deleteApplication(deleteTarget.id);
    setDeleteTarget(null);
    setOpenDropdownId(null);
  };

  return (
    <AppLayout>
      <div className="p-8 h-full">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Applications</h1>
            <p className="text-slate-500 mt-1">
              Manage and track your job search progress.
            </p>
          </div>

          {!isEmpty && (
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md font-medium shadow-sm transition"
            >
              + Add Application
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {isEmpty ?
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="border border-slate-200 rounded-lg shadow-lg px-10 py-12 max-w-md w-full">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">
                You don’t have any applications yet
              </h2>

              <p className="text-slate-500 mb-6 text-sm">
                Start tracking your job search by adding your first application.
              </p>

              <button
                onClick={() => setIsAddOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md font-medium shadow-sm transition"
              >
                Create Application
              </button>
            </div>
          </div>
        : <>
            {/* FILTER + SEARCH */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative inline-block">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="
      appearance-none
      text-sm font-medium
      pl-4 pr-12 py-2
      rounded-md
      border border-slate-200
      bg-white
      text-slate-700
      shadow-sm
      transition-all duration-150
      hover:border-indigo-300
      hover:shadow
      focus:outline-none
      focus:ring-2 focus:ring-indigo-500/40
      focus:border-indigo-400
      cursor-pointer
    "
                  >
                    <option value="">All Status</option>
                    {uniqueStatuses.map((status) => (
                      <option key={status} value={status}>
                        {formatStatusLabel(status)}
                      </option>
                    ))}
                  </select>

                  {/* Custom Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-8 h-8 text-slate-400"
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

                {(searchTerm.length > 0 || selectedStatus !== "") && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-slate-500 hover:text-slate-700 transition"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-72 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute left-3 top-2.5 text-slate-400">
                  🔍
                </span>
              </div>
            </div>

            {/* NO RESULTS */}
            {isSearchEmpty ?
              <div className="text-center py-16 text-slate-500">
                No applications match your filters.
              </div>
            : <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
                    <tr>
                      <th className="px-8 py-6">Company</th>
                      <th className="px-8 py-6">Role</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6">Applied Date</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        onClick={() => navigate(`/applications/${app.id}`)}
                        className="hover:bg-slate-50 transition cursor-pointer relative"
                      >
                        <td className="px-10 py-8 font-medium text-slate-800">
                          {app.company}
                        </td>

                        <td className="px-10 py-8 text-slate-600">
                          {app.role}
                        </td>

                        <td className="px-10 py-8">
                          <StatusBadge status={app.status} />
                        </td>

                        <td className="px-10 py-8 text-slate-500">
                          {formatDate(app.appliedDate)}
                        </td>

                        <td
                          className="px-10 py-8 text-right text-slate-400 relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() =>
                              setOpenDropdownId(
                                openDropdownId === app.id ? null : app.id,
                              )
                            }
                            className="hover:text-slate-600"
                          >
                            •••
                          </button>

                          {openDropdownId === app.id && (
                            <div className="absolute right-10 mt-2 w-32 bg-white border border-slate-200 rounded-md shadow-md z-10">
                              <button
                                onClick={() =>
                                  navigate(`/applications/${app.id}`)
                                }
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => setDeleteTarget(app)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* FOOTER */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50">
                  <p className="text-sm text-slate-500">
                    Showing {filteredApplications.length} results
                  </p>
                </div>
              </div>
            }
          </>
        }

        {/* ADD MODAL */}
        <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
          <ApplicationForm onClose={() => setIsAddOpen(false)} />
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
          <div className=" bg-white rounded-2xl shadow-xl p-8 text-center">
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
                {deleteTarget?.role}
              </span>{" "}
              and remove all associated data.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
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

export default Applications;
