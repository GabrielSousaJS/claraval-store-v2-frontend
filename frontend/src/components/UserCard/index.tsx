import "./styles.css";

import { UserDTO } from "../../models/user";
import * as formatters from "../../utils/formatters";

type Props = {
  user: UserDTO;
};

export default function UserCard({ user }: Props) {
  return (
    <div className="row text-center base-card p-3">
      <div className="col-md-1 mb-2 pb-2 user-admin-border">
        <p className="fw-bold pb-2">ID</p>#<span>{user.id}</span>
      </div>
      <div className="col-md-4 mb-2 pb-2 user-admin-border">
        <p className="fw-bold pb-2">Nome</p>
        <span>{user.name}</span>
      </div>
      <div className="col-md-3 mb-2 pb-2 user-admin-border">
        <p className="fw-bold pb-2">Data de nascimento</p>
        <span>{formatters.formatDateToPTBR(user.birthDate)}</span>
      </div>
      <div className="col-md-4 mb-2 pb-2">
        <p className="fw-bold pb-2">E-mail</p>
        <span>{user.email}</span>
      </div>
    </div>
  );
}
