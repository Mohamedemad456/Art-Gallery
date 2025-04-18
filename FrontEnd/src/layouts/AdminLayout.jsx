import SideBar from "../components/Sidebar/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-full grid grid-cols-12">
      <div className="col-span-0 md:col-span-3 lg:col-span-2">
      <SideBar />
      </div>
      <main className="col-span-11 md:col-span-9 lg:col-span-10 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;