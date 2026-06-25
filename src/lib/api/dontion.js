'use server'

import { secureFetch, serverFetch } from "../service/get"

export const getDonations=async(status = "",page = 1 , search = '', district = '',upazila= '',bloodGroup='')=>{
   return serverFetch(`/api/donationRequest?status=${status}&page=${page}&search=${search}&district=${district}&upazila=${upazila}&bloodGroup=${encodeURIComponent(bloodGroup)}`) 
}
export const getDonationsForAdmin=async(status = "" ,page = 1)=>{
   return secureFetch(`/api/admin/donation-requests?status=${status}&page=${page}`) 
}