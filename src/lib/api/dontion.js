'use server'

import { serverFetch } from "../service/get"

export const getDonations=async(pending = "")=>{
   return serverFetch(`/api/donationRequest?status=${pending}`) 
}