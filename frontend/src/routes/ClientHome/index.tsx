import HeaderClient from "../../components/HeaderClient";
import { Outlet } from "react-router-dom";

export default function ClientHome() {
  return (
    <>
      <HeaderClient />
      <Outlet />
    </>
  );
}
