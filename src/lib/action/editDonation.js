'use server'

import { serverMutation } from "../service/post"

export const editDonation=async(id,data)=>{
   return serverMutation(`/api/donationRequest/edit/${id}`,data, 'PATCH') 
}