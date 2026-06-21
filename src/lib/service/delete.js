'use server'

const baseUrl=process.env.SERVER_URL

export const serverDelete=async(path)=>{
    const res=await fetch(`${baseUrl}${path}`,{
        method:"DELETE"
    })
    return res.json()
}