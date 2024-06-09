"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditEmployee from "../edit-employee/page";
import { MdDelete } from "react-icons/md";
import NewEmployee from "../new-employee/page";
import { AiOutlineDelete } from "react-icons/ai";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { EditEmployeeForm } from "../edit-employee/edit-employee-form";
import { FaEdit } from "react-icons/fa";

export default function EmployeeList() {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get("/api/employees").then((response) => {
      setEmployees(response.data.employees);
    });
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const deleteEmployee = (employeeId) => {
    if (confirm("Are you sure?")) {
      axios.delete(`/api/employee?id=${employeeId}`).then(() => {
        setEmployees(employees.filter((employee) => employee.id != employeeId));
        // window.location = "/";
      });
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  let employee = null
  if (employees.length > 0) {
    employee = employees[0]
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <Package2Icon className="w-6 h-6" />
            <span className="text-lg font-bold">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6"></nav>
          <div className="flex items-center gap-4"></div>
        </div>
      </header>
      <main className="flex-1 p-6">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Employees</h1>
          <div className="flex items-center gap-4">
            <NewEmployee />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={sortColumn}
                  onValueChange={(value) => handleSort(value)}
                >
                  <DropdownMenuRadioItem value="name">
                    Name
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="position">
                    Position
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="department">
                    Department
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Status">
                    Status
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="border shadow-sm rounded-lg">
        

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    <EditEmployee employee={employee} />
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="bordered"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      <AiOutlineDelete color={"red"} size={22} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

              
        </div>
      </main>
      
    </div>
  );
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
