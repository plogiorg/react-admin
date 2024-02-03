import { useGetUsers } from "../../api";
import { useEffect } from "react";

const Users = () => {
  const {data:users, isLoading} = useGetUsers();

  useEffect(() => {
    console.log({ users });
  }, [isLoading]);

  return (
    <div className="py-2">
      <div>Users Componet</div>
    </div>
  );
};

export default Users;
