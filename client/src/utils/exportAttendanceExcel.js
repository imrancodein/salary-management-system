import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportAttendanceExcel = (attendance) => {
  const data = attendance.map((item, index) => ({
    "S.No": index + 1,
    "Employee Name": item.staff?.name || "-",
    Department: item.staff?.department?.name || "-",
    "Check In": item.checkIn
      ? new Date(item.checkIn).toLocaleString()
      : "-",
    "Check Out": item.checkOut
      ? new Date(item.checkOut).toLocaleString()
      : "-",
    "Working Hours": item.workingHours || 0,
    Status: item.status || "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Attendance"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, `Attendance_${new Date().getTime()}.xlsx`);
};

export default exportAttendanceExcel;