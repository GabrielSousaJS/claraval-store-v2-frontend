import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Footer from "../../components/Footer";

export default function Admin() {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
      <Footer />
    </>
  );
}
