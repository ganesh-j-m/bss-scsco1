import React, { useState } from 'react';
import {
  GraduationCap,
  CalendarCheck,
  Calendar,
  FileCheck2,
  BookOpen,
  FileSpreadsheet,
  CreditCard,
  Award,
  Briefcase,
  QrCode,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  MessageSquareWarning,
  Star,
  Search,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card, CardHeader, CardContent } from '../common/Card';
import { StatCard } from '../common/StatCard';
import { PageHeader } from '../common/PageHeader';
import { DataTable } from '../common/DataTable';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import { COLLEGE_INFO } from '../../data/mockDatabase';
import { CertificateRequest, PaymentReceipt } from '../../types';

export const StudentPortal: React.FC = () => {
  const {
    studentProfile,
    activePortalTab,
    setActivePortalTab,
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
    submitAssignment,
    payFees,
    requestCertificate,
    applyForPlacement,
    complaints,
    submitComplaint,
    submitFeedback,
  } = useCollege();

  // Assignment Submit Modal
  const [selectedAsg, setSelectedAsg] = useState<any>(null);
  const [submissionRemarks, setSubmissionRemarks] = useState('');

  // Fee Payment Modal
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [payAmount, setPayAmount] = useState<number>(25000);
  const [payMethod, setPayMethod] = useState<'UPI' | 'Net Banking' | 'Debit Card'>('UPI');
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<PaymentReceipt | null>(null);

  // Certificate Request Modal & Viewer
  const [certType, setCertType] = useState<CertificateRequest['type']>('BONAFIDE');
  const [certPurpose, setCertPurpose] = useState('');
  const [showCertRequestModal, setShowCertRequestModal] = useState(false);
  const [selectedCertForView, setSelectedCertForView] = useState<CertificateRequest | null>(null);

  // Hall Ticket Modal
  const [showHallTicket, setShowHallTicket] = useState(false);

  // Complaint Form
  const [cmpTitle, setCmpTitle] = useState('');
  const [cmpCategory, setCmpCategory] = useState<any>('Academic');
  const [cmpDesc, setCmpDesc] = useState('');
  const [cmpSuccess, setCmpSuccess] = useState(false);

  // Feedback Form
  const [fbCategory, setFbCategory] = useState<any>('Faculty Performance');
  const [fbTarget, setFbTarget] = useState('Prof. Rajesh Patil (CS501)');
  const [fbRating, setFbRating] = useState(5);
  const [fbComments, setFbComments] = useState('');
  const [fbSuccess, setFbSuccess] = useState(false);

  // Material filter
  const [materialSubject, setMaterialSubject] = useState('All');

  // Handle assignment upload submit
  const handleAssignmentSubmit = () => {
    if (!selectedAsg) return;
    submitAssignment(selectedAsg.id, submissionRemarks);
    setSelectedAsg(null);
    setSubmissionRemarks('');
  };

  // Handle Fee Payment
  const handlePayFee = () => {
    if (!selectedFee) return;
    const receipt = payFees(selectedFee.id, payAmount, payMethod);
    setSelectedFee(null);
    setPaymentSuccessReceipt(receipt);
  };

  // Handle Certificate Request
  const handleRequestCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certPurpose) return;
    requestCertificate(certType, certPurpose);
    setShowCertRequestModal(false);
    setCertPurpose('');
  };

  // Handle Complaint
  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmpTitle || !cmpDesc) return;
    submitComplaint(cmpTitle, cmpCategory, cmpDesc);
    setCmpTitle('');
    setCmpDesc('');
    setCmpSuccess(true);
    setTimeout(() => setCmpSuccess(false), 4000);
  };

  // Handle Feedback
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(fbCategory, fbRating, fbComments, fbTarget);
    setFbComments('');
    setFbSuccess(true);
    setTimeout(() => setFbSuccess(false), 4000);
  };

  // ==========================================
  // RENDER TABS
  // ==========================================

  // 1. DASHBOARD
  const renderDashboard = () => (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${studentProfile.name}`}
        description={`${studentProfile.courseName} · Year ${studentProfile.currentYear} (Sem ${studentProfile.semester}) · Division ${studentProfile.division} · Roll No: ${studentProfile.rollNo}`}
        badge={<Badge variant="success">Academic Status: Active</Badge>}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActivePortalTab('digital-id')}
            icon={<QrCode className="w-3.5 h-3.5" />}
          >
            Digital Student ID
          </Button>
        }
      />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance"
          value={`${studentProfile.attendancePercent}%`}
          subtitle="Overall Semester Attendance"
          icon={<CalendarCheck className="w-4 h-4" />}
          highlightColor={studentProfile.attendancePercent >= 75 ? 'emerald' : 'rose'}
          trend={{ value: studentProfile.attendancePercent >= 75 ? 'Safe (>75%)' : 'Shortage Alert', isPositive: studentProfile.attendancePercent >= 75 }}
          onClick={() => setActivePortalTab('attendance')}
        />
        <StatCard
          title="Academic SGPA"
          value={studentProfile.cgpa.toFixed(2)}
          subtitle="Cumulative CGPA: 8.84"
          icon={<GraduationCap className="w-4 h-4" />}
          highlightColor="blue"
          trend={{ value: 'Top 5% Batch', isPositive: true }}
          onClick={() => setActivePortalTab('results')}
        />
        <StatCard
          title="Fee Balance"
          value={studentProfile.pendingFees > 0 ? `₹${studentProfile.pendingFees.toLocaleString()}` : 'Nil'}
          subtitle={studentProfile.pendingFees > 0 ? 'Due: 15th Nov 2026' : 'All Dues Cleared'}
          icon={<CreditCard className="w-4 h-4" />}
          highlightColor={studentProfile.pendingFees > 0 ? 'amber' : 'emerald'}
          onClick={() => setActivePortalTab('fees')}
        />
        <StatCard
          title="Assignments Due"
          value={assignments.filter((a) => !a.submitted).length}
          subtitle="Pending for submission"
          icon={<FileCheck2 className="w-4 h-4" />}
          highlightColor="indigo"
          onClick={() => setActivePortalTab('assignments')}
        />
      </div>

      {/* Today's Schedule & Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Lectures */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader
              title="Today's Academic Schedule (Monday)"
              subtitle="Lectures & Practical Lab sessions"
              action={
                <Button variant="ghost" size="sm" onClick={() => setActivePortalTab('timetable')}>
                  Full Timetable →
                </Button>
              }
            />
            <CardContent className="divide-y divide-slate-100 p-0">
              {timetable.slice(0, 4).map((slot) => (
                <div key={slot.id} className="p-3.5 sm:px-5 flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{slot.subject}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                        {slot.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {slot.faculty} · <span className="font-medium text-slate-700">{slot.room}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-blue-700 block">{slot.time}</span>
                    <span className="text-[10px] text-slate-400">{slot.type}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Examination Card */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader title="Upcoming Examinations" subtitle="End-Semester Theory Exam Winter 2026" />
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-semibold text-blue-900">End-Sem Hall Ticket Ready</div>
                  <div className="text-[11px] text-blue-700">Digital seat number allotted</div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowHallTicket(true)}
                  icon={<Printer className="w-3.5 h-3.5" />}
                >
                  Hall Ticket
                </Button>
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                  Next Exam:
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
                  <div className="font-bold text-slate-900">{examSchedule[0].subjectName}</div>
                  <div className="text-slate-500 flex items-center justify-between mt-1 text-[11px]">
                    <span>Date: {examSchedule[0].date} ({examSchedule[0].time})</span>
                    <span>Room: {examSchedule[0].room}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Placement Drive Alert */}
          <Card>
            <CardHeader
              title="Campus Hiring Drive"
              subtitle="NVIDIA Corporation"
              action={
                <Button variant="ghost" size="sm" onClick={() => setActivePortalTab('placements')}>
                  View All →
                </Button>
              }
            />
            <CardContent className="text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Package: ₹28.5 LPA</span>
                <Badge variant="success">Eligible</Badge>
              </div>
              <p className="text-[11px] text-slate-500">
                Deadline: 15th October 2026. Online registration is active.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // 2. PROFILE TAB
  const renderProfile = () => (
    <div className="space-y-6">
      <PageHeader
        title="Student Academic Profile"
        description="Official registered student dossier under Savitribai Phule Pune University"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card className="text-center p-6">
            <img
              src={studentProfile.avatarUrl}
              alt={studentProfile.name}
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-slate-100 shadow-md mb-4"
            />
            <h3 className="text-base font-bold text-slate-900">{studentProfile.name}</h3>
            <p className="text-xs text-blue-700 font-mono mt-0.5">{studentProfile.enrollmentNo}</p>
            <p className="text-xs text-slate-500 mt-1">{studentProfile.courseName}</p>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Roll Number:</span>
                <span className="font-semibold text-slate-800">{studentProfile.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Year / Semester:</span>
                <span className="font-semibold text-slate-800">
                  Year {studentProfile.currentYear} / Sem {studentProfile.semester} (Div {studentProfile.division})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Blood Group:</span>
                <span className="font-semibold text-slate-800">{studentProfile.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-semibold text-slate-800">{studentProfile.dateOfBirth}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-8 space-y-4">
          <Card>
            <CardHeader title="Contact & Guardian Information" />
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Personal Email:</span>
                <span className="font-semibold text-slate-800">{studentProfile.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Mobile Phone:</span>
                <span className="font-semibold text-slate-800">{studentProfile.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Guardian Name:</span>
                <span className="font-semibold text-slate-800">
                  {studentProfile.guardianName} ({studentProfile.guardianRelation})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Guardian Phone:</span>
                <span className="font-semibold text-slate-800">{studentProfile.guardianPhone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block">Residential Address:</span>
                <span className="font-semibold text-slate-800">{studentProfile.address}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Academic Metrics & Standing" />
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">CGPA</span>
                <span className="text-lg font-bold text-slate-900">{studentProfile.cgpa}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Attendance</span>
                <span className="text-lg font-bold text-emerald-700">{studentProfile.attendancePercent}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Backlogs</span>
                <span className="text-lg font-bold text-slate-900">0 (All Clear)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Admission Date</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">{studentProfile.admissionDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // 3. DIGITAL STUDENT ID CARD
  const renderDigitalID = () => (
    <div className="space-y-6">
      <PageHeader
        title="Digital Identity Card"
        description="Official institutional student smart card equipped with cryptographic verification QR"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            icon={<Printer className="w-3.5 h-3.5" />}
          >
            Print Identity Card
          </Button>
        }
      />

      <div className="max-w-md mx-auto">
        {/* Printable Smart Card container */}
        <div className="bg-white border-2 border-slate-800 rounded-xl overflow-hidden shadow-xl text-xs relative">
          {/* Card Top Brand Header */}
          <div className="bg-slate-900 text-white p-4 text-center border-b border-slate-800">
            <div className="text-[10px] tracking-widest text-amber-400 font-bold uppercase">
              BHARAT SHIKSHAN SANSTHA'S
            </div>
            <div className="text-sm font-extrabold tracking-tight">SHRI CHHATRAPATI SHIVAJI COLLEGE</div>
            <div className="text-[9px] text-slate-300">Omerga, Dist. Dharashiv - 413606 · BAMU Affiliated</div>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex gap-4 items-center">
              <img
                src={studentProfile.avatarUrl}
                alt={studentProfile.name}
                className="w-24 h-28 rounded-md object-cover border-2 border-slate-300 shrink-0"
              />
              <div className="space-y-1 text-slate-700 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">STUDENT NAME</span>
                  <span className="font-bold text-sm text-slate-900 block">{studentProfile.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ENROLLMENT NO</span>
                  <span className="font-mono text-xs font-semibold text-blue-800">{studentProfile.enrollmentNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">COURSE & BRANCH</span>
                  <span className="font-medium text-slate-900 text-[11px] block">{studentProfile.courseName}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-center text-[10px]">
              <div>
                <span className="text-slate-400 block">ROLL NO</span>
                <span className="font-bold text-slate-800">{studentProfile.rollNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block">YEAR / DIV</span>
                <span className="font-bold text-slate-800">TE / {studentProfile.division}</span>
              </div>
              <div>
                <span className="text-slate-400 block">BLOOD GRP</span>
                <span className="font-bold text-slate-800">{studentProfile.bloodGroup}</span>
              </div>
            </div>

            {/* QR verification block */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 block">VALID TILL: JUNE 2027</span>
                <span className="text-[9px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED ACTIVE
                </span>
                <span className="text-[8px] text-slate-400 font-mono block">TOKEN: {studentProfile.qrData.substring(0, 24)}...</span>
              </div>

              {/* Scannable SVG styled QR Matrix simulation */}
              <div className="w-16 h-16 bg-slate-900 p-1 rounded flex items-center justify-center shrink-0">
                <QrCode className="w-14 h-14 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="bg-slate-100 px-4 py-2 text-center text-[9px] text-slate-500 border-t border-slate-200">
            If found, please return to SCSCO Knowledge City, Hadapsar, Pune - 411028
          </div>
        </div>
      </div>
    </div>
  );

  // 4. ATTENDANCE TAB
  const renderAttendance = () => (
    <div className="space-y-6">
      <PageHeader
        title="Semester Attendance & Subject Breakdown"
        description="Daily lecture and practical presence tracked electronically"
        badge={
          <Badge variant={studentProfile.attendancePercent >= 75 ? 'success' : 'danger'}>
            Overall: {studentProfile.attendancePercent}%
          </Badge>
        }
      />

      {studentProfile.attendancePercent < 75 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-3 text-xs text-rose-800">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <strong>Attendance Shortage Warning:</strong> University regulations mandate a minimum of 75% attendance to obtain hall tickets. Please meet your faculty advisor.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectAttendance.map((sub) => {
          const isShort = sub.percentage < 75;
          return (
            <Card key={sub.subjectCode} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-blue-700">{sub.subjectCode}</span>
                <Badge variant={isShort ? 'danger' : 'success'} size="sm">
                  {sub.percentage}%
                </Badge>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">{sub.subjectName}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{sub.faculty}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isShort ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, sub.percentage)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Attended: {sub.totalAttended}</span>
                  <span>Conducted: {sub.totalConducted}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // 5. TIMETABLE TAB
  const renderTimetable = () => (
    <div className="space-y-6">
      <PageHeader
        title="Weekly Academic Timetable"
        description="Computer Engineering · Class TE-A (Semester 5)"
      />

      <DataTable
        data={timetable}
        searchPlaceholder="Filter by subject or day..."
        searchKey={(t) => `${t.day} ${t.subject} ${t.code} ${t.faculty}`}
        columns={[
          { key: 'day', header: 'Day', sortable: true, className: 'font-semibold text-slate-900' },
          { key: 'time', header: 'Time Slot', sortable: true, className: 'font-mono text-blue-700' },
          { key: 'subject', header: 'Subject & Code', render: (t) => <div><div className="font-medium text-slate-800">{t.subject}</div><div className="text-[10px] text-slate-400 font-mono">{t.code}</div></div> },
          { key: 'faculty', header: 'Faculty Scholar' },
          { key: 'room', header: 'Classroom / Lab', className: 'font-medium' },
          { key: 'type', header: 'Session Type', render: (t) => <Badge variant={t.type === 'Lab' ? 'purple' : 'default'} size="sm">{t.type}</Badge> },
        ]}
      />
    </div>
  );

  // 6. ASSIGNMENTS TAB
  const renderAssignments = () => (
    <div className="space-y-6">
      <PageHeader
        title="Assignments & Coursework Submissions"
        description="Upload technical problem sets and analytical reports for grading"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignments.map((asg) => (
          <Card key={asg.id} className="p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-blue-700">{asg.subjectCode}</span>
                <Badge variant={asg.submitted ? 'success' : 'warning'} size="sm">
                  {asg.submitted ? 'Submitted ✓' : 'Pending'}
                </Badge>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-snug">{asg.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{asg.description}</p>

              <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                <div>Faculty: {asg.facultyName}</div>
                <div>Deadline: <strong className="text-slate-800">{asg.deadline}</strong></div>
                <div>Total Marks: {asg.totalMarks}</div>
              </div>

              {asg.submitted && asg.obtainedMarks !== undefined && (
                <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-800 space-y-1">
                  <div className="font-bold">Score: {asg.obtainedMarks} / {asg.totalMarks}</div>
                  <div className="text-[11px] italic">"{asg.feedback}"</div>
                </div>
              )}
            </div>

            <div>
              {asg.submitted ? (
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Solution Submitted on {asg.submissionDate}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedAsg(asg)}
                  icon={<Upload className="w-3.5 h-3.5" />}
                >
                  Submit Assignment
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // 7. STUDY MATERIAL TAB
  const renderStudyMaterial = () => (
    <div className="space-y-6">
      <PageHeader
        title="Course Study Materials & Notes"
        description="Faculty lecture slides, question banks, and reference materials"
      />

      <DataTable
        data={studyMaterials}
        searchPlaceholder="Search material by title or subject..."
        columns={[
          { key: 'subjectCode', header: 'Subject', render: (m) => <span className="font-mono text-blue-700">{m.subjectCode}</span> },
          { key: 'title', header: 'Topic Title', render: (m) => <div><div className="font-semibold text-slate-900">{m.title}</div><div className="text-[10px] text-slate-400">{m.subjectName}</div></div> },
          { key: 'type', header: 'Format', render: (m) => <Badge variant="purple" size="sm">{m.type}</Badge> },
          { key: 'facultyName', header: 'Uploaded By' },
          { key: 'fileSize', header: 'Size', className: 'text-slate-500 font-mono' },
          {
            key: 'action',
            header: 'Download',
            render: (m) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Downloading "${m.title}" (${m.fileSize})`)}
                icon={<Download className="w-3.5 h-3.5" />}
              >
                Get File
              </Button>
            ),
          },
        ]}
      />
    </div>
  );

  // 8. EXAMINATIONS & HALL TICKET
  const renderExaminations = () => (
    <div className="space-y-6">
      <PageHeader
        title="Examinations & Hall Ticket"
        description="University Semester Examination Schedule Winter 2026"
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowHallTicket(true)}
            icon={<Printer className="w-3.5 h-3.5" />}
          >
            Generate Hall Ticket
          </Button>
        }
      />

      <DataTable
        data={examSchedule}
        searchPlaceholder="Filter exams..."
        columns={[
          { key: 'subjectCode', header: 'Course Code', className: 'font-mono text-blue-700' },
          { key: 'subjectName', header: 'Subject Name', className: 'font-semibold text-slate-900' },
          { key: 'date', header: 'Date', className: 'font-medium' },
          { key: 'time', header: 'Time Slot' },
          { key: 'room', header: 'Examination Hall' },
          { key: 'examType', header: 'Pattern', render: (e) => <Badge size="sm">{e.examType}</Badge> },
        ]}
      />
    </div>
  );

  // 9. RESULTS TAB
  const renderResults = () => (
    <div className="space-y-6">
      <PageHeader
        title="Semester Examination Results"
        description={`Official Statement of Marks · ${recentResult.academicYear}`}
        badge={<Badge variant="success">Status: {recentResult.status}</Badge>}
      />

      {/* SGPA & CGPA Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg text-center">
          <span className="text-xs text-slate-500 block">Semester 4 SGPA</span>
          <span className="text-3xl font-extrabold text-blue-700 mt-1 block">{recentResult.sgpa}</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg text-center">
          <span className="text-xs text-slate-500 block">Cumulative CGPA</span>
          <span className="text-3xl font-extrabold text-emerald-700 mt-1 block">{recentResult.cgpa}</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg text-center">
          <span className="text-xs text-slate-500 block">Total Credits Earned</span>
          <span className="text-3xl font-extrabold text-slate-900 mt-1 block">{recentResult.totalCredits}</span>
        </div>
      </div>

      <DataTable
        data={recentResult.marks}
        searchPlaceholder="Filter subjects..."
        columns={[
          { key: 'subjectCode', header: 'Code', className: 'font-mono text-blue-700' },
          { key: 'subjectName', header: 'Subject Title', className: 'font-semibold text-slate-900' },
          { key: 'credits', header: 'Credits' },
          { key: 'internalMarks', header: 'Internal (30)', render: (m) => `${m.internalMarks} / ${m.maxInternal}` },
          { key: 'externalMarks', header: 'End-Sem (70)', render: (m) => `${m.externalMarks} / ${m.maxExternal}` },
          { key: 'totalMarks', header: 'Total (100)', className: 'font-bold text-slate-900' },
          { key: 'grade', header: 'Grade', render: (m) => <Badge variant="success" size="sm">{m.grade}</Badge> },
        ]}
      />
    </div>
  );

  // 10. FEES TAB & PAYMENT GATEWAY
  const renderFees = () => (
    <div className="space-y-6">
      <PageHeader
        title="College Fee Records & Receipts"
        description="Tuition, Development, and Examination fee accounts"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fees.map((f) => (
          <Card key={f.id} className="p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">{f.academicYear}</span>
                <Badge variant={f.status === 'PAID' ? 'success' : 'warning'} size="sm">
                  {f.status}
                </Badge>
              </div>

              <h4 className="text-xs font-bold text-slate-900">{f.category}</h4>

              <div className="pt-2 text-xs text-slate-600 space-y-1 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Total Fee:</span>
                  <span className="font-semibold">₹{f.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Paid Amount:</span>
                  <span className="text-emerald-700 font-semibold">₹{f.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Dues:</span>
                  <span className="text-rose-700 font-bold">₹{f.pendingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Due Date:</span>
                  <span>{f.dueDate}</span>
                </div>
              </div>
            </div>

            <div>
              {f.pendingAmount > 0 ? (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setSelectedFee(f);
                    setPayAmount(f.pendingAmount);
                  }}
                  icon={<CreditCard className="w-3.5 h-3.5" />}
                >
                  Pay Balance ₹{f.pendingAmount.toLocaleString()}
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="w-full text-emerald-700" disabled>
                  Paid in Full ✓
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Receipts Table */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Official Payment Receipts</h3>
        <DataTable
          data={receipts}
          searchPlaceholder="Search receipts..."
          columns={[
            { key: 'receiptNo', header: 'Receipt No', className: 'font-mono text-blue-700 font-medium' },
            { key: 'date', header: 'Payment Date' },
            { key: 'amount', header: 'Amount', render: (r) => <strong className="text-slate-900">₹{r.amount.toLocaleString()}</strong> },
            { key: 'paymentMethod', header: 'Mode', render: (r) => <Badge size="sm">{r.paymentMethod}</Badge> },
            { key: 'transactionId', header: 'Bank Transaction ID', className: 'font-mono text-[11px] text-slate-500' },
            {
              key: 'action',
              header: 'Action',
              render: (r) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaymentSuccessReceipt(r)}
                  icon={<Printer className="w-3.5 h-3.5" />}
                >
                  View Receipt
                </Button>
              ),
            },
          ]}
        />
      </div>
    </div>
  );

  // 11. CERTIFICATES TAB
  const renderCertificates = () => (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Certificates"
        description="Request Bonafide, Character, or Leaving certificates with verifiable QR"
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowCertRequestModal(true)}
            icon={<Award className="w-3.5 h-3.5" />}
          >
            Request New Certificate
          </Button>
        }
      />

      <DataTable
        data={certificates}
        searchPlaceholder="Search certificate requests..."
        columns={[
          { key: 'type', header: 'Certificate Type', render: (c) => <strong className="text-slate-900">{c.type} CERTIFICATE</strong> },
          { key: 'purpose', header: 'Purpose / Application' },
          { key: 'requestDate', header: 'Requested On' },
          { key: 'status', header: 'Status', render: (c) => <Badge variant={c.status === 'ISSUED' ? 'success' : 'warning'} size="sm">{c.status}</Badge> },
          { key: 'certificateNo', header: 'Certificate No', render: (c) => c.certificateNo ? <span className="font-mono text-blue-700 font-semibold">{c.certificateNo}</span> : <span className="text-slate-400">Under Review</span> },
          {
            key: 'action',
            header: 'Digital Copy',
            render: (c) =>
              c.status === 'ISSUED' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCertForView(c)}
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  View & Print
                </Button>
              ) : (
                <span className="text-slate-400 text-[11px]">Processing</span>
              ),
          },
        ]}
      />
    </div>
  );

  // 12. PLACEMENT DRIVES
  const renderPlacements = () => (
    <div className="space-y-6">
      <PageHeader
        title="Campus Placement Drives"
        description="Active campus recruitments, eligibility status, and job applications"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {placements.map((plc) => (
          <Card key={plc.id} className="p-5 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">{plc.companyName}</h4>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {plc.packageOffered}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">{plc.rolesOffered}</p>

              <div className="pt-2 text-[11px] text-slate-500 space-y-1 border-t border-slate-100">
                <div>Min CGPA: {plc.minCgpa} (Your CGPA: 8.84 ✓)</div>
                <div>Drive Date: {plc.driveDate}</div>
                <div>Deadline: {plc.deadline}</div>
                <div>Location: {plc.location}</div>
              </div>
            </div>

            <div>
              {plc.hasApplied ? (
                <Button variant="outline" size="sm" className="w-full text-emerald-700" disabled>
                  Applied ✓ ({plc.appliedCount} applicants)
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => applyForPlacement(plc.id)}
                >
                  Apply for Drive
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // 13. GRIEVANCE / COMPLAINTS TAB
  const renderComplaints = () => (
    <div className="space-y-6">
      <PageHeader
        title="Student Grievance & Complaint Redressal"
        description="Direct confidential grievance reporting to the Student Redressal Cell"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <Card className="p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Submit New Grievance Ticket</h3>
            {cmpSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 mb-3">
                Ticket submitted successfully! An officer has been assigned.
              </div>
            )}
            <form onSubmit={handleComplaintSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Issue Category *</label>
                <select
                  value={cmpCategory}
                  onChange={(e) => setCmpCategory(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Academic">Academic / Syllabus / Lecture</option>
                  <option value="Infrastructure">Infrastructure / Wi-Fi / Labs</option>
                  <option value="Hostel">Hostel & Accommodation</option>
                  <option value="Library">Library & Reading Room</option>
                  <option value="Canteen">Canteen & Mess Hygiene</option>
                  <option value="Anti-Ragging">Anti-Ragging & Harassment</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Subject Title *</label>
                <input
                  type="text"
                  required
                  value={cmpTitle}
                  onChange={(e) => setCmpTitle(e.target.value)}
                  placeholder="Brief summary of problem..."
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={cmpDesc}
                  onChange={(e) => setCmpDesc(e.target.value)}
                  placeholder="Provide precise details, lab number, equipment ID, or timing..."
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full">
                File Official Grievance Ticket
              </Button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <Card>
            <CardHeader title="My Past Grievance Tickets" subtitle="Live tracking of resolutions" />
            <CardContent className="divide-y divide-slate-100 p-0 text-xs">
              {complaints.map((c) => (
                <div key={c.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-blue-700 font-bold">{c.ticketNo}</span>
                    <Badge variant={c.status === 'RESOLVED' ? 'success' : 'warning'} size="sm">
                      {c.status}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-slate-900">{c.title}</h4>
                  <p className="text-slate-600 text-[11px]">{c.description}</p>
                  {c.resolution && (
                    <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-800 text-[11px]">
                      <strong>Resolution:</strong> {c.resolution}
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400">
                    Category: {c.category} · Created: {c.createdAt} · Assigned: {c.assignedTo}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // 14. FEEDBACK TAB
  const renderFeedback = () => (
    <div className="space-y-6">
      <PageHeader
        title="Student Academic & Facility Feedback"
        description="Continuous Quality Improvement (NAAC IQAC mandatory process)"
      />

      <div className="max-w-xl mx-auto">
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Submit Anonymous Feedback</h3>
          <p className="text-xs text-slate-500 mb-4">
            Your honest ratings help department heads assess teaching quality and laboratory standards.
          </p>

          {fbSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 mb-3">
              Thank you! Your feedback has been safely submitted to the IQAC coordinator.
            </div>
          )}

          <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Evaluation Category *</label>
              <select
                value={fbCategory}
                onChange={(e) => setFbCategory(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="Faculty Performance">Faculty Teaching & Mentorship</option>
                <option value="Course Curriculum">Course Syllabus & Industry Relevance</option>
                <option value="Lab Facility">Computing Lab & Hardware Equipment</option>
                <option value="Library">Library Resources & IEEE Access</option>
                <option value="Campus Life">Campus Amenities & Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Faculty / Subject / Facility Name</label>
              <input
                type="text"
                value={fbTarget}
                onChange={(e) => setFbTarget(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Rating: {fbRating} / 5 Stars</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFbRating(star)}
                    className={`p-2 rounded border transition-colors ${
                      fbRating >= star
                        ? 'bg-amber-500 text-white border-amber-600 font-bold'
                        : 'bg-white text-slate-400 border-slate-200'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Constructive Comments & Suggestions</label>
              <textarea
                rows={3}
                value={fbComments}
                onChange={(e) => setFbComments(e.target.value)}
                placeholder="Mention specific areas of excellence or suggested improvements..."
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full">
              Submit Academic Feedback
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );

  // Active tab router
  const renderActiveTabContent = () => {
    switch (activePortalTab) {
      case 'dashboard':
        return renderDashboard();
      case 'profile':
        return renderProfile();
      case 'digital-id':
        return renderDigitalID();
      case 'attendance':
        return renderAttendance();
      case 'timetable':
        return renderTimetable();
      case 'assignments':
        return renderAssignments();
      case 'study-material':
        return renderStudyMaterial();
      case 'examinations':
        return renderExaminations();
      case 'results':
        return renderResults();
      case 'fees':
        return renderFees();
      case 'certificates':
        return renderCertificates();
      case 'placements':
        return renderPlacements();
      case 'complaints':
        return renderComplaints();
      case 'feedback':
        return renderFeedback();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {renderActiveTabContent()}

      {/* Assignment Submit Modal */}
      {selectedAsg && (
        <Modal
          isOpen={!!selectedAsg}
          onClose={() => setSelectedAsg(null)}
          title={`Submit Assignment: ${selectedAsg.title}`}
          subtitle={`Subject: ${selectedAsg.subjectCode} · Deadline: ${selectedAsg.deadline}`}
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">{selectedAsg.description}</p>

            <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-slate-800">Upload Solution Document / Archive</p>
              <p className="text-[11px] text-slate-400 mt-0.5">PDF, ZIP, DOCX up to 25 MB</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => alert('Simulated file selection: "DBMS_Assignment4_RahulSharma.pdf" chosen.')}
              >
                Choose Local File
              </Button>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Student Notes / Remarks to Faculty
              </label>
              <textarea
                rows={2}
                value={submissionRemarks}
                onChange={(e) => setSubmissionRemarks(e.target.value)}
                placeholder="Included query benchmarks and index analysis diagrams..."
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedAsg(null)}>
                Cancel
              </Button>
              <Button variant="secondary" size="sm" onClick={handleAssignmentSubmit}>
                Confirm & Submit Assignment
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Demo Fee Payment Gateway Modal */}
      {selectedFee && (
        <Modal
          isOpen={!!selectedFee}
          onClose={() => setSelectedFee(null)}
          title="Online Fee Payment Gateway (Demo Simulation)"
          subtitle={`Academic Fee Account: ${selectedFee.category} (${selectedFee.academicYear})`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-slate-500 block text-[11px]">Pending Balance</span>
                <span className="font-bold text-base text-slate-900">
                  ₹{selectedFee.pendingAmount.toLocaleString()}
                </span>
              </div>
              <Badge variant="warning">Due: {selectedFee.dueDate}</Badge>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Payment Amount (₹)</label>
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                max={selectedFee.pendingAmount}
                className="w-full p-2 border border-slate-300 rounded-md text-sm font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {['UPI', 'Net Banking', 'Debit Card'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPayMethod(method as any)}
                    className={`p-2.5 rounded-md border text-center transition-all ${
                      payMethod === method
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-800 text-[11px]">
              Demo Gateway: Safe test mode simulated. No real currency will be charged.
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedFee(null)}>
                Cancel
              </Button>
              <Button variant="secondary" size="sm" onClick={handlePayFee}>
                Simulate Payment of ₹{payAmount.toLocaleString()}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Official Payment Receipt Printable Modal */}
      {paymentSuccessReceipt && (
        <Modal
          isOpen={!!paymentSuccessReceipt}
          onClose={() => setPaymentSuccessReceipt(null)}
          title="Official Institute Fee Receipt"
          subtitle={`Receipt No: ${paymentSuccessReceipt.receiptNo}`}
        >
          <div className="space-y-4 text-xs">
            <div className="border border-slate-200 rounded-lg p-5 space-y-4 bg-slate-50/40">
              <div className="text-center border-b border-slate-200 pb-3">
                <h4 className="font-extrabold text-sm text-slate-900">{COLLEGE_INFO.name}</h4>
                <p className="text-[10px] text-slate-500">Accounts & Finance Section · Omerga, Dist. Dharashiv</p>
                <Badge variant="success" size="sm" className="mt-1">
                  PAYMENT SUCCESSFUL
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Student Name:</span>
                  <span className="font-semibold text-slate-800">{paymentSuccessReceipt.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Enrollment No:</span>
                  <span className="font-mono text-slate-800">{paymentSuccessReceipt.enrollmentNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Transaction Reference:</span>
                  <span className="font-mono text-slate-800">{paymentSuccessReceipt.transactionId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date & Time:</span>
                  <span className="text-slate-800">{paymentSuccessReceipt.date}</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Total Amount Received:</span>
                <span className="font-extrabold text-blue-800 text-base">
                  ₹{paymentSuccessReceipt.amount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-200">
                <span>Computer Generated Official Receipt</span>
                <span>Signature of Finance Officer [Digitally Signed]</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                icon={<Printer className="w-3.5 h-3.5" />}
              >
                Print Receipt
              </Button>
              <Button variant="primary" size="sm" onClick={() => setPaymentSuccessReceipt(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Request Certificate Modal */}
      {showCertRequestModal && (
        <Modal
          isOpen={showCertRequestModal}
          onClose={() => setShowCertRequestModal(false)}
          title="Request Official Institutional Certificate"
          subtitle="Processed by the Examination & Registrar Cell"
        >
          <form onSubmit={handleRequestCertificate} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Certificate Type *</label>
              <select
                value={certType}
                onChange={(e) => setCertType(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="BONAFIDE">Bonafide Certificate (MSRTC Bus Pass / Bank Account / Education)</option>
                <option value="CHARACTER">Character / Conduct Certificate</option>
                <option value="TRANSFER">Transfer Certificate (TC)</option>
                <option value="LEAVING">College Leaving Certificate (LC)</option>
                <option value="NO_DUES">No Dues Certificate</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">State Purpose of Certificate *</label>
              <input
                type="text"
                required
                value={certPurpose}
                onChange={(e) => setCertPurpose(e.target.value)}
                placeholder="e.g. MSRTC Student Concession Pass / MahaDBT Scholarship"
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <p className="text-[11px] text-slate-500">
              Certificates are normally reviewed and digitally stamped within 24 to 48 working hours.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCertRequestModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary" size="sm">
                Submit Request
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Digital Certificate Viewer & Print Modal */}
      {selectedCertForView && (
        <Modal
          isOpen={!!selectedCertForView}
          onClose={() => setSelectedCertForView(null)}
          title="Digital Certificate Viewer"
          subtitle={`Certificate ID: ${selectedCertForView.certificateNo}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {/* Certificate Canvas */}
            <div className="border-4 border-double border-slate-800 p-8 bg-amber-50/20 text-center space-y-5 rounded">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-wide uppercase">
                  {COLLEGE_INFO.name}
                </h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                  Affiliated to Dr. Babasaheb Ambedkar Marathwada University · College Code: C34650
                </p>
                <div className="my-3 inline-block bg-slate-900 text-white font-serif px-4 py-1 text-xs tracking-widest uppercase">
                  {selectedCertForView.type} CERTIFICATE
                </div>
              </div>

              <p className="text-slate-800 leading-relaxed text-xs text-justify">
                This is to certify that Mr./Ms. <strong>{selectedCertForView.studentName}</strong>, bearing University
                Enrollment Number <strong>{selectedCertForView.enrollmentNo}</strong>, is a bonafide student of this
                institute pursuing Second Year Bachelor of Science in Computer Science (BCS) in the Department of{' '}
                <strong>{selectedCertForView.departmentName}</strong> during the Academic Year 2026-2027.
              </p>

              <p className="text-slate-800 leading-relaxed text-xs text-justify">
                This certificate is issued upon student's request for the purpose of:{' '}
                <em>"{selectedCertForView.purpose}"</em>. To the best of our knowledge and college records, their conduct
                and moral character have been exemplary.
              </p>

              <div className="pt-8 flex items-end justify-between text-xs text-slate-700">
                <div className="text-left space-y-1">
                  <div className="w-16 h-16 bg-slate-900 p-1 rounded flex items-center justify-center">
                    <QrCode className="w-14 h-14 text-white" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    Verify: {selectedCertForView.verificationToken}
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-serif italic font-bold text-slate-900 text-sm">Dr. Sanjay Namdev Aswale</div>
                  <span className="text-[10px] text-slate-500 block">Principal & Director</span>
                  <span className="text-[9px] text-slate-400 block">Issued on: {selectedCertForView.issueDate}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                icon={<Printer className="w-3.5 h-3.5" />}
              >
                Print Certificate
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedCertForView(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Digital Hall Ticket Modal */}
      {showHallTicket && (
        <Modal
          isOpen={showHallTicket}
          onClose={() => setShowHallTicket(false)}
          title="Official End-Semester Hall Ticket (Admit Card)"
          subtitle="Dr. Babasaheb Ambedkar Marathwada University Examination"
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="border border-slate-300 rounded p-5 bg-white space-y-4">
              <div className="text-center border-b border-slate-200 pb-3">
                <h4 className="font-extrabold text-sm text-slate-900">{COLLEGE_INFO.name}</h4>
                <div className="text-xs font-bold text-blue-800 uppercase mt-0.5">
                  UNIVERSITY EXAMINATION ADMIT CARD (HALL TICKET)
                </div>
                <div className="text-[10px] text-slate-500">Center: Shri Chhatrapati Shivaji College, Omerga (Center Code: 062)</div>
              </div>

              <div className="flex gap-4 items-center">
                <img
                  src={studentProfile.avatarUrl}
                  alt={studentProfile.name}
                  className="w-20 h-24 rounded border border-slate-300 object-cover shrink-0"
                />
                <div className="grid grid-cols-2 gap-2 text-xs flex-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">CANDIDATE NAME</span>
                    <span className="font-bold text-slate-900">{studentProfile.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">SEAT NUMBER</span>
                    <span className="font-mono font-bold text-blue-700">W26-COMP-0428</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ENROLLMENT NO (PRN)</span>
                    <span className="font-mono text-slate-800">{studentProfile.enrollmentNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PROGRAM</span>
                    <span className="font-medium text-slate-800">B.Tech (Computer Engg) - Sem 5</span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="p-2">Code</th>
                      <th className="p-2">Course Name</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Time</th>
                      <th className="p-2">Hall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {examSchedule.map((ex) => (
                      <tr key={ex.id}>
                        <td className="p-2 font-mono text-blue-700">{ex.subjectCode}</td>
                        <td className="p-2 font-medium">{ex.subjectName}</td>
                        <td className="p-2">{ex.date}</td>
                        <td className="p-2">{ex.time}</td>
                        <td className="p-2">{ex.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-200">
                <span>Certified Candidate: No Malpractice Record</span>
                <span className="font-semibold text-slate-700">Controller of Examinations</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                icon={<Printer className="w-3.5 h-3.5" />}
              >
                Print Hall Ticket
              </Button>
              <Button variant="primary" size="sm" onClick={() => setShowHallTicket(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
