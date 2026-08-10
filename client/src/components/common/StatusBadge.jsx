const StatusBadge = ({
  status,
  presentText = "Present",
  absentText = "Absent",
  halfDayText = "Half Day",
}) => {
  const getStyle = () => {
    switch (status) {
      case presentText:
        return "bg-green-100 text-green-700";

      case absentText:
        return "bg-red-100 text-red-700";

      case halfDayText:
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStyle()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;