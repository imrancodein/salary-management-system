import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
// import SalaryFilter from "../../components/salary/SalaryFilter";
import SalaryTable from "../../components/salary/SalaryTable";
import SalaryFormModal from "../../components/salary/SalaryFormModal";
import { getAllSalary } from "../../services/salary.service";
import SalaryViewModal from "../../components/salary/SalaryViewModal";
import PaymentModal from "../../components/salary/PaymentModal";
import SalaryFilter from "../../components/common/SalaryFilter";
const SalaryManagement = () => {
  const [month, setMonth] = useState("");
const [year, setYear] = useState("");
const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
const [salaryList, setSalaryList] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedSalary, setSelectedSalary] = useState(null);
const [viewModal, setViewModal] = useState(false);
const [paymentModal, setPaymentModal] = useState(false);

const [selectedPaymentSalary, setSelectedPaymentSalary] =

  useState(null);
const loadSalary = async () => {
  try {
    setLoading(true);

    const response = await getAllSalary();

    setSalaryList(response.data);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  loadSalary();
}, []);
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h1 className="text-3xl font-bold">
          Salary Management
        </h1>

        {/* Salaryfilter */}
        <SalaryFilter
          search={search}
          setSearch={setSearch}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          onReset={() => {
            setMonth("");
            setYear("");
          }}
        />
        
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Generate Salary
        </button>

      </div>

      {/* <SalaryTable /> */}

    <SalaryTable
      salaryList={salaryList}
       search={search}
      month={month}
      year={year}
      loading={loading}
      loadSalary={loadSalary}
      setOpenModal={setOpenModal}
      setSelectedStaff={setSelectedStaff}
      setSelectedSalary={setSelectedSalary}
      setViewModal={setViewModal}
      setPaymentModal={setPaymentModal}
      setSelectedPaymentSalary={setSelectedPaymentSalary}
    />

      <SalaryFormModal
      open={openModal}
      setOpen={setOpenModal}
      staff={selectedStaff}
      loadSalary={loadSalary}
    />
    <SalaryViewModal
      open={viewModal}
      setOpen={setViewModal}
      salary={selectedSalary}
    />
    <PaymentModal
      open={paymentModal}
      setOpen={setPaymentModal}
      salary={selectedPaymentSalary}
      loadSalary={loadSalary}
    />
    </AdminLayout>
  );
};

export default SalaryManagement;