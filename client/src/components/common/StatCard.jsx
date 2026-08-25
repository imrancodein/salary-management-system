const StatCard = ({
  title,
  value,
  color = "bg-blue-600",
}) => {
  return (
    <div
      className={`${color} text-white rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300`}
    >
      <p className="text-sm opacity-90 ">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;