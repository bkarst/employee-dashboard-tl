import { z } from "zod";
import { NextResponse } from "next/server";

// export const employeeSchema = {
//   employee_id: z.string().min(1), // Employee ID should be a non-empty string
//   name: z.string().min(1), // Name should be a non-empty string
//   department: z.string().min(1), // Department should be a non-empty string
//   position: z.string().min(1), // Position should be a non-empty string
//   salary : z.preprocess((a) => parseInt(z.string().parse(a),10),
//   z.number().positive()),  
//   bio: z.string().optional(), // Bio is an optional string
//   status: z.enum(["active", "inactive"]), // Status should be either 'active' or 'inactive'
// }

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

export const editEmployeeSchema = z.object({
  employee_id: z.string().min(1), // Employee ID should be a non-empty string
  name: z.string().min(1), // Name should be a non-empty string
  department: z.string().min(1), // Department should be a non-empty string
  position: z.string().min(1), // Position should be a non-empty string
  salary: z.coerce.number(),
  bio: z.string().optional(), // Bio is an optional string
  status: z.enum(["active", "inactive"]), // Status should be either 'active' or 'inactive'
  id: z.string().min(1)
});

export const validateZodSchema = (schema, formData) => {
  let validatedFormData;
  try {
    validatedFormData = schema.parse(formData);
  } catch (e) {
    return {errors: e.errors}
  }
  return {validatedFormData}
};
