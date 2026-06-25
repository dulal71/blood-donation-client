'use server'

import { secureFetch, serverFetch } from "../service/get"

export const getDonationByUserId=async(userId,status,page = 1)=>{
return secureFetch(`/api/donationRequest/user/${userId}?status=${status}&page=${page}`)
}