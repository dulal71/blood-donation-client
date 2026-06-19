'use server'

import { serverFetch } from "../service/get"

export const getDonations=async(pending = "",page = 1)=>{
   return serverFetch(`/api/donationRequest?status=${pending}&page=${page}`) 
}