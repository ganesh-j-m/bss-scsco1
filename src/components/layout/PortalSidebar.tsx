import React from 'react';
import {
  LayoutDashboard,
  User,
  QrCode,
  CalendarCheck,
  Calendar,
  FileCheck2,
  FileSpreadsheet,
  GraduationCap,
  CreditCard,
  Award,
  Briefcase,
  BookOpen,
  MessageSquareWarning,
  Star,
  Users,
  Building2,
  BookMarked,
  ShieldAlert,
  ClipboardList,
  Library,
  Sliders,
  History,
  FileText,
  PieChart,
  Megaphone,
  CheckCircle,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { Role } from '../../types';

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
}

export const PortalSidebar: React.FC<{
  isOpen: boolean;
  onCloseMobile: () => void;
}> = ({ isOpen, onCloseMobile }) => {
  const { currentRole, activePortalTab, setActivePortalTab, fees, assignments, admissions, complaints } =
    useCollege();

  // Dynamic menu items mapped strictly to the active role
  const getRoleMenuItems = (role: Role): SidebarItem[] => {
    switch (role) {
      case 'STUDENT':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'profile', label: 'Student Profile', icon: User },
          { id: 'digital-id', label: 'Digital Student ID', icon: QrCode },
          { id: 'attendance', label: 'Attendance & Shortage', icon: CalendarCheck },
          { id: 'timetable', label: 'Class Timetable', icon: Calendar },
          {
            id: 'assignments',
            label: 'Assignments & Submissions',
            icon: FileCheck2,
            badge: assignments.filter((a) => !a.submitted).length ? `${assignments.filter((a) => !a.submitted).length} Due` : undefined,
          },
          { id: 'study-material', label: 'Study Materials', icon: BookOpen },
          { id: 'examinations', label: 'Exams & Hall Ticket', icon: FileSpreadsheet },
          { id: 'results', label: 'Marks & Results', icon: GraduationCap },
          {
            id: 'fees',
            label: 'Fees & Online Receipts',
            icon: CreditCard,
            badge: fees.some((f) => f.status === 'PARTIAL' || f.status === 'PENDING') ? 'Due' : undefined,
          },
          { id: 'certificates', label: 'Bonafide / Certificates', icon: Award },
          { id: 'placements', label: 'Placement Drives', icon: Briefcase },
          { id: 'complaints', label: 'Grievance / Complaints', icon: MessageSquareWarning },
          { id: 'feedback', label: 'Academic Feedback', icon: Star },
        ];

      case 'PARENT':
        return [
          { id: 'dashboard', label: 'Parent Dashboard', icon: LayoutDashboard },
          { id: 'profile', label: 'Student Ward Profile', icon: User },
          { id: 'attendance', label: 'Attendance Report', icon: CalendarCheck },
          { id: 'results', label: 'Semester Exam Results', icon: GraduationCap },
          { id: 'fees', label: 'Fee Dues & Receipts', icon: CreditCard },
          { id: 'timetable', label: 'Weekly Timetable', icon: Calendar },
          { id: 'notices', label: 'College Notices', icon: Megaphone },
          { id: 'complaints', label: 'File Grievance', icon: MessageSquareWarning },
        ];

      case 'FACULTY':
        return [
          { id: 'dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
          { id: 'mark-attendance', label: 'Mark Attendance', icon: CalendarCheck },
          { id: 'manage-assignments', label: 'Create Assignments', icon: FileCheck2 },
          { id: 'study-material', label: 'Upload Study Material', icon: BookOpen },
          { id: 'enter-marks', label: 'Enter Internal Marks', icon: FileSpreadsheet },
          { id: 'timetable', label: 'My Teaching Schedule', icon: Calendar },
          { id: 'notices', label: 'Department Notices', icon: Megaphone },
          { id: 'feedback-view', label: 'Student Feedback', icon: Star },
        ];

      case 'HOD':
        return [
          { id: 'dashboard', label: 'HOD Overview', icon: LayoutDashboard },
          { id: 'dept-students', label: 'Department Students', icon: Users },
          { id: 'faculty-workload', label: 'Faculty Workload', icon: ClipboardList },
          { id: 'attendance-analytics', label: 'Attendance Shortage Alerts', icon: CalendarCheck },
          { id: 'results-analytics', label: 'Result Performance', icon: GraduationCap },
          { id: 'curriculum', label: 'Subjects & Curriculum', icon: BookMarked },
          { id: 'notices', label: 'Publish Circular', icon: Megaphone },
        ];

      case 'PRINCIPAL':
        return [
          { id: 'dashboard', label: 'Institutional KPIs', icon: LayoutDashboard },
          { id: 'analytics-charts', label: 'University Analytics', icon: PieChart },
          { id: 'dept-comparison', label: 'Department Performance', icon: Building2 },
          { id: 'admissions-overview', label: 'Admissions Status', icon: Users },
          { id: 'placement-stats', label: 'Placement Statistics', icon: Briefcase },
          { id: 'fee-collection', label: 'Revenue & Fee Dues', icon: CreditCard },
          { id: 'grievance-oversight', label: 'Grievance Committee', icon: ShieldAlert },
          { id: 'notices-manage', label: 'Institute Circulars', icon: Megaphone },
        ];

      case 'SUPER_ADMIN':
        return [
          { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
          { id: 'admissions', label: 'Admissions Management', icon: Users, badge: `${admissions.length}` },
          { id: 'students-crud', label: 'Student Directory', icon: GraduationCap },
          { id: 'faculty-crud', label: 'Faculty Directory', icon: Users },
          { id: 'departments-crud', label: 'Departments & Labs', icon: Building2 },
          { id: 'fees-crud', label: 'Fee Structures & Dues', icon: CreditCard },
          { id: 'certificates-crud', label: 'Certificate Approvals', icon: Award },
          { id: 'placements-crud', label: 'Placement Drives', icon: Briefcase },
          { id: 'library-crud', label: 'Library Management', icon: Library },
          { id: 'cms-notices', label: 'CMS: Notices & News', icon: Megaphone },
          { id: 'cms-events', label: 'CMS: Events & Gallery', icon: Calendar },
          { id: 'complaints-crud', label: 'Grievance Redressal', icon: MessageSquareWarning, badge: `${complaints.filter(c => c.status === 'OPEN').length}` },
          { id: 'audit-logs', label: 'Security Audit Logs', icon: History },
        ];

      case 'MODULE_OFFICER':
        return [
          { id: 'dashboard', label: 'Officer Dashboard', icon: LayoutDashboard },
          { id: 'admissions', label: 'Admissions Processing', icon: Users },
          { id: 'examinations', label: 'Examination Cell', icon: FileSpreadsheet },
          { id: 'certificates-crud', label: 'Issue Certificates', icon: Award },
          { id: 'library-crud', label: 'Library Transactions', icon: Library },
        ];

      case 'ALUMNI':
        return [
          { id: 'dashboard', label: 'Alumni Network', icon: LayoutDashboard },
          { id: 'alumni-directory', label: 'Batch Directory', icon: Users },
          { id: 'post-job', label: 'Post Job / Referral', icon: Briefcase },
          { id: 'mentorship', label: 'Student Mentorship', icon: GraduationCap },
          { id: 'events', label: 'Alumni Meets & Events', icon: Calendar },
        ];

      default:
        return [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }];
    }
  };

  const menuItems = getRoleMenuItems(currentRole);

  const handleItemClick = (id: string) => {
    setActivePortalTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-2xs"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[53px] z-30 lg:z-10 h-screen lg:h-[calc(100vh-53px)] w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 transition-transform duration-200 ease-in-out border-r border-slate-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Role Kicker in Sidebar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            ACTIVE PORTAL
          </div>
          <div className="text-sm font-extrabold text-white mt-0.5 tracking-tight flex items-center justify-between">
            <span>{currentRole.replace('_', ' ')}</span>
            <span className="text-[10px] bg-blue-600/30 text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded font-mono">
              v3.2
            </span>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePortalTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                      isActive ? 'bg-white text-blue-900' : 'bg-slate-800 text-amber-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/50 text-[10px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between">
            <span>System Status:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </span>
          </div>
          <div className="truncate">Savitribai Phule Pune Univ. Reg.</div>
        </div>
      </aside>
    </>
  );
};
