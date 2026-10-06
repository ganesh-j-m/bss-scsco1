export type Role =
  | 'SUPER_ADMIN'
  | 'PRINCIPAL'
  | 'HOD'
  | 'FACULTY'
  | 'MODULE_OFFICER'
  | 'STUDENT'
  | 'PARENT'
  | 'ALUMNI';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  phone?: string;
  departmentCode?: string;
  studentId?: string; // For student / parent link
}

export interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
  hodName: string;
  hodEmail: string;
  intake: number;
  establishedYear: number;
  labCount: number;
  facultyCount: number;
  studentCount: number;
  image: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  degree: string;
  durationYear: number;
  departmentId: string;
  departmentName: string;
  totalSemesters: number;
  annualFees: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  departmentCode: string;
  facultyName: string;
  type: 'Theory' | 'Practical' | 'Elective';
}

export interface StudentProfile {
  id: string;
  userId: string;
  enrollmentNo: string;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  departmentCode: string;
  departmentName: string;
  courseName: string;
  currentYear: number;
  semester: number;
  division: string;
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelation: string;
  admissionDate: string;
  cgpa: number;
  attendancePercent: number;
  pendingFees: number;
  qrData: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  markedBy: string;
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  faculty: string;
  totalConducted: number;
  totalAttended: number;
  percentage: number;
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  subject: string;
  code: string;
  faculty: string;
  room: string;
  division: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface Assignment {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  deadline: string;
  totalMarks: number;
  facultyName: string;
  postedDate: string;
  attachments?: string;
  submitted?: boolean;
  submissionDate?: string;
  obtainedMarks?: number;
  feedback?: string;
}

export interface StudyMaterial {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  type: 'PDF' | 'PPT' | 'DOCX' | 'VIDEO';
  facultyName: string;
  uploadDate: string;
  fileSize: string;
  downloadUrl: string;
}

export interface ExamScheduleItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  time: string;
  room: string;
  examType: 'Mid-Sem' | 'End-Sem' | 'Practical Oral';
}

export interface MarkRecord {
  id: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  internalMarks: number;
  maxInternal: number;
  externalMarks: number;
  maxExternal: number;
  totalMarks: number;
  grade: string;
  gradePoint: number;
}

export interface SemesterResult {
  semester: number;
  academicYear: string;
  marks: MarkRecord[];
  sgpa: number;
  cgpa: number;
  totalCredits: number;
  status: 'PASS' | 'ATKT' | 'DISTINCTION';
  publishedDate: string;
}

export interface FeeItem {
  id: string;
  academicYear: string;
  category: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  status: 'PAID' | 'PARTIAL' | 'PENDING' | 'OVERDUE';
}

export interface PaymentReceipt {
  id: string;
  receiptNo: string;
  transactionId: string;
  studentId: string;
  studentName: string;
  enrollmentNo: string;
  amount: number;
  paymentMethod: 'UPI' | 'Net Banking' | 'Debit Card' | 'Demand Draft';
  date: string;
  academicYear: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

export interface CertificateRequest {
  id: string;
  certificateNo?: string;
  studentId: string;
  studentName: string;
  enrollmentNo: string;
  departmentName: string;
  type: 'BONAFIDE' | 'TRANSFER' | 'LEAVING' | 'CHARACTER' | 'NO_DUES';
  purpose: string;
  requestDate: string;
  issueDate?: string;
  status: 'REQUESTED' | 'VERIFYING' | 'APPROVED' | 'REJECTED' | 'ISSUED';
  verificationToken: string;
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  logo: string;
  rolesOffered: string;
  packageOffered: string;
  minCgpa: number;
  eligibleBranches: string[];
  driveDate: string;
  deadline: string;
  location: string;
  appliedCount: number;
  hasApplied?: boolean;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
}

export interface LibraryBookItem {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  category: string;
  shelfLocation: string;
  totalCopies: number;
  availableCopies: number;
}

export interface BookIssueRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fineAmount: number;
  status: 'ISSUED' | 'RETURNED' | 'OVERDUE';
}

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Examination' | 'Admission' | 'Placement' | 'General';
  targetRole: 'ALL' | 'STUDENT' | 'FACULTY' | 'PARENT';
  isUrgent: boolean;
  publishedDate: string;
  department?: string;
  attachmentName?: string;
  isPublished: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Workshop' | 'Conference';
  venue: string;
  eventDate: string;
  time: string;
  capacity: number;
  registeredCount: number;
  bannerUrl: string;
  isRegistered?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedDate: string;
  coverUrl: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Labs' | 'Sports' | 'Cultural' | 'Convocation';
  imageUrl: string;
  caption: string;
}

export interface ComplaintTicket {
  id: string;
  ticketNo: string;
  title: string;
  category: 'Academic' | 'Hostel' | 'Infrastructure' | 'Library' | 'Canteen' | 'Anti-Ragging';
  description: string;
  submittedBy: string;
  submitterEmail: string;
  role: Role;
  assignedTo: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  resolution?: string;
}

export interface FeedbackSubmission {
  id: string;
  category: 'Faculty Performance' | 'Course Curriculum' | 'Lab Facility' | 'Library' | 'Campus Life';
  facultyOrSubject?: string;
  rating: number; // 1 to 5
  comments: string;
  submittedByRole: string;
  createdAt: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNo: string;
  fullName: string;
  email: string;
  phone: string;
  courseApplied: string;
  departmentCode: string;
  previousSchool: string;
  qualifyingScore: number; // 12th % or CET/JEE percentile
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'PROVISIONAL';
  appliedDate: string;
  remarks?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  targetRole: string;
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
  type: 'info' | 'warning' | 'success' | 'alert';
}

export interface AuditLogItem {
  id: string;
  userName: string;
  role: Role;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}
