import { Users, Filter, Settings, Briefcase, UserX, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/all-employees", icon: Users, label: "รายชื่อพนักงาน" },
  { path: "/screening", icon: Filter, label: "คัดกรอง" },
  { path: "/management", icon: Settings, label: "จัดการพนักงาน" },
  { path: "/started-work", icon: Briefcase, label: "พนักงานเริ่มงาน" },
  { path: "/resigned", icon: UserX, label: "สละสิทธ์" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-primary">Driver Siamraj</h1>
        <p className="text-sm text-muted-foreground mt-1">ระบบจัดการพนักงาน</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-sidebar-foreground"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 bg-sidebar-accent rounded-xl">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@siamraj.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
