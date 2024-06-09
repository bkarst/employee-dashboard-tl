"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { createEmployeeSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewEmployeeForm } from "./new-employee-form";

export default function NewEmployee() {
  const onSubmit = (data) => console.log(data);

  const form = useForm({
    resolver: zodResolver(createEmployeeSchema),
    handleSubmit: onSubmit,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Employee</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Employee</DialogTitle>
          <DialogDescription>
            Enter employee information below...
          </DialogDescription>
        </DialogHeader>
        <NewEmployeeForm />
      </DialogContent>
    </Dialog>
  );
}
