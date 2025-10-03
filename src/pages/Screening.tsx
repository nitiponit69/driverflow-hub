import { useEmployees } from "@/contexts/EmployeeContext";
import { Employee } from "@/types/employee";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommentSection } from "@/components/CommentSection";
import { EmployeeTable } from "@/components/EmployeeTable";
import { toast } from "sonner";
import { UserCheck } from "lucide-react";

const responsiblePersons = ["วิว", "ครีม", "เมย์"];

export default function Screening() {
  const { getEmployeesByStatus, updateEmployee, addComment } = useEmployees();
  const pendingEmployees = getEmployeesByStatus("pending");
  
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");

  const handleAssign = (employee: Employee) => {
    setSelectedEmployee(employee);
    setAssignedTo("");
    setDialogOpen(true);
  };

  const handleSaveAssignment = () => {
    if (selectedEmployee && assignedTo) {
      updateEmployee(selectedEmployee.id, {
        assignedTo,
        status: "screening"
      });
      toast.success(`มอบหมายให้ ${assignedTo} แล้ว`);
      setDialogOpen(false);
    } else {
      toast.error("กรุณาเลือกผู้รับผิดชอบ");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">หน้าคัดกรอง</h1>
        <p className="text-muted-foreground">
          พนักงานที่รอการคัดกรองและมอบหมายผู้รับผิดชอบ
        </p>
      </div>

      {pendingEmployees.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl shadow-card">
          <UserCheck className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">ไม่มีพนักงานที่รอคัดกรอง</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingEmployees.map((employee) => (
            <div key={employee.id} className="bg-card rounded-xl shadow-card p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ชื่อ-นามสกุล</p>
                  <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">เบอร์โทร</p>
                  <p className="font-medium">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ประเภทงาน</p>
                  <p className="font-medium">{employee.jobType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">หน่วยงาน</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleAssign(employee)} className="gap-2">
                  <UserCheck className="w-4 h-4" />
                  เลือกผู้รับผิดชอบ
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>มอบหมายผู้รับผิดชอบ</DialogTitle>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="space-y-4 py-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2">
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedEmployee.department} - {selectedEmployee.jobType}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">เลือกผู้รับผิดชอบ</label>
                <Select value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกผู้รับผิดชอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    {responsiblePersons.map((person) => (
                      <SelectItem key={person} value={person}>
                        {person}
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
                <Button onClick={handleSaveAssignment}>
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
