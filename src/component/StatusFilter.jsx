"use client"
import { Label, ListBox, Select } from "@heroui/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  { label: "All",        value: "all" },
  { label: "Pending",    value: "pending" },
  { label: "Inprogress", value: "inprogress" },
  { label: "Done",       value: "done" },
  { label: "Canceled",   value: "canceled" },
];

const StatusFilter = () => {
const [status,setStatus]=useState('all')
const router = useRouter()

useEffect(()=>{
 const params=new URLSearchParams()   
 if(status !== 'all'){
    params.set('status',status) 
 }
 const path= `?${params.toString()}`
 router.push(path)
},[status])
  
    return (
    <Select
      className="w-48"
      selectedKey={status}
      onSelectionChange={(key) => setStatus(key)}
    >
      <Label>Filter by Status</Label>
      <Select.Trigger>
        <Select.Value>{status === "all" ? "All Types" : status.replace("-", " ")}</Select.Value>
       <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {STATUS_OPTIONS.map((s) => (
            <ListBox.Item key={s.value} id={s.value} textValue={s.label}>
              {s.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default StatusFilter;