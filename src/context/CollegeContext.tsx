import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Role,
  Department,
  Course,
  Subject,
  StudentProfile,
  SubjectAttendance,
  TimetableEntry,
  Assignment,
  StudyMaterial,
  ExamScheduleItem,
  SemesterResult,
  FeeItem,
  PaymentReceipt,
  CertificateRequest,
  PlacementDrive,
  LibraryBookItem,
  BookIssueRecord,
  NoticeItem,
  EventItem,
  NewsItem,
  GalleryItem,
  ComplaintTicket,
  FeedbackSubmission,
  AdmissionApplication,
  AppNotification,
  AuditLogItem,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_COURSES,
  INITIAL_SUBJECTS,
  CURRENT_STUDENT,
  SUBJECT_ATTENDANCE,
  TIMETABLE_DATA,
  INITIAL_ASSIGNMENTS,
  INITIAL_STUDY_MATERIALS,
  EXAM_SCHEDULE,
  RECENT_RESULTS,
  INITIAL_FEES,
  INITIAL_RECEIPTS,
  INITIAL_CERTIFICATES,
  INITIAL_PLACEMENTS,
  INITIAL_LIBRARY_BOOKS,
  INITIAL_BOOK_ISSUES,
  INITIAL_NOTICES,
  INITIAL_EVENTS,
  INITIAL_NEWS,
  INITIAL_GALLERY,
  INITIAL_COMPLAINTS,
  INITIAL_FEEDBACK,
  INITIAL_ADMISSIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockDatabase';

interface CollegeContextType {
  // Auth & View
  currentUser: User | null;
  currentRole: Role;
  activeView: 'public' | 'portal';
  activePortalTab: string;
  setActiveView: (view: 'public' | 'portal') => void;
  setActivePortalTab: (tab: string) => void;
  login: (email: string, role?: Role) => boolean;
  logout: () => void;
  switchRole: (role: Role) => void;

  // Data Collections
  departments: Department[];
  courses: Course[];
  subjects: Subject[];
  studentProfile: StudentProfile;
  subjectAttendance: SubjectAttendance[];
  timetable: TimetableEntry[];
  assignments: Assignment[];
  studyMaterials: StudyMaterial[];
  examSchedule: ExamScheduleItem[];
  recentResult: SemesterResult;
  fees: FeeItem[];
  receipts: PaymentReceipt[];
  certificates: CertificateRequest[];
  placements: PlacementDrive[];
  libraryBooks: LibraryBookItem[];
  bookIssues: BookIssueRecord[];
  notices: NoticeItem[];
  events: EventItem[];
  news: NewsItem[];
  gallery: GalleryItem[];
  complaints: ComplaintTicket[];
  feedback: FeedbackSubmission[];
  admissions: AdmissionApplication[];
  notifications: AppNotification[];
  auditLogs: AuditLogItem[];

  // Mutations
  addNotice: (notice: Omit<NoticeItem, 'id' | 'publishedDate'>) => void;
  deleteNotice: (id: string) => void;
  toggleNoticePublish: (id: string) => void;
  registerForEvent: (eventId: string) => void;
  addEvent: (event: Omit<EventItem, 'id' | 'registeredCount'>) => void;
  submitAssignment: (assignmentId: string, remarks?: string) => void;
  createAssignment: (asg: Omit<Assignment, 'id' | 'postedDate' | 'submitted'>) => void;
  markAttendanceBatch: (subjectCode: string, records: { rollNo: string; name: string; present: boolean }[]) => void;
  payFees: (feeId: string, amount: number, method: 'UPI' | 'Net Banking' | 'Debit Card' | 'Demand Draft') => PaymentReceipt;
  requestCertificate: (type: CertificateRequest['type'], purpose: string) => void;
  updateCertificateStatus: (id: string, status: CertificateRequest['status'], certificateNo?: string) => void;
  applyForPlacement: (placementId: string) => void;
  addPlacementDrive: (drive: Omit<PlacementDrive, 'id' | 'appliedCount' | 'hasApplied'>) => void;
  issueBook: (bookId: string, studentId: string, studentName: string) => void;
  returnBook: (issueId: string) => void;
  submitComplaint: (title: string, category: ComplaintTicket['category'], description: string) => void;
  updateComplaintStatus: (id: string, status: ComplaintTicket['status'], resolution?: string) => void;
  submitFeedback: (category: FeedbackSubmission['category'], rating: number, comments: string, facultyOrSubject?: string) => void;
  submitAdmissionApplication: (application: Omit<AdmissionApplication, 'id' | 'applicationNo' | 'appliedDate' | 'status'>) => string;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], remarks?: string) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  resetDatabase: () => void;
  searchFilterQuery: string;
  setSearchFilterQuery: (q: string) => void;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export const CollegeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial user: default to Student for rich showcase, or super_admin
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return INITIAL_USERS.find((u) => u.role === 'STUDENT') || INITIAL_USERS[0];
  });
  const [activeView, setActiveView] = useState<'public' | 'portal'>('public');
  const [activePortalTab, setActivePortalTab] = useState<string>('dashboard');
  const [searchFilterQuery, setSearchFilterQuery] = useState<string>('');

  // Main state collections
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(CURRENT_STUDENT);
  const [subjectAttendance, setSubjectAttendance] = useState<SubjectAttendance[]>(SUBJECT_ATTENDANCE);
  const [timetable] = useState<TimetableEntry[]>(TIMETABLE_DATA);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [studyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [examSchedule] = useState<ExamScheduleItem[]>(EXAM_SCHEDULE);
  const [recentResult] = useState<SemesterResult>(RECENT_RESULTS);
  const [fees, setFees] = useState<FeeItem[]>(INITIAL_FEES);
  const [receipts, setReceipts] = useState<PaymentReceipt[]>(INITIAL_RECEIPTS);
  const [certificates, setCertificates] = useState<CertificateRequest[]>(INITIAL_CERTIFICATES);
  const [placements, setPlacements] = useState<PlacementDrive[]>(INITIAL_PLACEMENTS);
  const [libraryBooks, setLibraryBooks] = useState<LibraryBookItem[]>(INITIAL_LIBRARY_BOOKS);
  const [bookIssues, setBookIssues] = useState<BookIssueRecord[]>(INITIAL_BOOK_ISSUES);
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [complaints, setComplaints] = useState<ComplaintTicket[]>(INITIAL_COMPLAINTS);
  const [feedback, setFeedback] = useState<FeedbackSubmission[]>(INITIAL_FEEDBACK);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(INITIAL_ADMISSIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  const currentRole = currentUser?.role || 'STUDENT';

  // Helper for audit logging
  const logAudit = (action: string, module: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}`,
      userName: currentUser?.name || 'System / Guest',
      role: currentRole,
      action,
      module,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '103.21.124.9',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const login = (email: string, role?: Role): boolean => {
    let matchedUser = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!matchedUser && role) {
      matchedUser = INITIAL_USERS.find((u) => u.role === role);
    }
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setActiveView('portal');
      setActivePortalTab('dashboard');
      logAudit('LOGIN_SUCCESS', 'Authentication', `User logged in with email ${matchedUser.email} as ${matchedUser.role}`);
      return true;
    }
    return false;
  };

  const logout = () => {
    logAudit('LOGOUT', 'Authentication', `User ${currentUser?.name || ''} logged out`);
    setCurrentUser(null);
    setActiveView('public');
  };

  const switchRole = (newRole: Role) => {
    const targetUser = INITIAL_USERS.find((u) => u.role === newRole) || INITIAL_USERS[0];
    setCurrentUser(targetUser);
    setActiveView('portal');
    setActivePortalTab('dashboard');
    logAudit('SWITCH_ROLE', 'RBAC', `Switched active session to role ${newRole} (${targetUser.name})`);
  };

  // CMS: Notices
  const addNotice = (noticeData: Omit<NoticeItem, 'id' | 'publishedDate'>) => {
    const newNotice: NoticeItem = {
      ...noticeData,
      id: `not-${Date.now()}`,
      publishedDate: new Date().toISOString().split('T')[0],
    };
    setNotices((prev) => [newNotice, ...prev]);
    logAudit('CREATE_NOTICE', 'CMS / Notices', `Created notice: "${newNotice.title}" [Target: ${newNotice.targetRole}]`);
    // Add in-app notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New College Notice',
      message: newNotice.title,
      targetRole: newNotice.targetRole,
      timestamp: 'Just now',
      isRead: false,
      linkTab: 'notices',
      type: newNotice.isUrgent ? 'warning' : 'info',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    logAudit('DELETE_NOTICE', 'CMS / Notices', `Deleted notice with id ${id}`);
  };

  const toggleNoticePublish = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPublished: !n.isPublished } : n))
    );
    logAudit('TOGGLE_NOTICE_STATUS', 'CMS / Notices', `Toggled publish state for notice ${id}`);
  };

  // Events
  const registerForEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const registered = !ev.isRegistered;
          return {
            ...ev,
            isRegistered: registered,
            registeredCount: registered ? ev.registeredCount + 1 : Math.max(0, ev.registeredCount - 1),
          };
        }
        return ev;
      })
    );
    logAudit('REGISTER_EVENT', 'Events', `User registration updated for event ${eventId}`);
  };

  const addEvent = (eventData: Omit<EventItem, 'id' | 'registeredCount'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `ev-${Date.now()}`,
      registeredCount: 0,
    };
    setEvents((prev) => [newEvent, ...prev]);
    logAudit('CREATE_EVENT', 'CMS / Events', `Created new campus event: "${newEvent.title}"`);
  };

  // Assignments
  const submitAssignment = (assignmentId: string, remarks?: string) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              submitted: true,
              submissionDate: new Date().toISOString().split('T')[0],
              feedback: remarks ? `Self remarks: ${remarks}` : 'Under review by faculty',
            }
          : a
      )
    );
    logAudit('SUBMIT_ASSIGNMENT', 'Assignments', `Student submitted solution for assignment ${assignmentId}`);
  };

  const createAssignment = (asg: Omit<Assignment, 'id' | 'postedDate' | 'submitted'>) => {
    const newAsg: Assignment = {
      ...asg,
      id: `asg-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      submitted: false,
    };
    setAssignments((prev) => [newAsg, ...prev]);
    logAudit('CREATE_ASSIGNMENT', 'Faculty / Assignments', `Created assignment: "${newAsg.title}" for ${newAsg.subjectCode}`);
  };

  // Faculty Attendance Marking
  const markAttendanceBatch = (
    subjectCode: string,
    records: { rollNo: string; name: string; present: boolean }[]
  ) => {
    const presentCount = records.filter((r) => r.present).length;
    setSubjectAttendance((prev) =>
      prev.map((item) => {
        if (item.subjectCode === subjectCode) {
          const totalConducted = item.totalConducted + 1;
          const isRahulPresent = records.find((r) => r.rollNo.includes('42'))?.present ?? true;
          const totalAttended = isRahulPresent ? item.totalAttended + 1 : item.totalAttended;
          const percentage = Number(((totalAttended / totalConducted) * 100).toFixed(1));
          return { ...item, totalConducted, totalAttended, percentage };
        }
        return item;
      })
    );
    logAudit(
      'MARK_ATTENDANCE_BATCH',
      'Faculty / Attendance',
      `Marked attendance for ${subjectCode} (${presentCount}/${records.length} Present)`
    );
  };

  // Fees Payment
  const payFees = (
    feeId: string,
    amount: number,
    method: 'UPI' | 'Net Banking' | 'Debit Card' | 'Demand Draft'
  ): PaymentReceipt => {
    const rcpNumber = `SCSCO/REC/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    const txnId = `TXN_${method.replace(/\s+/g, '_').toUpperCase()}_${Date.now()}`;
    const newReceipt: PaymentReceipt = {
      id: `rcp-${Date.now()}`,
      receiptNo: rcpNumber,
      transactionId: txnId,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      enrollmentNo: studentProfile.enrollmentNo,
      amount,
      paymentMethod: method,
      date: new Date().toLocaleString(),
      academicYear: '2025-26',
      status: 'SUCCESS',
    };

    setFees((prev) =>
      prev.map((f) => {
        if (f.id === feeId) {
          const newPaid = f.paidAmount + amount;
          const newPending = Math.max(0, f.totalAmount - newPaid);
          const newStatus = newPending === 0 ? 'PAID' : 'PARTIAL';
          return { ...f, paidAmount: newPaid, pendingAmount: newPending, status: newStatus };
        }
        return f;
      })
    );
    setReceipts((prev) => [newReceipt, ...prev]);
    setStudentProfile((prev) => ({
      ...prev,
      pendingFees: Math.max(0, prev.pendingFees - amount),
    }));

    logAudit('PAY_FEES', 'Accounts / Fees', `Fee payment of ₹${amount.toLocaleString()} received via ${method} (Receipt: ${rcpNumber})`);
    return newReceipt;
  };

  // Certificates
  const requestCertificate = (type: CertificateRequest['type'], purpose: string) => {
    const newReq: CertificateRequest = {
      id: `cert-${Date.now()}`,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      enrollmentNo: studentProfile.enrollmentNo,
      departmentName: studentProfile.departmentName,
      type,
      purpose,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'REQUESTED',
      verificationToken: `SCSCO-${type.substring(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}-REQ`,
    };
    setCertificates((prev) => [newReq, ...prev]);
    logAudit('REQUEST_CERTIFICATE', 'Certificate Cell', `Requested ${type} certificate for purpose: "${purpose}"`);
  };

  const updateCertificateStatus = (
    id: string,
    status: CertificateRequest['status'],
    certificateNo?: string
  ) => {
    setCertificates((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const issuedNo = certificateNo || (status === 'ISSUED' ? `SCSCO/${c.type.substring(0, 3)}/2026/${Math.floor(100 + Math.random() * 900)}` : c.certificateNo);
          return {
            ...c,
            status,
            certificateNo: issuedNo,
            issueDate: status === 'ISSUED' ? new Date().toISOString().split('T')[0] : c.issueDate,
          };
        }
        return c;
      })
    );
    logAudit('UPDATE_CERTIFICATE_STATUS', 'Certificate Cell', `Updated certificate ${id} status to ${status}`);
  };

  // Placements
  const applyForPlacement = (placementId: string) => {
    setPlacements((prev) =>
      prev.map((p) => {
        if (p.id === placementId) {
          return {
            ...p,
            hasApplied: true,
            appliedCount: p.appliedCount + 1,
          };
        }
        return p;
      })
    );
    logAudit('APPLY_PLACEMENT', 'Placements', `Applied for campus drive ${placementId}`);
  };

  const addPlacementDrive = (drive: Omit<PlacementDrive, 'id' | 'appliedCount' | 'hasApplied'>) => {
    const newDrive: PlacementDrive = {
      ...drive,
      id: `plc-${Date.now()}`,
      appliedCount: 0,
      hasApplied: false,
    };
    setPlacements((prev) => [newDrive, ...prev]);
    logAudit('CREATE_PLACEMENT_DRIVE', 'Placements', `Posted recruitment drive: "${newDrive.companyName}" (${newDrive.packageOffered})`);
  };

  // Library
  const issueBook = (bookId: string, studentId: string, studentName: string) => {
    const book = libraryBooks.find((b) => b.id === bookId);
    if (!book || book.availableCopies <= 0) return;

    setLibraryBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b))
    );

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    const issueRecord: BookIssueRecord = {
      id: `iss-${Date.now()}`,
      bookId,
      bookTitle: book.title,
      studentId,
      studentName,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      fineAmount: 0,
      status: 'ISSUED',
    };
    setBookIssues((prev) => [issueRecord, ...prev]);
    logAudit('ISSUE_BOOK', 'Library', `Issued "${book.title}" to student ${studentName}`);
  };

  const returnBook = (issueId: string) => {
    const issue = bookIssues.find((i) => i.id === issueId);
    if (!issue) return;

    setBookIssues((prev) =>
      prev.map((i) =>
        i.id === issueId
          ? {
              ...i,
              status: 'RETURNED',
              returnDate: new Date().toISOString().split('T')[0],
            }
          : i
      )
    );
    setLibraryBooks((prev) =>
      prev.map((b) => (b.id === issue.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b))
    );
    logAudit('RETURN_BOOK', 'Library', `Returned book copy for issue ${issueId}`);
  };

  // Complaints
  const submitComplaint = (
    title: string,
    category: ComplaintTicket['category'],
    description: string
  ) => {
    const newCmp: ComplaintTicket = {
      id: `cmp-${Date.now()}`,
      ticketNo: `CMP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      description,
      submittedBy: currentUser?.name || 'Anonymous Student',
      submitterEmail: currentUser?.email || 'student@scsco.edu.in',
      role: currentRole,
      assignedTo: 'Redressal Committee',
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setComplaints((prev) => [newCmp, ...prev]);
    logAudit('SUBMIT_COMPLAINT', 'Grievance / Redressal', `Filed grievance ticket ${newCmp.ticketNo}: "${title}"`);
  };

  const updateComplaintStatus = (
    id: string,
    status: ComplaintTicket['status'],
    resolution?: string
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              resolution: resolution || c.resolution,
            }
          : c
      )
    );
    logAudit('UPDATE_COMPLAINT_STATUS', 'Grievance / Redressal', `Updated complaint ${id} status to ${status}`);
  };

  // Feedback
  const submitFeedback = (
    category: FeedbackSubmission['category'],
    rating: number,
    comments: string,
    facultyOrSubject?: string
  ) => {
    const newFb: FeedbackSubmission = {
      id: `fb-${Date.now()}`,
      category,
      rating,
      comments,
      facultyOrSubject,
      submittedByRole: currentRole,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setFeedback((prev) => [newFb, ...prev]);
    logAudit('SUBMIT_FEEDBACK', 'Feedback', `Submitted rating ${rating}/5 for ${category}`);
  };

  // Admissions
  const submitAdmissionApplication = (
    appData: Omit<AdmissionApplication, 'id' | 'applicationNo' | 'appliedDate' | 'status'>
  ): string => {
    const appNo = `APP-SCSCO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: AdmissionApplication = {
      ...appData,
      id: `adm-${Date.now()}`,
      applicationNo: appNo,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'SUBMITTED',
    };
    setAdmissions((prev) => [newApp, ...prev]);
    logAudit('SUBMIT_ADMISSION_APPLICATION', 'Admissions', `New online admission submitted: ${appNo} by ${newApp.fullName}`);
    return appNo;
  };

  const updateAdmissionStatus = (
    id: string,
    status: AdmissionApplication['status'],
    remarks?: string
  ) => {
    setAdmissions((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              remarks: remarks || a.remarks,
            }
          : a
      )
    );
    logAudit('UPDATE_ADMISSION_STATUS', 'Admissions', `Admission application ${id} status set to ${status}`);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Reset database back to default seed
  const resetDatabase = () => {
    setNotices(INITIAL_NOTICES);
    setEvents(INITIAL_EVENTS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setFees(INITIAL_FEES);
    setReceipts(INITIAL_RECEIPTS);
    setCertificates(INITIAL_CERTIFICATES);
    setPlacements(INITIAL_PLACEMENTS);
    setLibraryBooks(INITIAL_LIBRARY_BOOKS);
    setBookIssues(INITIAL_BOOK_ISSUES);
    setComplaints(INITIAL_COMPLAINTS);
    setAdmissions(INITIAL_ADMISSIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setStudentProfile(CURRENT_STUDENT);
    logAudit('RESET_DATABASE', 'System', 'Restored platform dataset to default realistic demo state');
  };

  return (
    <CollegeContext.Provider
      value={{
        currentUser,
        currentRole,
        activeView,
        activePortalTab,
        setActiveView,
        setActivePortalTab,
        login,
        logout,
        switchRole,
        departments,
        courses,
        subjects,
        studentProfile,
        subjectAttendance,
        timetable,
        assignments,
        studyMaterials,
        examSchedule,
        recentResult,
        fees,
        receipts,
        certificates,
        placements,
        libraryBooks,
        bookIssues,
        notices,
        events,
        news,
        gallery,
        complaints,
        feedback,
        admissions,
        notifications,
        auditLogs,
        addNotice,
        deleteNotice,
        toggleNoticePublish,
        registerForEvent,
        addEvent,
        submitAssignment,
        createAssignment,
        markAttendanceBatch,
        payFees,
        requestCertificate,
        updateCertificateStatus,
        applyForPlacement,
        addPlacementDrive,
        issueBook,
        returnBook,
        submitComplaint,
        updateComplaintStatus,
        submitFeedback,
        submitAdmissionApplication,
        updateAdmissionStatus,
        markNotificationRead,
        clearNotifications,
        resetDatabase,
        searchFilterQuery,
        setSearchFilterQuery,
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollege = () => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error('useCollege must be used within a CollegeProvider');
  }
  return context;
};
