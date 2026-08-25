import { FaEye } from "react-icons/fa";

const StaffProgramTable = ({
  programs,
  loading,
  onView,
}) => {

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
        Loading programs...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      {/* HEADER */}

      <div className="p-4 md:p-6 border-b">

        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          My Program Expenses
        </h2>

      </div>


      {/* EMPTY */}

      {programs.length === 0 ? (

        <div className="p-8 text-center text-gray-500">
          No program has been assigned to you.
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                  Program
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                  Location
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                  Advance
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                  Approved Expense
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                  Remaining
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                  Action
                </th>

              </tr>

            </thead>


            <tbody className="divide-y">

              {programs.map((program) => (

                <tr
                  key={program._id}
                  className="hover:bg-gray-50"
                >

                  {/* PROGRAM */}

                  <td className="px-4 py-3">

                    <div className="font-medium text-gray-800">
                      {program.programName || "-"}
                    </div>

                    {program.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {program.description}
                      </div>
                    )}

                  </td>


                  {/* DATE */}

                  <td className="px-4 py-3">
                    {formatDate(
                      program.programDate
                    )}
                  </td>


                  {/* LOCATION */}

                  <td className="px-4 py-3">
                    {program.location || "-"}
                  </td>


                  {/* ADVANCE */}

                  <td className="px-4 py-3 font-semibold text-blue-600">

                    ₹
                    {Number(
                      program.advanceAmount || 0
                    ).toLocaleString("en-IN")}

                  </td>


                  {/* APPROVED EXPENSE */}

                  <td className="px-4 py-3 font-semibold text-orange-600">

                    ₹
                    {Number(
                      program.totalExpense || 0
                    ).toLocaleString("en-IN")}

                  </td>


                  {/* REMAINING */}

                  <td className="px-4 py-3 font-semibold text-green-600">

                    ₹
                    {Number(
                      program.remainingAmount || 0
                    ).toLocaleString("en-IN")}

                  </td>


                  {/* STATUS */}

                  <td className="px-4 py-3">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        program.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : program.status === "Settlement Pending"
                          ? "bg-orange-100 text-orange-700"
                          : program.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {program.status || "Pending"}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td className="px-4 py-3">

                    <button
                      type="button"
                      onClick={() =>
                        onView(program._id)
                      }
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                    >

                      <FaEye />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default StaffProgramTable;