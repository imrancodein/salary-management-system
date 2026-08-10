import StatusBadge from "../common/StatusBadge";
import Pagination from "../../components/common/Pagination";

const AttendanceRow = ({ item, onRowClick,onEdit }) => {
  return (
    <tr
      onClick={() => onRowClick(item)}
      className="border-b hover:bg-blue-50 cursor-pointer transition"
    >
      <td className="p-4">
        {new Date(item.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td className="p-4">
        {item.checkIn
          ? new Date(item.checkIn).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "--"}
      </td>

      <td className="p-4">
        {item.checkOut
          ? new Date(item.checkOut).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "--"}
      </td>

      <td className="p-4">
        {item.workingHours} hrs
      </td>

      <td className="p-4">
        <StatusBadge status={item.status} />
      </td>

      
      
      
    </tr>
  );
};

export default AttendanceRow;