'use server'

import { serverFetch } from "../service/get"

export const getDonationByUserId=async(userId,page = 1)=>{
return serverFetch(`/api/donationRequest/user/${userId}?page=${page}`)
}