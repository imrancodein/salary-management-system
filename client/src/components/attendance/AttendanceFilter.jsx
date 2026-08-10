const AttendanceFilter = ({
  search,
  setSearch,
  month,
  setMonth,
  year,
  setYear,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search Date (23 Jul)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        {/* Month */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">All Months</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>

        {/* Year */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">All Years</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
        </select>

      </div>

    </div>
  );
};

export default AttendanceFilter;