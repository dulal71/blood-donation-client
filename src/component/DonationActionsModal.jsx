"use client";

import { Button, Modal } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

const DonationActionsModal = () => {
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
              <Modal.Heading>Actions</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="gap-2 pb-4">

              <Button className="w-full justify-start" variant="ghost" slot="close">
                View Details
              </Button>

              <Button className="w-full justify-start" variant="ghost" slot="close">
                Edit
              </Button>

              <Button className="w-full justify-start text-red-500" variant="ghost" color="danger" slot="close">
                Delete
              </Button>

            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DonationActionsModal;