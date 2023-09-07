import { useEffect, useState } from "react";
import { SpringPage } from "../../../../../models/vendor/spring-page";
import { UserDTO } from "../../../../../models/user";
import Pagination from "../../../../../components/Pagination";
import UserCard from "./UserCard";
import * as userService from "../../../../../services/user-service";

export default function UserListing() {
  const [page, setPage] = useState<SpringPage<UserDTO>>();

  useEffect(() => {
    getUsers(0);
  }, []);

  function getUsers(pageNumber: number) {
    userService.findAllRequest(pageNumber).then((response) => {
      setPage(response.data);
    });
  }

  return (
    <div className="ps-2 pe-2">
      <h1 className="text-dark pb-4">Lista de usuários</h1>

      <div className="row ps-2 pe-2">
        {page?.content.map((user) => (
          <div className="col-12 pb-4" key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>

      {page?.content.length !== 0 && (
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={getUsers}
        />
      )}
    </div>
  );
}
