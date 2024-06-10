import "dotenv/config";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createEmployeeSchema, validateZodSchema } from "@/lib/zodSchemas";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const employee = await prisma.employee.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json(
    {
      employee,
    },
    {
      status: 200,
    }
  );
}

export async function PUT(req, { params }) {
  const formData = await req.json();

  const validatedData = validateZodSchema(createEmployeeSchema, formData);

  if (validatedData.errors) {
    return NextResponse.json(
      { errors: result.errors },
      {
        status: 400,
      }
    );
  }

  const employee = await prisma.employee.update({
    where: {
      id: parseInt(params.id),
    },
    data: validatedData.validatedFormData,
  });

  return NextResponse.json(
    {
        employee,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(req, { params }) {
  const deleteUser = await prisma.employee.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json(
    {
      deleted: true,
    },
    {
      status: 200,
    }
  );
}
