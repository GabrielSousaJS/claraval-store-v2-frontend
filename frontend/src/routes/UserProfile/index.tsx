import { Outlet } from "react-router-dom";
import ProfileNav from "../../components/ProfileNav";

export default function UserProfile() {
  return (
    <main className="container p-0">
      <div className="mt-5 mb-5">
        <ProfileNav />
      </div>
      <Outlet />
    </main>
  );
}
