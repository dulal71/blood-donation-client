import { PaginationWithEllipsis } from "@/component/Pagination";
import UserTable from "@/component/UserTable";
import { getAllUsers } from "@/lib/api/allUsers";




const allUsersPage =async ({searchParams}) => {
    const params = await searchParams
    
   
    const data = await getAllUsers()
    const {users,total} = data
  
    return (
        <div className=" bg-gray-50 min-h-screen">
            
          <UserTable users={users} total={total}></UserTable>
       
          <PaginationWithEllipsis totalData={total}></PaginationWithEllipsis>  
       
        </div>
    );
};

export default allUsersPage;