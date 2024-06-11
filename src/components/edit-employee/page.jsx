"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { EditEmployeeForm } from "./edit-employee-form";

export default function EditEmployee({ employee }) {
  return (
    <>
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Update the employee information below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditEmployeeForm employee={employee} />
        </div>
      </DialogContent>
      </>
  );
}
