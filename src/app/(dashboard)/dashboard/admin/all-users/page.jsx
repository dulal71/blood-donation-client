import UserTable from "@/component/UserTable";
import { getAllUsers } from "@/lib/api/allUsers";




const allUsersPage =async () => {
    const data = await getAllUsers()
    const {users,total} = data
  
    return (
        <div>
          <UserTable users={users} total={total}></UserTable>
        </div>
    );
};

export default allUsersPage;