import React from 'react';
import {
  User,
  CalendarCheck,
  GraduationCap,
  CreditCard,
  Calendar,
  AlertTriangle,
  Phone,
  Mail,
  ShieldAlert,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { PageHeader } from '../common/PageHeader';
import { StatCard } from '../common/StatCard';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { DataTable } from '../common/DataTable';

export const ParentPortal: React.FC = () => {
  const {
    studentProfile,
    subjectAttendance,
    recentResult,
    fees,
    timetable,
    notices,
    setActivePortalTab,
  } = useCollege();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title={`Parent Monitoring Portal: Ward - ${studentProfile.name}`}
        description={`Linked Student ID: ${studentProfile.enrollmentNo} · Department: ${studentProfile.departmentName}`}
        badge={<Badge variant="success">Academic Status: Good Standing</Badge>}
      />

      {/* Top Ward Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ward Attendance"
          value={`${studentProfile.attendancePercent}%`}
          subtitle="Overall Semester Attendance"
          icon={<CalendarCheck className="w-4 h-4" />}
          highlightColor={studentProfile.attendancePercent >= 75 ? 'emerald' : 'rose'}
          trend={{ value: studentProfile.attendancePercent >= 75 ? 'Compliant (>75%)' : 'Shortage Alert', isPositive: studentProfile.attendancePercent >= 75 }}
        />
        <StatCard
          title="Latest SGPA"
          value={recentResult.sgpa}
          subtitle={`Semester 4 · CGPA ${studentProfile.cgpa}`}
          icon={<GraduationCap className="w-4 h-4" />}
          highlightColor="blue"
        />
        <StatCard
          title="Pending College Fees"
          value={studentProfile.pendingFees > 0 ? `₹${studentProfile.pendingFees.toLocaleString()}` : 'Nil'}
          subtitle={studentProfile.pendingFees > 0 ? 'Due: 15th Nov 2026' : 'Cleared'}
          icon={<CreditCard className="w-4 h-4" />}
          highlightColor={studentProfile.pendingFees > 0 ? 'amber' : 'emerald'}
        />
        <StatCard
          title="Backlogs / ATKT"
          value="0"
          subtitle="All Subjects Cleared in First Attempt"
          icon={<GraduationCap className="w-4 h-4" />}
          highlightColor="emerald"
        />
      </div>

      {/* Ward Profile & Faculty Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={studentProfile.avatarUrl}
                alt={studentProfile.name}
                className="w-14 h-14 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{studentProfile.name}</h3>
                <span className="text-[11px] text-blue-700 font-mono block">{studentProfile.enrollmentNo}</span>
                <span className="text-[11px] text-slate-500 block">Roll: {studentProfile.rollNo} (Div {studentProfile.division})</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Program:</span>
                <span className="font-semibold text-slate-800">{studentProfile.courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Class Mentor / HOD:</span>
                <span className="font-semibold text-slate-800">Dr. S. S. Revate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vice Principal (Science):</span>
                <span className="font-semibold text-slate-800">Dr. V. D. Devarkar</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-700 block mb-1">Mentor Helpdesk Contact:</span>
              <div className="text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>9421336176 (Dr. S. S. Revate)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>revate.cs@scsco.org.in</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Subject Attendance Breakdown */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader
              title="Subject-Wise Attendance Monitoring"
              subtitle="Mandatory minimum 75% required under university ordinance"
            />
            <CardContent className="space-y-3">
              {subjectAttendance.map((sub) => (
                <div key={sub.subjectCode} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900">{sub.subjectName}</strong>
                      <span className="text-slate-400 font-mono ml-2">({sub.subjectCode})</span>
                    </div>
                    <Badge variant={sub.percentage >= 75 ? 'success' : 'danger'} size="sm">
                      {sub.percentage}%
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${sub.percentage >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min(100, sub.percentage)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Faculty: {sub.faculty}</span>
                    <span>{sub.totalAttended} / {sub.totalConducted} Lectures Attended</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ward Semester Results */}
      <Card>
        <CardHeader
          title="Semester Marksheet Statement"
          subtitle={`Published for ${recentResult.academicYear} · SGPA ${recentResult.sgpa}`}
        />
        <CardContent className="p-0">
          <DataTable
            data={recentResult.marks}
            columns={[
              { key: 'subjectCode', header: 'Subject Code', className: 'font-mono text-blue-700' },
              { key: 'subjectName', header: 'Subject Name', className: 'font-semibold text-slate-900' },
              { key: 'credits', header: 'Credits' },
              { key: 'internalMarks', header: 'Internal (30)', render: (m) => `${m.internalMarks} / ${m.maxInternal}` },
              { key: 'externalMarks', header: 'End-Sem (70)', render: (m) => `${m.externalMarks} / ${m.maxExternal}` },
              { key: 'totalMarks', header: 'Total (100)', className: 'font-bold' },
              { key: 'grade', header: 'Grade', render: (m) => <Badge variant="success" size="sm">{m.grade}</Badge> },
            ]}
          />
        </CardContent>
      </Card>

      {/* Fee Accounts */}
      <Card>
        <CardHeader title="Fee Accounts & Payment Verification" />
        <CardContent className="divide-y divide-slate-100 p-0 text-xs">
          {fees.map((f) => (
            <div key={f.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-slate-900">{f.category} ({f.academicYear})</h4>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  Total: ₹{f.totalAmount.toLocaleString()} · Paid: ₹{f.paidAmount.toLocaleString()} · Dues: <span className="text-rose-600 font-bold">₹{f.pendingAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={f.status === 'PAID' ? 'success' : 'warning'}>{f.status}</Badge>
                {f.pendingAmount > 0 && (
                  <span className="text-[11px] text-slate-500">Due: {f.dueDate}</span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
