import StatusBadge from "../common/StatusBadge";
import AttendanceRow from "./AttendanceRow";
const AttendanceTable = ({
  loading,
  currentRecords,
  filteredAttendance,
  onRowClick,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      {loading ? (
        <p className="p-6">Loading...</p>
      ) : (
        <table className="min-w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Check In</th>
              <th className="p-4 text-left">Check Out</th>
              <th className="p-4 text-left">Hours</th>
              <th className="p-4 text-left">Status</th>
              {/* <th className="p-4">  Action</th> */}
            </tr>

          </thead>

          <tbody>

            {filteredAttendance.length > 0 ? (

              currentRecords.map((item) => (
                <AttendanceRow
                    key={item._id}
                    item={item}
                    onRowClick={onRowClick}
                    
                  />
              

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No Attendance Record Found
                </td>

              </tr>

            )}

          </tbody>

        </table>
      )}

    </div>
  );
};

export default AttendanceTable;