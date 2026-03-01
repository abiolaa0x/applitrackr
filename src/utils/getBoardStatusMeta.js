export const getBoardStatusMeta = (status) => {
  switch (status) {
    case "applied":
      return {
        label: "APPLIED",
        dot: "bg-blue-500",
        borderAccent: "border-blue-400",
        countBg: "bg-blue-100",
        countText: "text-blue-700",
      };

    case "interviewing":
      return {
        label: "INTERVIEWING",
        dot: "bg-amber-500",
        borderAccent: "border-amber-400",
        countBg: "bg-amber-100",
        countText: "text-amber-700",
      };

    case "offer":
      return {
        label: "OFFER",
        dot: "bg-green-500",
        borderAccent: "border-green-500",
        countBg: "bg-green-100",
        countText: "text-green-700",
      };

    case "rejected":
      return {
        label: "REJECTED",
        dot: "bg-red-500",
        borderAccent: "border-red-400",
        countBg: "bg-red-100",
        countText: "text-red-700",
      };

    default:
      return {
        label: status?.toUpperCase(),
        dot: "bg-slate-400",
        borderAccent: "border-slate-300",
        countBg: "bg-slate-100",
        countText: "text-slate-700",
      };
  }
};
