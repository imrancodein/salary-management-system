import StatCard from "../common/StatCard";

const AttendanceCards = ({ attendance }) => {
  const presentCount = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const halfDayCount = attendance.filter(
    (item) => item.status === "Half Day"
  ).length;

  const totalDays = attendance.length;

  return (
   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

      <StatCard
        title="Present"
        value={presentCount}
        color="bg-green-500"
      />

      <StatCard
        title="Absent"
        value={absentCount}
        color="bg-red-500"
      />

      <StatCard
        title="Half Day"
        value={halfDayCount}
        color="bg-yellow-500"
      />

      <StatCard
        title="Total Days"
        value={totalDays}
        color="bg-blue-600"
      />

    </div>
  );
};

export default AttendanceCards;