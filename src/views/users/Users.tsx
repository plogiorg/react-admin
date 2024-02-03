import { useGetUsers } from "../../api";

const Users = () => {
  const {data:users} = useGetUsers();

  console.log({users});

  return (
    <div className="py-2">
      <div>Users Componet</div>
    </div>
  );
};

export default Users;
