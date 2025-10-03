import { useState } from "react";
import { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Edit, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmployeeTableProps {
  employees: Employee[];
  onViewResume?: (employee: Employee) => void;
  onEdit?: (employee: Employee) => void;
  showActions?: boolean;
}

export const EmployeeTable = ({ 
  employees, 
  onViewResume, 
  onEdit,
  showActions = true 
}: EmployeeTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJobType, setFilterJobType] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState<string>("");
  const [filterDateTo, setFilterDateTo] = useState<string>("");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm);
    
    const matchesJobType = filterJobType === "all" || emp.jobType === filterJobType;
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
    
    const empDate = new Date(emp.applicationDate);
    const matchesDateFrom = !filterDateFrom || empDate >= new Date(filterDateFrom);
    const matchesDateTo = !filterDateTo || empDate <= new Date(filterDateTo);

    return matchesSearch && matchesJobType && matchesDepartment && matchesDateFrom && matchesDateTo;
  });

  const departments = Array.from(new Set(employees.map(e => e.department)));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 p-4 bg-card rounded-xl shadow-card">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาชื่อหรือเบอร์โทร..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterJobType} onValueChange={setFilterJobType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="ประเภทงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกประเภท</SelectItem>
            <SelectItem value="ส่วนกลาง">ส่วนกลาง</SelectItem>
            <SelectItem value="ผู้บริหารคนไทย">ผู้บริหารคนไทย</SelectItem>
            <SelectItem value="ผู้บริหารต่างชาติ">ผู้บริหารต่างชาติ</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="หน่วยงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกหน่วยงาน</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2 items-center">
          <Input
            type="date"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
            className="w-[160px]"
            placeholder="วันที่เริ่มต้น"
          />
          <span className="text-muted-foreground">ถึง</span>
          <Input
            type="date"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
            className="w-[160px]"
            placeholder="วันที่สิ้นสุด"
          />
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">วันที่สมัคร</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">ชื่อ-นามสกุล</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">เบอร์โทร</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">ที่อยู่</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">ผู้รับสมัคร</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">หน่วยงาน</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">ประเภทงาน</th>
                {showActions && <th className="px-4 py-3 text-right text-sm font-semibold">จัดการ</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm">
                    {new Date(employee.applicationDate).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm">{employee.phone}</td>
                  <td className="px-4 py-3 text-sm max-w-[200px] truncate">{employee.address}</td>
                  <td className="px-4 py-3 text-sm">{employee.recruiter}</td>
                  <td className="px-4 py-3 text-sm">{employee.department}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-xs">
                      {employee.jobType}
                    </Badge>
                  </td>
                  {showActions && (
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        {onViewResume && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewResume(employee)}
                            className="gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            ดูเอกสาร
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            size="sm"
                            onClick={() => onEdit(employee)}
                            className="gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            แก้ไข
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            ไม่พบข้อมูลพนักงาน
          </div>
        )}
      </div>
    </div>
  );
};
