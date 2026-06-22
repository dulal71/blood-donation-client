"use client";

import { deleteDonation } from "@/lib/action/deleteDonation";
import { updateStatus } from "@/lib/action/updateDonation";
import { Button, Modal } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FiCheckCircle, FiEdit2, FiEye, FiMail, FiTrash2, FiUser, FiX } from "react-icons/fi";

const DonationActionsModal = ({donation}) => {
 // handle modified status
  const handleStatus = async (status) => {
     try{
 const res = await updateStatus(donation._id,{status});
    
    if (res.modifiedCount > 0) {
  alert(`Donation ${status.status} successfully!`);
}else {
       alert("Something went wrong. Please try again.");
     }
     }catch(error){
 alert("Failed to confirm donation.");
     console.error(error);
     }
 
   };
// handle delete
   const handleDelete = async()=>{
    try{
 const res = await deleteDonation(donation._id);
    
     if(res.deletedCount >  0){
       alert("Donation Delete successfully!");
     }else {
       alert("Something went wrong. Please try again.");
     }
     }catch(error){
 alert("Failed to confirm donation.");
     console.error(error);
     }
   }
  return (
    <Modal>
      <Button variant="ghost" isIconOnly>
        <CiMenuKebab />
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[320px]">
            <Modal.CloseTrigger />
            <Modal.Header>
<p className="font-bold ">Manage Your Request</p>
            </Modal.Header>
            <Modal.Body className="gap-2 pb-4">



{/* status: inprogress */}
{donation.status === "inprogress" && (
  <>
    <div className="px-3 py-2.5 border-b border-border/40 space-y-1.5">
      <div className="flex items-center gap-2 text-sm">
        <FiUser className="h-3.5 w-3.5 text-red-500 shrink-0" />
        <span className="font-medium text-foreground">{donation.donorName}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <FiMail className="h-3.5 w-3.5 text-red-500 shrink-0" />
        <span className="text-muted-foreground">{donation.donorEmail}</span>
      </div>
    </div>

    <div className="py-1">
      <Button onClick={()=>handleStatus('done')}
        className="w-full justify-start gap-2.5 px-3 text-sm font-normal h-9 rounded-none border-0 shadow-none hover:bg-accent"
        variant="ghost"
        slot="close"
      >
        <FiCheckCircle className="h-4 w-4 text-muted-foreground" />
        Done
      </Button>

      <div className="h-px bg-border/40 mx-2" />

      <Button
      onClick={()=>handleStatus('canceled')}
        className="w-full justify-start gap-2.5 px-3 text-sm font-normal h-9 rounded-none border-0 shadow-none text-red-600 hover:text-red-600 hover:bg-red-50/80"
        variant="ghost"
        slot="close"
      >
        <FiX className="h-4 w-4" />
        Cancel
      </Button>
    </div>
  </>
)}

{/* status: done */}
{donation.status === "done" && (
  <div className="py-1">
    <Link
     href={`/dashboard/my-donation-requests/${donation._id}`}
      className="w-full flex items-center justify-start gap-2.5 px-3 text-sm font-normal h-9 rounded-2xl border-0 shadow-none hover:bg-accent text-black"
      variant="ghost"
      slot="close"
    >
      <FiEye className="h-4 w-4 text-muted-foreground" />
      View details
    </Link>
  </div>
)}

{/* status: pending */}
{donation.status === "pending" && (
  <div className="py-1">
    <Link
    href={`/dashboard/my-donation-requests/${donation._id}`}
      className="w-full flex items-center justify-start gap-2.5 px-3 text-sm text-black font-normal h-9 rounded-none border-0 shadow-none hover:bg-accent"
      variant="ghost"
      slot="close"
    >
      <FiEye className="h-4 w-4 text-muted-foreground" />
      View details
    </Link>
    <Link
    href={`/dashboard/my-donation-requests/${donation._id}/edit`}
      className="w-full flex items-center justify-start gap-2.5 px-3 text-sm font-normal h-9 rounded-2xl border-0 shadow-none hover:bg-accent text-black"
    >
      <FiEdit2 className="h-4 w-4 text-muted-foreground" />
      Edit
    </Link>

    <div className="h-px bg-border/40 mx-2" />

    <Button
    onClick={handleDelete}
      className="w-full justify-start gap-2.5 px-3 text-sm font-normal h-9 rounded-none border-0 shadow-none text-red-600 hover:text-red-600 hover:bg-red-50/80"
      variant="ghost"
      slot="close"
    >
      <FiTrash2 className="h-4 w-4" />
      Delete
    </Button>
  </div>
)}

{/* status: canceled */}
{donation.status === "canceled" && (
  <div className="py-1">
    <Button
      className="w-full justify-start gap-2.5 px-3 text-sm font-normal h-9 rounded-none border-0 shadow-none text-red-600 hover:text-red-600 hover:bg-red-50/80"
      variant="ghost"
      slot="close"
    >
      <FiTrash2 className="h-4 w-4" />
      Delete
    </Button>
  </div>
)}    

            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DonationActionsModal;