export type JobType = "ส่วนกลาง" | "ผู้บริหารคนไทย" | "ผู้บริหารต่างชาติ";

export type EmployeeStatus = 
  | "pending" // รอการคัดกรอง
  | "screening" // อยู่ในขั้นตอนคัดกรอง
  | "ส่งสัมภาษณ์"
  | "รับจ๊อบรายวัน"
  | "เริ่มงาน"
  | "ประเมิน"
  | "ไม่ผ่านสัมภาษณ์"
  | "สละสิทธ์"
  | "เปลี่ยนผู้รับผิดชอบ";

export interface Comment {
  id: string;
  text: string;
  date: string;
  author: string;
}

export interface Employee {
  id: string;
  applicationDate: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  recruiter: string;
  department: string;
  jobType: JobType;
  resumeUrl?: string;
  status: EmployeeStatus;
  assignedTo?: string;
  comments: Comment[];
}
