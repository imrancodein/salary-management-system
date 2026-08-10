import React from "react";
import downloadSalarySlip from "../../utils/downloadSalarySlip";

const SalaryViewModal = ({
  open,
  setOpen,
  salary,
}) => {
  if (!open || !salary) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">

          <div>

            <h2 className="text-2xl font-bold">
              Salary Slip
            </h2>

            <p className="text-gray-500 text-sm">
              Salary Details
            </p>

          </div>

          {/* <button
            onClick={() => setOpen(false)}
            className="text-2xl"
          >
            ✕
          </button> */}
          {/* Download */}
          <div className="flex justify-end gap-3 mt-6">

  <button
    onClick={() => downloadSalarySlip(salary)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
  >
    Download PDF
  </button>

  <button
    onClick={() => setOpen(false)}
    className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
  >
    Close
  </button>

</div>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Company */}

          <div className="text-center border-b pb-5">

            <h2 className="text-2xl font-bold text-blue-700">
              MANVIYA DRISTIKON SEWA SAMITI
            </h2>

            <p className="text-gray-500">
              Salary Slip
            </p>

          </div>

          {/* Employee */}

          <div className="grid grid-cols-2 gap-5">

            <div>

              <p className="text-gray-500">
                Employee
              </p>

              <h3 className="font-semibold">
                {salary.staff?.name}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Employee ID
              </p>

              <h3 className="font-semibold">
                {salary.staff?.employeeId}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Department
              </p>

              <h3 className="font-semibold">
                {salary.staff?.department?.name}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Month
              </p>

              <h3 className="font-semibold">
                {salary.month} {salary.year}
              </h3>

            </div>

          </div>

          {/* Salary */}

          <div className="border rounded-lg overflow-hidden">

            <table className="w-full">

              <tbody>

                <tr className="border-b">

                  <td className="p-4">
                    Basic Salary
                  </td>

                  <td className="p-4 text-right">
                    ₹ {salary.basicSalary}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-4">
                    Bonus
                  </td>

                  <td className="p-4 text-right text-green-600">
                    ₹ {salary.bonus}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-4">
                    Deduction
                  </td>

                  <td className="p-4 text-right text-red-600">
                    ₹ {salary.deduction}
                  </td>

                </tr>

                <tr className="bg-gray-100">

                  <td className="p-4 font-bold">
                    Net Salary
                  </td>

                  <td className="p-4 text-right font-bold text-blue-700">
                    ₹ {salary.netSalary}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* Status */}

          <div className="flex justify-between">

            <span>Status</span>

            <span
              className={`px-4 py-1 rounded-full ${
                salary.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {salary.status}
            </span>
{/* payment mode and date */}
            <div>
  <label className="font-medium">
    Payment Mode
  </label>

  <input
    type="text"
    value={salary?.paymentMode || "-"}
    readOnly
   className="w-full rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
  />
</div>

<div>
  <label className="font-medium">
    Payment Date
  </label>

  <input
    type="text"
    value={
      salary?.paymentDate
        ? new Date(salary.paymentDate).toLocaleDateString("en-IN")
        : "-"
    }
    readOnly
    className="w-full rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
  />
</div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SalaryViewModal;