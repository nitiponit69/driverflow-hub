import { useEmployees } from "@/contexts/EmployeeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Filter, Settings, Briefcase, UserX, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { employees } = useEmployees();

  const stats = {
    total: employees.length,
    pending: employees.filter(e => e.status === "pending").length,
    screening: employees.filter(e => e.status === "screening").length,
    management: employees.filter(e => 
      ["ส่งสัมภาษณ์", "รับจ๊อบรายวัน", "ประเมิน", "ไม่ผ่านสัมภาษณ์"].includes(e.status)
    ).length,
    working: employees.filter(e => e.status === "เริ่มงาน").length,
    resigned: employees.filter(e => e.status === "สละสิทธ์").length,
  };

  const quickLinks = [
    { to: "/all-employees", icon: Users, label: "รายชื่อพนักงาน", color: "bg-blue-500" },
    { to: "/screening", icon: Filter, label: "คัดกรอง", color: "bg-purple-500" },
    { to: "/management", icon: Settings, label: "จัดการพนักงาน", color: "bg-orange-500" },
    { to: "/started-work", icon: Briefcase, label: "พนักงานเริ่มงาน", color: "bg-green-500" },
    { to: "/resigned", icon: UserX, label: "สละสิทธ์", color: "bg-red-500" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">ภาพรวมระบบจัดการพนักงาน Driver Siamraj</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-card hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">พนักงานทั้งหมด</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">ในระบบทั้งหมด</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">รอคัดกรอง</CardTitle>
            <Filter className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">ยังไม่ได้จัดการ</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">กำลังจัดการ</CardTitle>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{stats.management}</div>
            <p className="text-xs text-muted-foreground mt-1">อยู่ในขั้นตอน</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">เริ่มงานแล้ว</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{stats.working}</div>
            <p className="text-xs text-muted-foreground mt-1">พนักงานปัจจุบัน</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">สละสิทธ์</CardTitle>
            <UserX className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{stats.resigned}</div>
            <p className="text-xs text-muted-foreground mt-1">ออกจากระบบ</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">อัตราความสำเร็จ</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {stats.total > 0 ? Math.round((stats.working / stats.total) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">พนักงานเริ่มงาน</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>เมนูลัด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button
                  variant="outline"
                  className="w-full h-24 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">{link.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
