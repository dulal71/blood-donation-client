'use server'

import { serverFetch } from "../service/get"

export const getDonationsById=async(id)=>{
   return serverFetch(`/api/donationRequest/${id}`) 
}