'use server'

import { secureFetch, serverFetch } from "../service/get"

export const getDonations=async(status = "",page = 1)=>{
   return serverFetch(`/api/donationRequest?status=${status}&page=${page}`) 
}
export const getDonationsForAdmin=async(status = "" ,page = 1)=>{
   return secureFetch(`/api/admin/donation-requests?status=${status}&page=${page}`) 
}