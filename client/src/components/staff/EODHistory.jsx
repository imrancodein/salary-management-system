import { useEffect, useState } from "react";
import { getMyEOD } from "../../services/eod.service";
import Pagination from "../common/Pagination";
import EODViewModal from "./EODViewModal";
const EODHistory = ({ refresh }) => {

  const [loading, setLoading] = useState(false);

  const [eodHistory, setEodHistory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
const [selectedEOD, setSelectedEOD] = useState(null);

const [openModal, setOpenModal] = useState(false);
  const recordsPerPage = 5;

  const loadHistory = async () => {

    try {

      setLoading(true);

      const response = await getMyEOD();

      setEodHistory(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadHistory();

  }, [refresh]);

  const totalRecords = eodHistory.length;

  const totalPages = Math.ceil(
    totalRecords / recordsPerPage
  );

  const startIndex =
    (currentPage - 1) * recordsPerPage;

  const currentHistory =
    eodHistory.slice(
      startIndex,
      startIndex + recordsPerPage
    );

  return (

    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">

        My EOD History

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

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
                    colSpan={3}
                    className="text-center p-6"
                  >

                    Loading...

                  </td>

                </tr>

              )

              :

              currentHistory.length === 0 ?

              (

                <tr>

                  <td
                    colSpan={3}
                    className="text-center p-6"
                  >

                    No EOD Found

                  </td>

                </tr>

              )

              :

              currentHistory.map((item) => (

                <tr
                  key={item._id}
                  className="border-b"
                >

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
     <EODViewModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        eod={selectedEOD}
        /> 

    </div>

  );

};

export default EODHistory;