'use server'

import { serverMutation } from "../service/post"

export const addDonationRequest=async(data)=>{
  return serverMutation('/api/donationRequest',data)  
}