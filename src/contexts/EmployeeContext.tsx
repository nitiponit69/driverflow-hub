import React, { createContext, useContext, useState, ReactNode } from "react";
import { Employee, Comment, EmployeeStatus } from "@/types/employee";

// Dummy Data
const initialEmployees: Employee[] = [
  {
    id: "1",
    applicationDate: "2025-01-15",
    firstName: "สมชาย",
    lastName: "ใจดี",
    phone: "081-234-5678",
    address: "123 ถ.สุขุมวิท กรุงเทพฯ",
    recruiter: "วิชัย",
    department: "ขนส่ง",
    jobType: "ส่วนกลาง",
    status: "pending",
    comments: [],
  },
  {
    id: "2",
    applicationDate: "2025-01-16",
    firstName: "สมหญิง",
    lastName: "รักษ์ดี",
    phone: "082-345-6789",
    address: "456 ถ.พระราม 4 กรุงเทพฯ",
    recruiter: "สุชาติ",
    department: "โลจิสติกส์",
    jobType: "ผู้บริหารคนไทย",
    status: "pending",
    comments: [],
  },
  {
    id: "3",
    applicationDate: "2025-01-17",
    firstName: "วิชัย",
    lastName: "สมบูรณ์",
    phone: "083-456-7890",
    address: "789 ถ.รัชดา กรุงเทพฯ",
    recruiter: "ประสิทธิ์",
    department: "ขนส่ง",
    jobType: "ผู้บริหารต่างชาติ",
    status: "pending",
    comments: [],
  },
  {
    id: "4",
    applicationDate: "2025-01-18",
    firstName: "ประเสริฐ",
    lastName: "เจริญสุข",
    phone: "084-567-8901",
    address: "321 ถ.เพชรบุรี กรุงเทพฯ",
    recruiter: "วิชัย",
    department: "บริหาร",
    jobType: "ส่วนกลาง",
    status: "pending",
    comments: [],
  },
  {
    id: "5",
    applicationDate: "2025-01-19",
    firstName: "สุดา",
    lastName: "มั่นคง",
    phone: "085-678-9012",
    address: "654 ถ.ลาดพร้าว กรุงเทพฯ",
    recruiter: "สุชาติ",
    department: "ขนส่ง",
    jobType: "ผู้บริหารคนไทย",
    status: "pending",
    comments: [],
  },
  {
    id: "6",
    applicationDate: "2025-01-20",
    firstName: "ธนากร",
    lastName: "วงษ์ใหญ่",
    phone: "086-789-0123",
    address: "987 ถ.พหลโยธิน กรุงเทพฯ",
    recruiter: "ประสิทธิ์",
    department: "โลจิสติกส์",
    jobType: "ส่วนกลาง",
    status: "pending",
    comments: [],
  },
  {
    id: "7",
    applicationDate: "2025-01-21",
    firstName: "นภา",
    lastName: "สว่างใจ",
    phone: "087-890-1234",
    address: "147 ถ.บางนา กรุงเทพฯ",
    recruiter: "วิชัย",
    department: "ขนส่ง",
    jobType: "ผู้บริหารต่างชาติ",
    status: "pending",
    comments: [],
  },
  {
    id: "8",
    applicationDate: "2025-01-22",
    firstName: "อนุชา",
    lastName: "พัฒนา",
    phone: "088-901-2345",
    address: "258 ถ.วิภาวดี กรุงเทพฯ",
    recruiter: "สุชาติ",
    department: "บริหาร",
    jobType: "ส่วนกลาง",
    status: "pending",
    comments: [],
  },
  {
    id: "9",
    applicationDate: "2025-01-23",
    firstName: "มานี",
    lastName: "รุ่งเรือง",
    phone: "089-012-3456",
    address: "369 ถ.รามคำแหง กรุงเทพฯ",
    recruiter: "ประสิทธิ์",
    department: "ขนส่ง",
    jobType: "ผู้บริหารคนไทย",
    status: "pending",
    comments: [],
  },
  {
    id: "10",
    applicationDate: "2025-01-24",
    firstName: "วรรณา",
    lastName: "เพชรดี",
    phone: "090-123-4567",
    address: "741 ถ.ศรีนครินทร์ กรุงเทพฯ",
    recruiter: "วิชัย",
    department: "โลจิสติกส์",
    jobType: "ส่วนกลาง",
    status: "pending",
    comments: [],
  },
];

interface EmployeeContextType {
  employees: Employee[];
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  addComment: (id: string, comment: Omit<Comment, "id" | "date">) => void;
  getEmployeesByStatus: (status: EmployeeStatus | EmployeeStatus[]) => Employee[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp))
    );
  };

  const addComment = (id: string, comment: Omit<Comment, "id" | "date">) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              comments: [
                ...emp.comments,
                {
                  ...comment,
                  id: Date.now().toString(),
                  date: new Date().toISOString(),
                },
              ],
            }
          : emp
      )
    );
  };

  const getEmployeesByStatus = (status: EmployeeStatus | EmployeeStatus[]) => {
    const statuses = Array.isArray(status) ? status : [status];
    return employees.filter((emp) => statuses.includes(emp.status));
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, updateEmployee, addComment, getEmployeesByStatus }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within EmployeeProvider");
  }
  return context;
};
