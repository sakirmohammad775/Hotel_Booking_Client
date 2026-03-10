import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";


const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
     

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Main content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;