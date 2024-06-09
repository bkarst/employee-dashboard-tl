const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const employees = [
  {
    employee_id: "E001",
    name: "John Doe",
    department: "Engineering",
    position: "Software Engineer",
    bio: "John has been with the company for 5 years.",
    status: "active",
    salary: 90000,
  },
  {
    employee_id: "E002",
    name: "Jane Smith",
    department: "Marketing",
    position: "Marketing Manager",
    bio: "Jane specializes in digital marketing.",
    status: "active",
    salary: 80000,
  },
  {
    employee_id: "E003",
    name: "Alice Johnson",
    department: "Human Resources",
    position: "HR Specialist",
    bio: "Alice has a background in employee relations.",
    status: "active",
    salary: 70000,
  },
  {
    employee_id: "E004",
    name: "Bob Brown",
    department: "Engineering",
    position: "DevOps Engineer",
    bio: "Bob focuses on system automation.",
    status: "inactive",
    salary: 85000,
  },
  {
    employee_id: "E005",
    name: "Carol White",
    department: "Sales",
    position: "Sales Representative",
    bio: "Carol has a knack for closing deals.",
    status: "active",
    salary: 75000,
  },
  {
    employee_id: "E006",
    name: "David Green",
    department: "Engineering",
    position: "Data Scientist",
    bio: "David analyzes company data to drive decisions.",
    status: "active",
    salary: 95000,
  },
  {
    employee_id: "E007",
    name: "Eve Black",
    department: "Finance",
    position: "Accountant",
    bio: "Eve manages the company's finances.",
    status: "active",
    salary: 72000,
  },
  {
    employee_id: "E008",
    name: "Frank Blue",
    department: "Customer Support",
    position: "Support Specialist",
    bio: "Frank ensures customer satisfaction.",
    status: "active",
    salary: 68000,
  },
];

async function main() {
    await prisma.employee.deleteMany()
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    await prisma.employee.upsert({
      where: { employee_id: employee.employee_id },
      update: {},
      create: {
        employee_id: employee.employee_id,
        name: employee.name,
        department: employee.department,
        position: employee.position,
        bio: employee.bio,
        status: employee.status,
        salary: employee.salary,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
