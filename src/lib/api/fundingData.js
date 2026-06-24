'use server'

import { cache } from "react"
import { secureFetch } from "../service/get"

export const fundingData = async(page = 1)=>{
    return await secureFetch(`/api/funding?page=${page}`,{
          cache: 'no-store'
    })
}