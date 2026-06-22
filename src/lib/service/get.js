'use server'

const baseUrl=process.env.SERVER_URL

export const serverFetch=async(path)=>{
    const res=await fetch(`${baseUrl}${path}`,{
      cache: "no-store",   
    })
    return res.json()
}