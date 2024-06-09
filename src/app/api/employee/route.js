import "dotenv/config";
import { createEmployeeSchema, validateZodSchema } from "@/lib/zodSchemas";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
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

  const employee = await prisma.employee.create({
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

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  const deleteUser = await prisma.employee.delete({
    where: {
      id: parseInt(id),
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

export async function PUT(req) {
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

  const updateEmployee = await prisma.employee.update({
    where: {
      id: formData.id,
    },
    data: validatedData.validatedFormData,
  });

  return NextResponse.json(
    {
      updateEmployee,
    },
    {
      status: 200,
    }
  );
}
