import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Modal from "../components/ui/Modal";
import ApplicationForm from "../components/applications/ApplicationForm";
import StatusBadge from "../components/applications/StatusBadge";

import { useApplicationStore } from "../store/useApplicationStore";

const Applications = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const applications = useApplicationStore((state) => state.applications);
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="p-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Applications</h1>
            <p className="text-slate-500 mt-1">
              Manage and track your job search progress.
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md font-medium shadow-sm transition"
          >
            + Add Application
          </button>
        </div>

        {/* FILTER + SEARCH */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition">
              Status
            </button>

            <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition">
              Source
            </button>

            <button className="text-sm text-slate-500 hover:text-slate-700 transition">
              Clear all
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search applications..."
              className="w-72 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-slate-200 mb-6"></div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
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
              {applications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  className="hover:bg-slate-50 transition cursor-pointer"
                >
                  <td className="px-10 py-8 font-medium text-slate-800">
                    {app.company}
                  </td>

                  <td className="px-10 py-8 text-slate-600">{app.role}</td>

                  <td className="px-10 py-8">
                    <StatusBadge status={app.status} />
                  </td>

                  <td className="px-10 py-8 text-slate-500">
                    {app.appliedDate}
                  </td>

                  <td
                    className="px-10 py-8 text-right text-slate-400"
                    onClick={(e) => e.stopPropagation()}
                  >
                    •••
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* FOOTER */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50">
            <p className="text-sm text-slate-500">
              Showing {applications.length} results
            </p>

            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-500 hover:bg-white transition">
                Previous
              </button>
              <button className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-500 hover:bg-white transition">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
          <ApplicationForm onClose={() => setIsAddOpen(false)} />
        </Modal>
      </div>
    </AppLayout>
  );
};

export default Applications;
