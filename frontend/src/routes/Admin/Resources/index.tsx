import { Outlet } from "react-router-dom";
import AdminNav from "../../../components/AdminNav";

export default function Resources() {
  return (
    <main className="container p-0">
      <div className="mt-5 mb-5">
        <AdminNav />
      </div>
      <Outlet />
    </main>
  );
}
