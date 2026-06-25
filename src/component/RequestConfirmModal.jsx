"use client";


import { updateStatus } from "@/lib/action/updateDonation";
import { Button, Modal,  } from "@heroui/react";

import { TbDroplet, TbInfoCircle, TbCheck } from "react-icons/tb";
import { toast } from "sonner";

const RequestConfirmModal = ({ donation,user }) => {

  const data = {status: 'inprogress',
   donorId: user.id,
   donorEmail:user.email,
   donorName:user.name
}
  const handleConfirm = async () => {
    try{
const res = await updateStatus(donation._id,data);
   
    if(res.modifiedCount > 0){
      toast.success("Donation confirmed successfully!");
    }else {
      toast.error("Something went wrong. Please try again.");
    }
    }catch(error){
toast.error("Failed to confirm donation.");
    console.error(error);
    }

  };

  return (
    <Modal>
      <Button className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
        Accept
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-red-100 text-red-600">
                <TbDroplet className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Blood Donation</Modal.Heading>
              <p className="text-sm text-gray-500 text-center mt-1">
                Accept this donation request
              </p>
            </Modal.Header>
            <Modal.Body className="space-y-3">
              {/* Donor Name - Read Only */}
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-xs text-gray-400 mb-0.5">Donor name</p>
                <p className="text-sm font-medium text-gray-800">
                  {user?.name}
                </p>
              </div>

              {/* Donor Email - Read Only */}
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-xs text-gray-400 mb-0.5">Donor email</p>
                <p className="text-sm font-medium text-gray-800">
                  {user?.email}
                </p>
              </div>

              {/* Warning */}
              <div className="bg-red-50 rounded-lg px-4 py-3 flex gap-2 items-start">
                <TbInfoCircle className="text-red-500 mt-0.5 shrink-0 size-4" />
                <p className="text-xs text-red-700 leading-relaxed">
                  Please make sure you are eligible and available to donate
                  before confirming.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
                slot="close"
                onClick={handleConfirm}
              >
                <TbCheck className="size-4" />
                Confirm donation
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default RequestConfirmModal;