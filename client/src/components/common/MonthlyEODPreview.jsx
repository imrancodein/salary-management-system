// import { useRef } from "react";
// import downloadMonthlyEOD from "../../utils/downloadMonthlyEOD";
import generateMonthlyEODPDF from "../../utils/generateMonthlyEODPDF";
const MonthlyEODPreview = ({ report }) => {
    // const reportRef = useRef(null);
//  console.log("Preview Report:", report);
  if (!report) return null;

  const { employee, summary, records } = report;

  return (

    <div 
    // ref={reportRef}
    className="bg-white rounded-xl shadow-lg p-6"
    >

      {/* Header */}

      <div className="text-center border-b pb-4">

        <h2 className="text-2xl font-bold">

          MONTHLY EOD REPORT

        </h2>

      </div>

      {/* Download button */}
<button

onClick={() =>
generateMonthlyEODPDF(report)
}

className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"

>

📥 Download PDF

</button>

      {/* Employee Details */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div>

          <p className="text-gray-500 text-sm">

            Employee

          </p>

          <p className="font-semibold">

            {employee.name}

          </p>

        </div>

        <div>

          <p className="text-gray-500 text-sm">

            Employee ID

          </p>

          <p className="font-semibold">

            {employee.employeeId}

          </p>

        </div>

        <div>

          <p className="text-gray-500 text-sm">

            Department

          </p>

          <p className="font-semibold">

            {employee.department}

          </p>

        </div>

        <div>

          <p className="text-gray-500 text-sm">

            Submitted Days

          </p>

          <p className="font-semibold">

            {summary.submittedDays}

          </p>

        </div>

      </div>

      {/* Table */}

      <div className="mt-8 overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="border p-3 text-left">

                Date

              </th>

              <th className="border p-3 text-left">

                Today's Work

              </th>

              <th className="border p-3 text-center">

                Type

              </th>

            </tr>

          </thead>

          <tbody>

            {

              records.map((item) => (

                <tr key={item._id}>

                  <td className="border p-3">

                    {item.date}

                  </td>

                  <td className="border p-3">

                    {item.todayWork}

                  </td>

                  <td className="border p-3 text-center">

                    {

                      item.isManual ?

                      (

                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">

                          Manual

                        </span>

                      )

                      :

                      (

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                          Staff

                        </span>

                      )

                    }

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default MonthlyEODPreview;