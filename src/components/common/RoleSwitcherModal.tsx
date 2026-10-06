import React from 'react';
import {
  GraduationCap,
  UserCheck,
  Building2,
  Shield,
  Users,
  Award,
  BookOpen,
  Briefcase,
  X,
  Check,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { Role } from '../../types';
import { INITIAL_USERS } from '../../data/mockDatabase';

export const RoleSwitcherModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { currentRole, switchRole } = useCollege();

  if (!isOpen) return null;

  const rolesList: {
    role: Role;
    title: string;
    description: string;
    user: (typeof INITIAL_USERS)[0];
    icon: any;
    color: string;
  }[] = [
    {
      role: 'STUDENT',
      title: 'Student Portal',
      description: 'Rahul Sharma (B.Sc. Computer Science): Digital ID with QR, Attendance, Timetable, Assignments, Hall Ticket, Results, Fees, Bonafide Certificates.',
      user: INITIAL_USERS.find((u) => u.role === 'STUDENT')!,
      icon: GraduationCap,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      role: 'FACULTY',
      title: 'Faculty Portal',
      description: 'Dr. V. S. Suryawanshi (Head Chemistry & PG Guide): Class Attendance tool, Create Assignments, Upload Notes, Enter Internal Marks.',
      user: INITIAL_USERS.find((u) => u.role === 'FACULTY')!,
      icon: BookOpen,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      role: 'HOD',
      title: 'HOD & Vice Principal',
      description: 'Dr. V. D. Devarkar (Vice Principal Science & Head Botany): Department student strength, Faculty teaching workload, Attendance shortage alerts, Curriculum.',
      user: INITIAL_USERS.find((u) => u.role === 'HOD')!,
      icon: Building2,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      role: 'PRINCIPAL',
      title: 'Principal Dashboard',
      description: 'Dr. Sanjay Namdev Aswale (Principal): Institutional KPIs, 6,000+ Students, BAMU AAA Audit Grade A (263/300), NAAC 3.14 CGPA, Recharts analytics.',
      user: INITIAL_USERS.find((u) => u.role === 'PRINCIPAL')!,
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      role: 'SUPER_ADMIN',
      title: 'Sanstha President & Admin',
      description: 'Shri Amol Shivajirao More (President, Bharat Shikshan Sanstha): Central management, Admissions review, Fees structures, Library, Audit logs.',
      user: INITIAL_USERS.find((u) => u.role === 'SUPER_ADMIN')!,
      icon: Shield,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      role: 'MODULE_OFFICER',
      title: 'Registrar & Exam Admin',
      description: 'Shri R. B. Sonwane (Registrar): Admission verification, Certificates (Bonafide/TC) approvals, Library circulation, Fee receipts.',
      user: INITIAL_USERS.find((u) => u.role === 'MODULE_OFFICER')!,
      icon: UserCheck,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      role: 'PARENT',
      title: 'Parent Portal',
      description: 'Suresh Sharma: Linked ward monitoring: Live attendance percentage, marks memo, fee dues & online receipts, mentor contacts.',
      user: INITIAL_USERS.find((u) => u.role === 'PARENT')!,
      icon: Users,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      role: 'ALUMNI',
      title: 'Alumni Network',
      description: 'Amit Jadhav (Senior Software Engineer): Batch directory, Student mentorship, Job postings, Campus reunion events.',
      user: INITIAL_USERS.find((u) => u.role === 'ALUMNI')!,
      icon: Briefcase,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
  ];

  const handleSelectRole = (role: Role) => {
    switchRole(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Switch Active Portal Role</h3>
            <p className="text-xs text-slate-300">
              Shri Chhatrapati Shivaji College, Omerga · Live Role-Based Access Control
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {rolesList.map((item) => {
            const Icon = item.icon;
            const isSelected = currentRole === item.role;

            return (
              <div
                key={item.role}
                onClick={() => handleSelectRole(item.role)}
                className={`p-4 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-md border ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {item.user?.name || item.role}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="p-1 bg-blue-600 text-white rounded-full">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{item.user?.email}</span>
                  <span className="font-semibold text-blue-600">Switch to Role →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
