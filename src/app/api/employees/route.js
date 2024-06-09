import "dotenv/config";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const employees = await prisma.employee.findMany();
  return NextResponse.json(
    {
      employees
    },
    {
      status: 200,
    }
  );
}
