import { useEmployees } from "@/contexts/EmployeeContext";
import { Employee } from "@/types/employee";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Briefcase, RotateCcw } from "lucide-react";

export default function StartedWork() {
  const { getEmployeesByStatus, updateEmployee } = useEmployees();
  const workingEmployees = getEmployeesByStatus("เริ่มงาน");

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSendBackToScreening = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleConfirmSendBack = () => {
    if (selectedEmployee) {
      updateEmployee(selectedEmployee.id, { status: "pending", assignedTo: undefined });
      toast.success("ส่งกลับไปหน้าคัดกรองแล้ว");
      setDialogOpen(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">พนักงานเริ่มงาน</h1>
        <p className="text-muted-foreground">พนักงานที่เริ่มงานแล้วในปัจจุบัน</p>
      </div>

      {workingEmployees.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl shadow-card">
          <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">ยังไม่มีพนักงานที่เริ่มงาน</p>
        </div>
      ) : (
        <div className="space-y-4">
          {workingEmployees.map((employee) => (
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
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">ที่อยู่</p>
                  <p className="font-medium text-sm">{employee.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ผู้รับสมัคร</p>
                  <p className="font-medium">{employee.recruiter}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">สถานะ</p>
                  <Badge className="bg-green-500 hover:bg-green-600">{employee.status}</Badge>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => handleSendBackToScreening(employee)}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  ส่งกลับไปคัดกรองใหม่
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการส่งกลับ</DialogTitle>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-4 py-4">
              <p className="text-sm">
                คุณต้องการส่ง <span className="font-medium">{selectedEmployee.firstName} {selectedEmployee.lastName}</span> กลับไปหน้าคัดกรองใหม่ใช่หรือไม่?
              </p>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleConfirmSendBack}>
                  ยืนยัน
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
