import { z } from "zod";

export const employeeSchema = {
  employee_id: z.string().min(1), // Employee ID should be a non-empty string
  name: z.string().min(1), // Name should be a non-empty string
  department: z.string().min(1), // Department should be a non-empty string
  position: z.string().min(1), // Position should be a non-empty string
  salary: z.coerce.number(),
  bio: z.string().optional(), // Bio is an optional string
  status: z.enum(["active", "inactive"]), // Status should be either 'active' or 'inactive'
};

export const createEmployeeSchema = z.object(employeeSchema);

export const validateZodSchema = (schema, formData) => {
  let validatedFormData;
  try {
    validatedFormData = schema.parse(formData);
  } catch (e) {
    return {errors: e.errors}
  }
  return {validatedFormData}
};
