import { useEmployees } from "@/contexts/EmployeeContext";
import { Employee, EmployeeStatus } from "@/types/employee";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommentSection } from "@/components/CommentSection";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Settings2 } from "lucide-react";

const statusOptions: { value: EmployeeStatus; label: string }[] = [
  { value: "ส่งสัมภาษณ์", label: "ส่งสัมภาษณ์" },
  { value: "รับจ๊อบรายวัน", label: "รับจ๊อบรายวัน" },
  { value: "เริ่มงาน", label: "เริ่มงาน" },
  { value: "ประเมิน", label: "ประเมิน" },
  { value: "ไม่ผ่านสัมภาษณ์", label: "ไม่ผ่านสัมภาษณ์" },
  { value: "สละสิทธ์", label: "สละสิทธ์" },
  { value: "เปลี่ยนผู้รับผิดชอบ", label: "เปลี่ยนผู้รับผิดชอบ" },
];

export default function EmployeeManagement() {
  const { getEmployeesByStatus, updateEmployee, addComment, employees } = useEmployees();
  const managementEmployees = getEmployeesByStatus([
    "screening",
    "ส่งสัมภาษณ์",
    "รับจ๊อบรายวัน",
    "ประเมิน",
    "ไม่ผ่านสัมภาษณ์"
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<EmployeeStatus | "">("");
  const [filterAssignedTo, setFilterAssignedTo] = useState<string>("all");
  const [filterJobType, setFilterJobType] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterRecruiter, setFilterRecruiter] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const assignedToList = Array.from(new Set(employees.map(e => e.assignedTo).filter(Boolean))) as string[];
  const departments = Array.from(new Set(employees.map(e => e.department)));
  const recruiters = Array.from(new Set(employees.map(e => e.recruiter)));

  const filteredEmployees = managementEmployees.filter((emp) => {
    const matchesAssignedTo = filterAssignedTo === "all" || emp.assignedTo === filterAssignedTo;
    const matchesJobType = filterJobType === "all" || emp.jobType === filterJobType;
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
    const matchesRecruiter = filterRecruiter === "all" || emp.recruiter === filterRecruiter;
    const matchesStatus = filterStatus === "all" || emp.status === filterStatus;

    return matchesAssignedTo && matchesJobType && matchesDepartment && matchesRecruiter && matchesStatus;
  });

  const handleUpdateStatus = (employee: Employee) => {
    setSelectedEmployee(employee);
    setNewStatus("");
    setDialogOpen(true);
  };

  const handleSaveStatus = () => {
    if (selectedEmployee && newStatus) {
      const statusMap: Record<string, EmployeeStatus> = {
        "เริ่มงาน": "เริ่มงาน",
        "สละสิทธ์": "สละสิทธ์",
        "เปลี่ยนผู้รับผิดชอบ": "pending",
      };

      const finalStatus = statusMap[newStatus] || newStatus;
      
      updateEmployee(selectedEmployee.id, { status: finalStatus });
      
      if (newStatus === "เริ่มงาน") {
        toast.success("ย้ายไปหน้าพนักงานเริ่มงานแล้ว");
      } else if (newStatus === "สละสิทธ์") {
        toast.success("ย้ายไปหน้าสละสิทธ์แล้ว");
      } else if (newStatus === "เปลี่ยนผู้รับผิดชอบ") {
        toast.success("ส่งกลับไปหน้าคัดกรองแล้ว");
      } else {
        toast.success("อัพเดทสถานะสำเร็จ");
      }
      
      setDialogOpen(false);
    } else {
      toast.error("กรุณาเลือกสถานะ");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">จัดการพนักงาน</h1>
        <p className="text-muted-foreground">
          พนักงานที่ผ่านการคัดกรองและกำลังอยู่ในขั้นตอนต่างๆ
        </p>
      </div>

      <div className="flex flex-wrap gap-4 p-4 bg-card rounded-xl shadow-card mb-4">
        <Select value={filterAssignedTo} onValueChange={setFilterAssignedTo}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="ผู้รับผิดชอบ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกคน</SelectItem>
            {assignedToList.map(person => (
              <SelectItem key={person} value={person}>{person}</SelectItem>
            ))}
          </SelectContent>
        </Select>

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

        <Select value={filterRecruiter} onValueChange={setFilterRecruiter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="ผู้รับสมัคร" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกคน</SelectItem>
            {recruiters.map(rec => (
              <SelectItem key={rec} value={rec}>{rec}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="สถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกสถานะ</SelectItem>
            <SelectItem value="screening">คัดกรอง</SelectItem>
            <SelectItem value="ส่งสัมภาษณ์">ส่งสัมภาษณ์</SelectItem>
            <SelectItem value="รับจ๊อบรายวัน">รับจ๊อบรายวัน</SelectItem>
            <SelectItem value="ประเมิน">ประเมิน</SelectItem>
            <SelectItem value="ไม่ผ่านสัมภาษณ์">ไม่ผ่านสัมภาษณ์</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl shadow-card">
          <Settings2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">ไม่มีพนักงานที่ต้องจัดการ</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-card rounded-xl shadow-card p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ชื่อ-นามสกุล</p>
                  <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ประเภทงาน</p>
                  <p className="font-medium">{employee.jobType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">หน่วยงาน</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ผู้รับผิดชอบ</p>
                  <p className="font-medium">{employee.assignedTo || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ที่อยู่</p>
                  <p className="font-medium text-sm">{employee.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ผู้รับสมัคร</p>
                  <p className="font-medium">{employee.recruiter}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">สถานะ</p>
                  <Badge variant="secondary">{employee.status}</Badge>
                </div>
              </div>

              {employee.comments.length > 0 && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">ความคิดเห็น:</p>
                  <div className="space-y-2">
                    {employee.comments.slice(-3).map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <span className="font-medium text-primary">{comment.author}:</span>{" "}
                        {comment.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={() => handleUpdateStatus(employee)} className="gap-2">
                  <Settings2 className="w-4 h-4" />
                  อัพเดทสถานะ
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>อัพเดทสถานะพนักงาน</DialogTitle>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-4 py-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2">
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  สถานะปัจจุบัน: <Badge variant="secondary">{selectedEmployee.status}</Badge>
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">เลือกสถานะใหม่</label>
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value as EmployeeStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <CommentSection
                comments={selectedEmployee.comments}
                onAddComment={(text, author) => {
                  addComment(selectedEmployee.id, { text, author });
                }}
              />

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleSaveStatus}>
                  บันทึก
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
