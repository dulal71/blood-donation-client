'use server'

import { authHeader } from "./post"

const baseUrl=process.env.SERVER_URL

export const serverDelete=async(path)=>{
    const res=await fetch(`${baseUrl}${path}`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            ... await authHeader()
          } ,
    })
    return res.json()
}