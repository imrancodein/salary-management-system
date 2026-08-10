import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";
import { getAdminDashboard } from "../../services/dashboard.service";
const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadDashboard = async () => {
    try {
      const response = await getAdminDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadDashboard();
  }, []);

  return (

    <AdminLayout>

      <div className="mb-6">

        <h1 className="text-3xl font-bold">

          Welcome Admin 👋

        </h1>

        <p className="text-gray-500">

          Salary Management System Dashboard

        </p>

      </div>

      {

        loading ?

        (

          <div className="text-center py-10">

            Loading Dashboard...

          </div>

        )

        :

        (

  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">

  <DashboardCard
    title="Total Staff"
    value={dashboard.totalStaff}
    color="#2563EB"
  />

  <DashboardCard
    title="Departments"
    value={dashboard.totalDepartment}
    color="#7C3AED"
  />

  <DashboardCard
    title="Present Today"
    value={dashboard.presentToday}
    color="#16A34A"
  />

  <DashboardCard
    title="Absent Today"
    value={dashboard.absentToday}
    color="#DC2626"
  />

  <DashboardCard
    title="Pending Leave"
    value={dashboard.pendingLeave}
    color="#F59E0B"
  />

  <DashboardCard
    title="Pending EOD"
    value={dashboard.pendingEOD}
    color="#EA580C"
  />

  <DashboardCard
    title="Total Salary"
    value={`₹${dashboard.totalSalary.toLocaleString()}`}
    color="#059669"
  />

  <DashboardCard
    title="New Staff"
    value={dashboard.newStaff}
    color="#0EA5E9"
  />

</div> 

        )

      }

    </AdminLayout>

  );

};

export default Dashboard;