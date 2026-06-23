'use server'

import { headers } from "next/headers";
import { auth } from "../auth";
import { getSession } from "./userSession";





export const getAllUsers=async()=>{
//   const user = getSession()  
//  if (user.role !== "admin") {
//         throw new Error("Unauthorized: Admin only");
//     }
const users = await auth.api.listUsers({
    query: {
      
        sortBy: "createdAt",
        sortDirection: "desc",
        
      
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return users
}