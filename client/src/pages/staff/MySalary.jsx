import { useEffect, useState } from "react";
import { getMySalary } from "../../services/salary.service";
import StaffLayout from "../../layouts/StaffLayout";
// import SalaryViewModal from "../../components/salary/SalaryViewModal;
import SalaryViewModal from "../../components/salary/SalaryViewModal"
import downloadSalarySlip from "../../utils/downloadSalarySlip";
import SalaryFilter from "../../components/common/SalaryFilter";
const MySalary = () => {
  const [salary, setSalary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
const [selectedSalary, setSelectedSalary] = useState(null);
const [month, setMonth] = useState("");
const [year, setYear] = useState("");

  useEffect(() => {
    loadSalary();
  }, []);

  const loadSalary = async () => {
    try {
      const response = await getMySalary();
      setSalary(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handle view 
  const handleView = (salary) => {
  setSelectedSalary(salary);
  setOpen(true);
};

const handleDownload = (salary) => {
  downloadSalarySlip(salary);
};
// filtersalary
const filteredSalary = salary.filter((item) => {
  return (
    (month === "" || item.month === month) &&
    (year === "" || String(item.year) === year)
  );
});

  return (
    <StaffLayout>
      <div className="p-4 md:p-6">

        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          My Salary
        </h1>

        {/* search filter */}
        <SalaryFilter
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          onReset={() => {
            setMonth("");
            setYear("");
          }}
        />

        {loading ? (
          <div className="text-center py-10 text-lg font-medium">
            Loading...
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">

          
            <div className="bg-white rounded-xl shadow-md p-4">

   {/* Desktop Table */}
  <div className="hidden lg:block overflow-x-auto">

    <table className="w-full border-collapse">

      <thead className="bg-gray-100">

        <tr>

          <th className="px-4 py-3 text-left">Month</th>
          <th className="px-4 py-3 text-left">Year</th>
          <th className="px-4 py-3 text-left">Net Salary</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-left">Payment Date</th>
          <th className="px-4 py-3 text-center">Action</th>

        </tr>

      </thead>

      <tbody>

        {salary.length > 0 ? (

          filteredSalary.map((item) => (

            <tr
              key={item._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-4 py-4">{item.month}</td>

              <td className="px-4 py-4">{item.year}</td>

              <td className="px-4 py-4 font-semibold">
                ₹ {item.netSalary}
              </td>

              <td className="px-4 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>

              </td>

              <td className="px-4 py-4">
                {item.paymentDate
                  ? new Date(item.paymentDate).toLocaleDateString("en-IN")
                  : "-"}
              </td>

              <td className="px-4 py-4">

                <div className="flex justify-center gap-2">

                <button
                onClick={() => handleView(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                View
              </button>

                  <button
                  onClick={() => handleDownload(item)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Download
                </button>

                </div>

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td
              colSpan={6}
              className="text-center py-8"
            >
              No Salary Found
            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

  {/* Mobile Card */}
  <div className="lg:hidden space-y-4">

    {salary.length > 0 ? (

      filteredSalary.map((item) => (

        <div
          key={item._id}
          className="border rounded-xl p-4 shadow-sm bg-white"
        >

          <div className="flex justify-between">

            <h2 className="font-bold text-lg">
              {item.month} {item.year}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.status}
            </span>

          </div>

          <div className="mt-4 space-y-2 text-sm">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Net Salary
              </span>

              <span className="font-semibold">
                ₹ {item.netSalary}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Payment Date
              </span>

              <span>
                {item.paymentDate
                  ? new Date(item.paymentDate).toLocaleDateString("en-IN")
                  : "-"}
              </span>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">

            <button
              onClick={() => handleView(item)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              View
            </button>

            <button
              onClick={() => handleDownload(item)}
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Download
            </button>

          </div>

        </div>

      ))

    ) : (

      <div className="text-center py-8">
        No Salary Found
      </div>

    )}

  </div>

</div>

          </div>
        )}

      </div>
      <SalaryViewModal
        open={open}
        setOpen={setOpen}
        salary={selectedSalary}
      />
    </StaffLayout>
  );
};

export default MySalary;