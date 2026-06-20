'use server'

import { serverFetch } from "../service/get"

export const getDonations=async(status = "",page = 1)=>{
   return serverFetch(`/api/donationRequest?status=${status}&page=${page}`) 
}