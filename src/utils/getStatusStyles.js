export const getStatusStyles = (status) => {
  switch (status) {
    case "applied":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "interviewing":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "offer":
      return "bg-green-50 text-green-700 border-green-200";
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};