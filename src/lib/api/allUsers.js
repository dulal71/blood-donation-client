'use server'

import { headers } from "next/headers";
import { auth } from "../auth";





export const getAllUsers=async()=>{
    
// const page = params.page || 1
// const limit = 10;
// const offset = (page - 1) * 10
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