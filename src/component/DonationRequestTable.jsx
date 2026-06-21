'use client'

import { Table, Chip, Button } from "@heroui/react";
import { FaTint } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import DonationActionsModal from "./DonationActionsModal";


const bloodColor = {
  "A+": "bg-red-100 text-red-600",
  "A-": "bg-red-100 text-red-600",
  "B+": "bg-orange-100 text-orange-600",
  "B-": "bg-orange-100 text-orange-600",
  "AB+": "bg-purple-100 text-purple-600",
  "AB-": "bg-purple-100 text-purple-600",
  "O+": "bg-green-100 text-green-600",
  "O-": "bg-green-100 text-green-600",
};
const statusConfig = {
  pending:    { label: "Pending",     className: "bg-yellow-100 text-yellow-700"  },
  inprogress: { label: "In Progress", className: "bg-blue-100 text-blue-700"      },
  done:       { label: "Completed",   className: "bg-green-100 text-green-700"    },
  canceled:   { label: "Canceled",    className: "bg-gray-100 text-gray-600"      },
};

const DonationRequestTable = ({donations}) => {
 
  
   
  return (
    <div>
<div>
<Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Donation Requests">

          <Table.Header>
            <Table.Column isRowHeader>
              <div>#</div>
            </Table.Column>
            <Table.Column><div>Recipient</div></Table.Column>
            <Table.Column><div>Blood</div></Table.Column>
            <Table.Column><div>Location</div></Table.Column>
            <Table.Column><div>Date</div></Table.Column>
            <Table.Column><div>Status</div></Table.Column>
            <Table.Column><div>Action</div></Table.Column>
          </Table.Header>

          <Table.Body>
            {donations.map((donation, index) => {
 
              const status = statusConfig[donation.status?.toLowerCase()] 

              const formattedDate = new Date(donation.donationDate).toLocaleDateString("en-GB", {
                day: "numeric", month: "short", year: "numeric",
              });

              return (
                <Table.Row key={donation._id}>

                  <Table.Cell>
                    <div className="text-default-400 text-sm font-medium">
                      {index + 1}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div>
                      <p className="font-semibold text-default-800 text-sm">
                        {donation.recipientName}
                      </p>
                      <p className="text-xs text-default-400">
                        {donation.hospitalName}
                      </p>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div>
                      <Chip className={bloodColor[donation.bloodGroup]} variant="flat" size="sm">
                        <span className={`flex items-center gap-1 font-bold px-2 py-1 rounded-full text-xs ${bloodColor[donation.bloodGroup] ?? "bg-red-100 text-red-600"}`}>
                        <FaTint size={9} />
                         {donation.bloodGroup}
                          </span>
                      </Chip>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-1 text-default-600 text-sm">
                      <MdLocationOn size={14} className="text-danger flex-shrink-0" />
                      <span>{donation.recipientUpazila}, {donation.recipientDistrict}</span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="text-default-600 text-sm">
                      {formattedDate}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div>
                      <Chip className={status.className} variant="flat" size="sm">
                        <div>{status.label}</div>
                      </Chip>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div>
                     <DonationActionsModal></DonationActionsModal>
                    </div>
                  </Table.Cell>

                </Table.Row>
              );
            })}
          </Table.Body>

        </Table.Content>
      </Table.ScrollContainer>
    </Table>
</div>
 </div>
    
  );
};

export default DonationRequestTable;