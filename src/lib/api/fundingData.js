'use server'

import { cache } from "react"
import { serverFetch } from "../service/get"


export const fundingData = async(page = 1)=>{
    return await serverFetch(`/api/funding?page=${page}`,{
          cache: 'no-store'
    })
}