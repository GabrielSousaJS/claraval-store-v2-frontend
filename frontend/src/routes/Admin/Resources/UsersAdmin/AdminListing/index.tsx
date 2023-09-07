import { Link } from "react-router-dom";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { UserDTO } from "../../../../../models/user";
import { useEffect, useState } from "react";
import UserCard from "../../../../../components/UserCard";
import * as userService from "../../../../../services/user-service";

export default function AdminListing() {
  const [admins, setAdmins] = useState<UserDTO[]>([]);

  useEffect(() => {
    userService.findAllAdminsRequest().then((response) => {
      setAdmins(response.data);
    });
  }, []);

  return (
    <div className="ps-2 pe-2">
      <div className="d-flex justify-content-between pb-4">
        <h1 className="pe-4 text-dark">Lista de admins</h1>
        <Link to="/admin/resources/admins/create">
          <ButtonPrimary text="Adicionar" />
        </Link>
      </div>

      <div className="row ps-2 pe-2">
        {admins.map((admin) => (
          <div className="col-12 pb-4" key={admin.id}>
            <UserCard user={admin} />
          </div>
        ))}
      </div>
    </div>
  );
}
