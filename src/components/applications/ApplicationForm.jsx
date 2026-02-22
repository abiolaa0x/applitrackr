import { useState } from "react";
import { useApplicationStore } from "../../store/useApplicationStore";
const ApplicationForm = ({ onClose }) => {
  const addApplication = useApplicationStore((state) => state.addApplication);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company || !role || !appliedDate) return;

    addApplication({
      company,
      role,
      status,
      appliedDate,
      link,
    });

    if (onClose) onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Add Application
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Keep track of your new job opportunity.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Corp"
            required
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Senior Frontend Engineer"
            required
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Application Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="appliedDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Applied Date
          </label>
          <input
            id="appliedDate"
            name="appliedDate"
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            required
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Link */}
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Link (Optional)
          </label>
          <input
            id="link"
            name="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md transition"
          >
            Add Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
