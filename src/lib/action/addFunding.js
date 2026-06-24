'use server'

import { serverMutation } from "../service/post"

export const addFundingData=async(data)=>{
 const res = await serverMutation('/api/funding', data ,'POST' ) 
 return res  
}