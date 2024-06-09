"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

export function EditEmployeeForm({ employee }) {

  const editEmployeeSchema = z.object({
    employee_id: z.string().min(1).default(employee.employee_id), // Employee ID should be a non-empty string
    name: z.string().min(1).default(employee.name), // Name should be a non-empty string
    department: z.string().min(1).default(employee.department), // Department should be a non-empty string
    position: z.string().min(1).default(employee.position), // Position should be a non-empty string
    salary: z.coerce.number().default(employee.salary),
    bio: z.string().optional().default(employee.bio), // Bio is an optional string
    status: z.enum(["active", "inactive"]).default(employee.status), // Status should be either 'active' or 'inactive'
  });
  
  const form = useForm({
    resolver: zodResolver(editEmployeeSchema),
  });
  function onSubmit(data) {
    console.log(data);
    data["id"] = employee.id;
    axios
      .put("/api/employee", data)
      .then(({ data }) => (window.location = "/"));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="employee_id"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 items-center gap-4 m-6">
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input
                    className={"w-100"}
                    placeholder="Employee ID"
                    defaultValue={employee.employee_id}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 items-center gap-4 m-6">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    defaultValue={employee.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 items-center gap-4 m-6">
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Department"
                    defaultValue={employee.department}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 items-center gap-4 m-6">
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Position"
                    defaultValue={employee.position}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 items-center gap-4 m-6">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={employee.status}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 items-center gap-4 m-6">
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Salary"
                    defaultValue={employee.salary}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 items-center gap-4 m-6">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Employee Bio"
                    className="resize-none"
                    defaultValue={employee.bio}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
