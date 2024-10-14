import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import AddEmployee from "./AddEmployee";
import AddDepartment from "./AddDepartment";

interface Department {
  _id: string;
  name: string;
  description: string;
}

interface Employee {
  _id: string;
  name: string;
  department: Department;
  address: string;
}

interface EmployeesResponse {
  employees: Employee[];
  totalEmployees: number;
  totalPages: number;
  currentPage: number;
}

const fetchEmployees = async (page: number): Promise<EmployeesResponse> => {
  const { data } = await axios.get<EmployeesResponse>(
    `http://localhost:5000/api/employees/getAllEmployess?page=${page}`
  );
  return data;
};

const AdvancedTableComponent: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees", currentPage],
    queryFn: () => fetchEmployees(currentPage),
    staleTime: Infinity,
  });

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "_id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "department.name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "department.description",
      header: "Department Description",
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.employees.filter((employee) => {
      const nameMatch = employee.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const departmentMatch = employee.department.name
        .toLowerCase()
        .includes(departmentFilter.toLowerCase());
      return nameMatch && departmentMatch;
    });
  }, [data, nameFilter, departmentFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    pageCount: data?.totalPages || -1,
    manualPagination: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="space-y-4 mx-8 my-20">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Search by department"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="max-w-sm"
        />
        <AddEmployee />
        <AddDepartment />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center px-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {currentPage} of {data?.totalPages || 1}
            </strong>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(data?.totalPages || 1, prev + 1)
              )
            }
            disabled={currentPage === (data?.totalPages || 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTableComponent;
