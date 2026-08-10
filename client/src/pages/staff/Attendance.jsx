import { useEffect, useState } from "react";
import StaffLayout from "../../layouts/StaffLayout";
import { getAttendanceHistory } from "../../services/attendance.service";
import AttendanceModal from "../../components/attendance/AttendanceModal";
import AttendanceCards from "../../components/attendance/AttendanceCards";
import AttendanceFilter from "../../components/attendance/AttendanceFilter";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import Pagination from "../../components/common/Pagination";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
const [selectedAttendance, setSelectedAttendance] = useState(null);

const [isModalOpen, setIsModalOpen] = useState(false);
  const recordsPerPage = 30;

  useEffect(() => {
    loadAttendance();
  }, []);

  // Search/Filter change hone par Page 1 par aa jaaye
  useEffect(() => {
    setCurrentPage(1);
  }, [search, month, year]);

  const loadAttendance = async () => {
    try {
      const res = await getAttendanceHistory();
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRowClick = (attendance) => {
  setSelectedAttendance(attendance);
  setIsModalOpen(true);
};

  // Filter Logic
  const filteredAttendance = attendance.filter((item) => {
    const date = new Date(item.date);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const searchMatch = formattedDate
      .toLowerCase()
      .includes(search.toLowerCase());

    const monthMatch =
      month === "" || date.getMonth() === Number(month);

    const yearMatch =
      year === "" || date.getFullYear() === Number(year);

    return searchMatch && monthMatch && yearMatch;
  });

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;

  const indexOfFirstRecord =
    indexOfLastRecord - recordsPerPage;

  const currentRecords = filteredAttendance.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(
    filteredAttendance.length / recordsPerPage
  );

  return (
    <StaffLayout>

      <h1 className="text-3xl font-bold mb-6">
        Attendance History
      </h1>

      <AttendanceFilter
        search={search}
        setSearch={setSearch}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />

      <AttendanceCards attendance={attendance} />

      <AttendanceTable
        loading={loading}
        currentRecords={currentRecords}
        filteredAttendance={filteredAttendance}
        onRowClick={handleRowClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={filteredAttendance.length}
        recordsPerPage={recordsPerPage}
        onPageChange={setCurrentPage}
      />
      <AttendanceModal
        isOpen={isModalOpen}
        attendance={selectedAttendance}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAttendance(null);
        }}
      />

    </StaffLayout>
  );
};

export default Attendance;