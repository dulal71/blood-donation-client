'use server'

import { secureFetch } from "../service/get"



export const getDonationsById=async(id)=>{
   return secureFetch(`/api/donationRequest/${id}`) 
}