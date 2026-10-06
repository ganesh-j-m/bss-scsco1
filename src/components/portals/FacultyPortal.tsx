import React, { useState } from 'react';
import {
  BookOpen,
  CalendarCheck,
  FileCheck2,
  FileSpreadsheet,
  Megaphone,
  Upload,
  CheckCircle2,
  Users,
  Clock,
  Plus,
  Search,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { PageHeader } from '../common/PageHeader';
import { StatCard } from '../common/StatCard';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { DataTable } from '../common/DataTable';

export const FacultyPortal: React.FC = () => {
  const {
    activePortalTab,
    assignments,
    createAssignment,
    markAttendanceBatch,
    addNotice,
    studyMaterials,
  } = useCollege();

  // Attendance Marking State
  const [selectedSubject, setSelectedSubject] = useState('CS501');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [classRollList, setClassRollList] = useState([
    { rollNo: 'COMP-TE-A-01', name: 'Aarav Patel', present: true },
    { rollNo: 'COMP-TE-A-02', name: 'Aditi Joshi', present: true },
    { rollNo: 'COMP-TE-A-03', name: 'Aniket Deshmukh', present: true },
    { rollNo: 'COMP-TE-A-12', name: 'Kavita Shinde', present: true },
    { rollNo: 'COMP-TE-A-25', name: 'Omkar Bhosale', present: false },
    { rollNo: 'COMP-TE-A-33', name: 'Pooja Kulkarni', present: true },
    { rollNo: 'COMP-TE-A-42', name: 'Rahul Sharma', present: true },
    { rollNo: 'COMP-TE-A-43', name: 'Rohit Kadam', present: false },
    { rollNo: 'COMP-TE-A-50', name: 'Sneha More', present: true },
    { rollNo: 'COMP-TE-A-58', name: 'Tanvi Gaikwad', present: true },
  ]);
  const [attendanceSuccess, setAttendanceSuccess] = useState(false);

  // Assignment Creator State
  const [asgSubject, setAsgSubject] = useState('CS501');
  const [asgTitle, setAsgTitle] = useState('');
  const [asgDesc, setAsgDesc] = useState('');
  const [asgDeadline, setAsgDeadline] = useState('2026-11-05');
  const [asgMarks, setAsgMarks] = useState(25);
  const [asgSuccess, setAsgSuccess] = useState(false);

  // Notice Creator State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<any>('Academic');
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // Toggle student attendance
  const toggleAttendance = (rollNo: string) => {
    setClassRollList((prev) =>
      prev.map((s) => (s.rollNo === rollNo ? { ...s, present: !s.present } : s))
    );
  };

  const handleBatchAttendanceSubmit = () => {
    markAttendanceBatch(selectedSubject, classRollList);
    setAttendanceSuccess(true);
    setTimeout(() => setAttendanceSuccess(false), 4000);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle || !asgDesc) return;

    createAssignment({
      subjectCode: asgSubject,
      subjectName: asgSubject === 'CS501' ? 'Database Management Systems' : 'DBMS Lab',
      title: asgTitle,
      description: asgDesc,
      deadline: asgDeadline,
      totalMarks: asgMarks,
      facultyName: 'Prof. Rajesh Patil',
    });

    setAsgTitle('');
    setAsgDesc('');
    setAsgSuccess(true);
    setTimeout(() => setAsgSuccess(false), 4000);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;

    addNotice({
      title: noticeTitle,
      content: noticeContent,
      category: noticeCategory,
      targetRole: 'STUDENT',
      isUrgent: false,
      isPublished: true,
      department: 'Computer Engineering',
    });

    setNoticeTitle('');
    setNoticeContent('');
    setNoticeSuccess(true);
    setTimeout(() => setNoticeSuccess(false), 4000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Faculty Academic Portal"
        description="Dr. V. S. Suryawanshi · Professor & Head · Department of Chemistry & Research Center"
        badge={<Badge variant="info">Faculty ID: SCSCO-FAC-1996-018</Badge>}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Subjects"
          value="2 Courses"
          subtitle="CS501 DBMS & CS505 DBMS Lab"
          icon={<BookOpen className="w-4 h-4" />}
          highlightColor="blue"
        />
        <StatCard
          title="Total Students"
          value="142"
          subtitle="Division A (68) & Division B (74)"
          icon={<Users className="w-4 h-4" />}
          highlightColor="indigo"
        />
        <StatCard
          title="Average Attendance"
          value="89.2%"
          subtitle="Class Performance Indicator"
          icon={<CalendarCheck className="w-4 h-4" />}
          highlightColor="emerald"
        />
        <StatCard
          title="Assignments Active"
          value={assignments.length}
          subtitle="Coursework submissions in review"
          icon={<FileCheck2 className="w-4 h-4" />}
          highlightColor="amber"
        />
      </div>

      {/* 1. MARK ATTENDANCE TOOL */}
      <Card>
        <CardHeader
          title="Mark Lecture & Practical Attendance"
          subtitle="Instant student roll verification & university compliance sync"
        />
        <CardContent className="space-y-4">
          {attendanceSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Attendance recorded successfully! Overall percentages updated instantly across student dashboards.</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="text-xs p-2 border border-slate-300 rounded bg-white"
              >
                <option value="CS501">CS501 - Database Management Systems (Div A)</option>
                <option value="CS505">CS505 - DBMS Laboratory (Batch A1)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="text-xs p-2 border border-slate-300 rounded bg-white"
              />
            </div>

            <div className="ml-auto flex items-center gap-2 self-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClassRollList((prev) => prev.map((s) => ({ ...s, present: true })))}
              >
                Mark All Present
              </Button>
              <Button variant="secondary" size="sm" onClick={handleBatchAttendanceSubmit}>
                Submit Attendance Batch
              </Button>
            </div>
          </div>

          {/* Roll table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="p-2.5">Roll No</th>
                  <th className="p-2.5">Student Name</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Toggle Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classRollList.map((st) => (
                  <tr key={st.rollNo} className="hover:bg-slate-50/70">
                    <td className="p-2.5 font-mono text-blue-700">{st.rollNo}</td>
                    <td className="p-2.5 font-medium text-slate-900">{st.name}</td>
                    <td className="p-2.5">
                      <Badge variant={st.present ? 'success' : 'danger'} size="sm">
                        {st.present ? 'PRESENT' : 'ABSENT'}
                      </Badge>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => toggleAttendance(st.rollNo)}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                          st.present
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        {st.present ? 'Mark Absent' : 'Mark Present'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 2. CREATE ASSIGNMENTS & NOTICES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignment Creator */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Create Coursework Assignment</h3>
          <p className="text-xs text-slate-500 mb-4">Post technical problem sets for students.</p>

          {asgSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 mb-3">
              Assignment published to student dashboard!
            </div>
          )}

          <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Assignment Title *</label>
              <input
                type="text"
                required
                value={asgTitle}
                onChange={(e) => setAsgTitle(e.target.value)}
                placeholder="e.g. Assignment 5: Concurrency Control in PostgreSQL"
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Deadline Date *</label>
                <input
                  type="date"
                  required
                  value={asgDeadline}
                  onChange={(e) => setAsgDeadline(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Max Total Marks *</label>
                <input
                  type="number"
                  required
                  value={asgMarks}
                  onChange={(e) => setAsgMarks(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Problem Description *</label>
              <textarea
                rows={3}
                required
                value={asgDesc}
                onChange={(e) => setAsgDesc(e.target.value)}
                placeholder="Detailed instructions, requirements, deliverables..."
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <Button type="submit" variant="primary" size="sm" className="w-full">
              Publish Assignment
            </Button>
          </form>
        </Card>

        {/* Department Notice Publisher */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Publish Department Circular</h3>
          <p className="text-xs text-slate-500 mb-4">Official announcements directly visible to students.</p>

          {noticeSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 mb-3">
              Circular published across website & student notifications!
            </div>
          )}

          <form onSubmit={handlePublishNotice} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Notice Title *</label>
              <input
                type="text"
                required
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder="e.g. Schedule for Mock Technical Interviews"
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Notice Content *</label>
              <textarea
                rows={4}
                required
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                placeholder="Full official circular text..."
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <Button type="submit" variant="secondary" size="sm" className="w-full">
              Publish Notice
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
