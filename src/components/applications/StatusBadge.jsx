const StatusBadge = ({ status }) => {
  const styles = {
    applied: "bg-blue-100 text-blue-700",
    interviewing: "bg-amber-100 text-amber-700",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-5 py-2 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
