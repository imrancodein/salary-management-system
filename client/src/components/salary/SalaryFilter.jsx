const SalaryFilter = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search Employee..."
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Month */}
        <select
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Month</option>

          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>

        </select>

        {/* Year */}
        <select
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Year</option>

          <option>2026</option>
          <option>2027</option>
          <option>2028</option>

        </select>

        {/* Status */}
        <select
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>

          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>

        </select>

      </div>

    </div>
  );
};

export default SalaryFilter;