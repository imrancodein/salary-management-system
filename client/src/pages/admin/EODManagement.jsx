import { useEffect, useState } from "react";
import { getAllEOD } from "../../services/eod.service";
import Pagination from "../../components/common/Pagination";
import EODViewModal from "../../components/staff/EODViewModal";
import AdminLayout from "../../layouts/AdminLayout";
import { getMonthlyEODReport } from "../../services/eod.service";
import MonthlyEODPreview from "../../components/common/MonthlyEODPreview";
const EODManagement = () => {
const [selectedStaff, setSelectedStaff] = useState("");

const [month, setMonth] = useState(
  new Date().getMonth() + 1
);

const [year, setYear] = useState(
  new Date().getFullYear()
);

const [report, setReport] = useState(null);

const [reportLoading, setReportLoading] =
  useState(false);
  const [loading, setLoading] = useState(false);
  const [eodList, setEodList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEOD, setSelectedEOD] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const recordsPerPage = 10;
  const loadEOD = async () => {
    try {

      setLoading(true);

      const response = await getAllEOD();

      setEodList(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadEOD();

  }, []);

  // Search

  const filteredData = eodList.filter((item) => {

    const name =
      item.staff?.name?.toLowerCase() || "";

    const employeeId =
      item.staff?.employeeId?.toLowerCase() || "";

    return (

      name.includes(search.toLowerCase()) ||

      employeeId.includes(search.toLowerCase())

    );

  });

  // Pagination

  const totalRecords = filteredData.length;

  const totalPages = Math.ceil(
    totalRecords / recordsPerPage
  );

  const startIndex =
    (currentPage - 1) * recordsPerPage;

  const currentData =
    filteredData.slice(
      startIndex,
      startIndex + recordsPerPage
    );
    {

  report && (

    <div className="mt-8">

      <MonthlyEODPreview

        report={report}

      />

    </div>

  )

}

    // handleViewReport
const handleViewReport = async () => {

  if (!selectedStaff) {
    alert("Please Select Staff");
    return;
  }

  try {

    setReportLoading(true);

    const response = await getMonthlyEODReport(
      selectedStaff,
      month,
      year
    );

    setReport(response.data);

  } catch (error) {

    console.log(error);

    alert("Failed to load report");

  } finally {

    setReportLoading(false);

  }

};

  return (
<AdminLayout>
    <div className="bg-white rounded-xl shadow p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">

          EOD Management

        </h2>

        <input

          type="text"

          placeholder="Search Employee"

          value={search}

          onChange={(e) => {

            setSearch(e.target.value);

            setCurrentPage(1);

          }}

          className="border rounded-lg px-4 py-2 w-72"

        />

      </div>
      {/* card */}
      <div className="bg-gray-50 border rounded-xl p-5 mb-6">

  <h3 className="text-lg font-semibold mb-4">

    Monthly EOD Report

  </h3>

  <div className="grid grid-cols-4 gap-4">

    {/* Staff */}

    <select
      value={selectedStaff}
      onChange={(e)=>
        setSelectedStaff(e.target.value)
      }
      className="border rounded-lg p-2"
    >

      <option value="">
        Select Staff
      </option>

      {

        [...new Map(
          eodList.map(item=>[
            item.staff._id,
            item.staff
          ])
        ).values()].map(staff=>(

          <option
            key={staff._id}
            value={staff._id}
          >

            {staff.name}

          </option>

        ))

      }

    </select>

    {/* Month */}

    <select
      value={month}
      onChange={(e)=>
        setMonth(e.target.value)
      }
      className="border rounded-lg p-2"
    >

      {

        [

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

          "December"

        ].map((m,index)=>(

          <option
            key={index}
            value={index+1}
          >

            {m}

          </option>

        ))

      }

    </select>

    {/* Year */}

    <input

      type="number"

      value={year}

      onChange={(e)=>
        setYear(e.target.value)
      }

      className="border rounded-lg p-2"

    />

 <button
  onClick={handleViewReport}
  disabled={reportLoading}
  className={`rounded-lg px-4 py-2 text-white transition-all duration-300 ${
    reportLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {reportLoading ? (
    <div className="flex items-center gap-2">
      <svg
        className="w-5 h-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      Loading...
    </div>
  ) : (
    " View Report"
  )}
</button>

  </div>

</div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">

                Employee

              </th>

              <th className="p-3 text-left">

                Date

              </th>

              <th className="p-3 text-left">

                Today's Work

              </th>

              <th className="p-3 text-center">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {

              loading ?

              (

                <tr>

                  <td
                    colSpan={4}
                    className="text-center p-6"
                  >

                    Loading...

                  </td>

                </tr>

              )

              :

              currentData.length === 0 ?

              (

                <tr>

                  <td
                    colSpan={4}
                    className="text-center p-6"
                  >

                    No EOD Found

                  </td>

                </tr>

              )

              :

              currentData.map((item)=>(

                <tr
                  key={item._id}
                  className="border-b"
                >

                  <td className="p-3">

                    <div className="font-semibold">

                      {item.staff?.name}

                    </div>

                    <div className="text-sm text-gray-500">

                      {item.staff?.employeeId}

                    </div>

                  </td>

                  <td className="p-3">

                    {item.date}

                  </td>

                  <td className="p-3">

                    {

                      item.todayWork.length > 40

                        ?

                        item.todayWork.substring(0,40)+"..."

                        :

                        item.todayWork

                    }

                  </td>

                  <td className="text-center">

                    <button

                      onClick={() => {

                        setSelectedEOD(item);

                        setOpenModal(true);

                      }}

                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"

                    >

                      View

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      <Pagination

        currentPage={currentPage}

        totalPages={totalPages}

        totalRecords={totalRecords}

        recordsPerPage={recordsPerPage}

        onPageChange={setCurrentPage}

      />
      {/*  */}
      {report && (

  <div className="mt-8">

    <MonthlyEODPreview
      report={report}
    />

  </div>

)}

<EODViewModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  eod={selectedEOD}
/>

      <EODViewModal

        isOpen={openModal}

        onClose={() => setOpenModal(false)}

        eod={selectedEOD}

      />

    </div>
</AdminLayout>
  );

};

export default EODManagement;