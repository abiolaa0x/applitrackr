import { useState } from "react";
import { useApplicationStore } from "../../store/useApplicationStore";

const ApplicationForm = ({ mode = "create", application = null, onClose }) => {
  const addApplication = useApplicationStore((state) => state.addApplication);
  const updateApplication = useApplicationStore(
    (state) => state.updateApplication,
  );

  const isEditMode = mode === "edit";

  const [formData, setFormData] = useState({
    company: application?.company || "",
    role: application?.role || "",
    status: application?.status || "applied",
    appliedDate: application?.appliedDate || "",
    jobType: application?.jobType || "full-time",
    jobUrl: application?.jobUrl || "",
    location: application?.location || "",
    salary: application?.salary || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company || !formData.role || !formData.appliedDate) return;

    if (isEditMode) {
      updateApplication(application.id, formData);
    } else {
      addApplication(formData);
    }

    if (onClose) onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        {isEditMode ? "Edit Application" : "Add Application"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {isEditMode ?
          "Update your job application details."
        : "Keep track of your new job opportunity."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Status
          </label>
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="
      appearance-none
      w-full
      pl-4 pr-10 py-2.5
      rounded-md
      border border-slate-200
      bg-white
      text-sm text-slate-700
      shadow-sm
      transition-all duration-150
      hover:border-indigo-300
      focus:outline-none
      focus:ring-2 focus:ring-indigo-500/40
      focus:border-indigo-400
      cursor-pointer
    "
            >
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>

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
        </div>

        {/* Applied Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Applied Date
          </label>
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <div className="relative">
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="
      appearance-none
      w-full
      pl-4 pr-10 py-2.5
      rounded-md
      border border-slate-200
      bg-white
      text-sm text-slate-700
      shadow-sm
      transition-all duration-150
      hover:border-indigo-300
      focus:outline-none
      focus:ring-2 focus:ring-indigo-500/40
      focus:border-indigo-400
      cursor-pointer
    "
            >
              <option value="full-time">Full-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>

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
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. London, Remote"
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary (Optional)
          </label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. $120,000 / £70k"
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Job URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Link (Optional)
          </label>
          <input
            type="url"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-slate-300 py-3 rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md transition"
          >
            {isEditMode ? "Update Application" : "Add Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
