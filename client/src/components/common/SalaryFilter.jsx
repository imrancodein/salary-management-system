const SalaryFilter = ({
  search,
  setSearch,
  month,
  setMonth,
  year,
  setYear,
  onReset,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
            />
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Months</option>

          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Reset
        </button>

      </div>

    </div>
  );
};

export default SalaryFilter;