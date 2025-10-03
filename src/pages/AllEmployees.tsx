import { useEmployees } from "@/contexts/EmployeeContext";
import { EmployeeTable } from "@/components/EmployeeTable";
import { Employee } from "@/types/employee";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AllEmployees() {
  const { employees, updateEmployee } = useEmployees();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Employee>>({});

  const handleViewResume = (employee: Employee) => {
    toast.info(`ดูเอกสารของ ${employee.firstName} ${employee.lastName}`);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditedData(employee);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedEmployee) {
      updateEmployee(selectedEmployee.id, editedData);
      toast.success("บันทึกข้อมูลสำเร็จ");
      setEditDialogOpen(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">รายชื่อพนักงานในระบบ</h1>
        <p className="text-muted-foreground">ข้อมูลพนักงานทั้งหมดที่สมัครงาน</p>
      </div>

      <EmployeeTable
        employees={employees}
        onViewResume={handleViewResume}
        onEdit={handleEdit}
      />

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูลพนักงาน</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ชื่อ</Label>
                <Input
                  value={editedData.firstName || ""}
                  onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>นามสกุล</Label>
                <Input
                  value={editedData.lastName || ""}
                  onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>เบอร์โทร</Label>
              <Input
                value={editedData.phone || ""}
                onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>ที่อยู่</Label>
              <Input
                value={editedData.address || ""}
                onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>หน่วยงานที่ต้องการ</Label>
              <Input
                value={editedData.department || ""}
                onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                ยกเลิก
              </Button>
              <Button onClick={handleSaveEdit}>
                บันทึก
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
