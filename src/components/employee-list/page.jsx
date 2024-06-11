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
import { AiOutlineDelete } from "react-icons/ai";
import EditEmployee from "../edit-employee/page";
import NewEmployee from "../new-employee/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "../ui/dialog";
import { FaEdit } from "react-icons/fa";

export default function EmployeeList() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get("/api/employees").then((response) => {
      setEmployees(response.data.employees);
    });
  }, []);

  // Function to remove a filter

  const applyFilters = () => {
    return employees.filter((item) => {
      return filters.every(
        (filter) => item[filter[0]] == filter[1] || filter[1] == null
      );
    });
  };

  const filteredList = applyFilters();

  const filteredEmployees = filteredList.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const deleteEmployee = (employeeId) => {
    if (confirm("Are you sure?")) {
      axios.delete(`/api/employee/${employeeId}`).then(() => {
        setEmployees(employees.filter((employee) => employee.id != employeeId));
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

  const addFilter = (column, value) => {
    let replaced = false;
    let newFilters = [];
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      if (column == filter[0]) {
        newFilters.push([column, value]);
        replaced = true;
      } else {
        newFilters.push(filter);
      }
    }
    if (!replaced) {
      newFilters.push([column, value]);
    }
    console.log("newFilters", newFilters);
    setFilters(newFilters);
  };

  let employee = null;

  if (employees.length > 0) {
    employee = employees[0];
  }

  return (
    <div className="flex flex-col h-screen">
      <Dialog>
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
          <div className="flex items-center justify-between mb-6 flex-wrap">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">Employees</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <NewEmployee />
              <Select
                onValueChange={(value) => {
                  addFilter("department", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Department</SelectLabel>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Customer Support">
                      Customer Support{" "}
                    </SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value={null}>All</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  addFilter("status", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value={null}>All</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                      <DialogTrigger>
                        <Button
                          variant="link"
                          onClick={() => setEditableEmployee(employee)}
                        >
                          {employee.name} <FaEdit className="ml-2" />
                        </Button>
                      </DialogTrigger>
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
        {editableEmployee && <EditEmployee employee={editableEmployee} />}
      </Dialog>
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
