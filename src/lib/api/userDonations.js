'use server'

import { serverFetch } from "../service/get"

export const getDonationByUserId=async(userId,status,page = 1)=>{
return serverFetch(`/api/donationRequest/user/${userId}?status=${status}&page=${page}`)
}