import { useNavigate } from "react-router-dom";
import { getBoardStatusMeta } from "../../utils/getBoardStatusMeta";

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  const { borderAccent } = getBoardStatusMeta(application.status);
  const avatarLetter = application.company.charAt(0).toUpperCase();
  const daysSinceApplied = Math.floor(
    (new Date() - new Date(application.appliedDate)) / (1000 * 60 * 60 * 24),
  );
  return (
    <div
      onClick={() => navigate(`/applications/${application.id}`)}
      className={`
  bg-white
  rounded-xl
  border-t-white border-r-white border-b-white
  border-l-4 ${borderAccent}
  p-5
  shadow-sm
  hover:shadow-md
  transition-all duration-200
  cursor-pointer
`}
    >
      {/* Top Row */}
      <div className="flex items-center gap-8 mb-6">
        <div className="w-24 h-24 rounded-[10px] bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl font-semibold">
          {avatarLetter}
        </div>

        <div>
          {/* Role */}
          <h4 className="text-sm font-semibold text-slate-800">
            {application.role}
          </h4>

          {/* Company */}
          <p className="text-sm text-slate-500 mt-1">{application.company}</p>
        </div>
      </div>

      {/* Tags Row */}
      <div className="flex items-center justify-between mt-3 flex-wrap">
        <div className="gap-5">
          {application.jobType && (
            <span className="text-xs px-2 py-1 rounded-md bg-indigo-50 text-indigo-600">
              {application.jobType.charAt(0).toUpperCase() +
                application.jobType.slice(1)}
            </span>
          )}
          {application.salary && (
            <span className="text-xs text-slate-500">
              {" "}
              • {application.salary}
            </span>
          )}
        </div>

        <span className="text-xs text-slate-400">
          {daysSinceApplied} days ago
        </span>
      </div>
    </div>
  );
};

export default ApplicationCard;
