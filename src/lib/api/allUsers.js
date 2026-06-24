'use server'

import { headers } from "next/headers";
import { auth } from "../auth";
import { getSession } from "./userSession";
import { secureFetch, serverFetch } from "../service/get";





export const getAllUsers=async()=>{

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


export const users=async()=>{
  return secureFetch('/api/user')  
}