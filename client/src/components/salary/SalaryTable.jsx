import { markSalaryPaid } from "../../services/salary.service";
const SalaryTable = ({
  salaryList,
  loading,
  setOpenModal,
  setSelectedStaff,
  setSelectedSalary,
  setViewModal,
  setPaymentModal,
  setSelectedPaymentSalary,
   month,
  year,
   search,
}) => {
//  handle markpaid

const handleMarkPaid = async (salaryId) => {

  const paymentMode = prompt(
    "Enter Payment Mode (Cash / Bank / UPI / Cheque)"
  );

  if (!paymentMode) return;

  try {

    const response = await markSalaryPaid(
      salaryId,
      paymentMode
    );

    alert(response.message);

    loadSalary();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Payment Failed"
    );

  }

};
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">Employee</th>

            <th className="px-4 py-3 text-left">Department</th>

            <th className="px-4 py-3 text-left">Month</th>

            <th className="px-4 py-3 text-left">Basic Salary</th>

            <th className="px-4 py-3 text-left">Net Salary</th>

            <th className="px-4 py-3 text-left">Status</th>

            <th className="px-4 py-3 text-center">
              Action
            </th>

          </tr>

        </thead>

       
        <tbody>

  {loading ? (

    <tr>
      <td colSpan="7" className="text-center py-8">
        Loading...
      </td>
    </tr>

  ) : salaryList.length === 0 ? (

    <tr>
      <td colSpan="7" className="text-center py-8">
        No Salary Found
      </td>
    </tr>

  ) : (

    
salaryList
  .filter((item) => {
    const matchName =
      search === "" ||
      item.staff?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchMonth =
      month === "" || item.month === month;

    const matchYear =
      year === "" ||
      String(item.year) === String(year);

    return matchName && matchMonth && matchYear;
  })
  .map((item) => (

      <tr
        key={item._id}
        className="border-t hover:bg-gray-50"
      >

        <td className="px-4 py-4">
          {item.staff?.name}
        </td>

        <td className="px-4 py-4">
          {item.staff?.department?.name}
        </td>

        <td className="px-4 py-4">
          {item.month} {item.year}
        </td>

        <td className="px-4 py-4">
          ₹{item.basicSalary}
        </td>

        <td className="px-4 py-4 font-semibold">
          ₹{item.netSalary}
        </td>

        <td className="px-4 py-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.status === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.status}
          </span>
        </td>

        {/* <td className="px-4 py-4">
          <div className="flex justify-center">
         <button
          onClick={() => {
          setSelectedSalary(item);
          setViewModal(true);
        }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            View
          </button>
          </div>
        </td> */}
        <td className="px-4 py-4">

  <div className="flex justify-center gap-2 flex-wrap">

    {/* View */}

    <button
      onClick={() => {
        setSelectedSalary(item);
        setViewModal(true);
      }}
      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
    >
      View
    </button>

    {/* Payment */}

    {item.status === "Unpaid" ? (

      <button
        onClick={() => {
          setSelectedPaymentSalary(item);
          setPaymentModal(true);
        }}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Mark Paid
      </button>

    ) : (

      <button
        disabled
        className="bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
      >
        ✓ Paid
      </button>

    )}

  </div>

</td>

      </tr>

    ))

  )}

        </tbody>

      </table>

    </div>
  );
};

export default SalaryTable;