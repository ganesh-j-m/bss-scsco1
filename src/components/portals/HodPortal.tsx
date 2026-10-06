import React from 'react';
import {
  Building2,
  Users,
  CalendarCheck,
  GraduationCap,
  ClipboardList,
  AlertTriangle,
  BookOpen,
  Award,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { PageHeader } from '../common/PageHeader';
import { StatCard } from '../common/StatCard';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import { DataTable } from '../common/DataTable';

export const HodPortal: React.FC = () => {
  const { departments, subjects, subjectAttendance } = useCollege();
  const currentDept = departments.find((d) => d.code === 'BOTANY') || departments[0];

  const facultyWorkload = [
    { name: 'Dr. V. D. Devarkar (VP Science & HOD)', designation: 'Professor & Head', theoryHours: 8, labHours: 4, totalHours: 12, subjects: 'Plant Physiology & Research' },
    { name: 'Dr. A. S. Shinde', designation: 'Assistant Professor', theoryHours: 8, labHours: 6, totalHours: 14, subjects: 'Taxonomy & Angiosperms' },
    { name: 'Shri G. S. More (Vice Principal Jr.)', designation: 'Lecturer (Jr)', theoryHours: 10, labHours: 6, totalHours: 16, subjects: 'Botany Cell Biology' },
    { name: 'Shri M. D. Salunke', designation: 'Lecturer', theoryHours: 10, labHours: 6, totalHours: 16, subjects: 'Genetics & Morphology' },
    { name: 'Dr. P. M. Jawalgekar', designation: 'Lecturer', theoryHours: 8, labHours: 6, totalHours: 14, subjects: 'Medicinal Plants & Ecology' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title={`Head of Department Portal: ${currentDept.name}`}
        description={`${currentDept.hodName} · Department Code: ${currentDept.code} · Established ${currentDept.establishedYear}`}
        badge={<Badge variant="purple">Autonomous Board of Studies</Badge>}
      />

      {/* Top Department Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Department Students"
          value={currentDept.studentCount}
          subtitle="SE: 240 · TE: 240 · BE: 240"
          icon={<Users className="w-4 h-4" />}
          highlightColor="blue"
        />
        <StatCard
          title="Faculty Strength"
          value={`${currentDept.facultyCount} Scholars`}
          subtitle="Cadre Ratio 1:15 (AICTE Norms Met)"
          icon={<ClipboardList className="w-4 h-4" />}
          highlightColor="indigo"
        />
        <StatCard
          title="Average Department Attendance"
          value="88.4%"
          subtitle="Across All 8 Semesters"
          icon={<CalendarCheck className="w-4 h-4" />}
          highlightColor="emerald"
        />
        <StatCard
          title="Average Pass Percentage"
          value="96.8%"
          subtitle="SPPU University Examination 2026"
          icon={<Award className="w-4 h-4" />}
          highlightColor="amber"
        />
      </div>

      {/* Attendance Shortage Warning Alert */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-sm">Attendance Monitoring Action List:</strong>
          <span>
            14 students in Third Year Division A are currently tracking below 75% aggregate attendance. Defaulters parent counseling meet has been scheduled for this Saturday.
          </span>
        </div>
      </div>

      {/* Faculty Workload Allotment Table */}
      <Card>
        <CardHeader
          title="Faculty Teaching Load & Subject Allotment (Term 1)"
          subtitle="AICTE weekly teaching load guidelines (12-16 hours / week)"
        />
        <CardContent className="p-0">
          <DataTable
            data={facultyWorkload}
            columns={[
              { key: 'name', header: 'Faculty Scholar', className: 'font-semibold text-slate-900' },
              { key: 'designation', header: 'Designation' },
              { key: 'subjects', header: 'Allotted Subject' },
              { key: 'theoryHours', header: 'Theory (Hrs)' },
              { key: 'labHours', header: 'Lab (Hrs)' },
              { key: 'totalHours', header: 'Total Load', render: (f) => <strong>{f.totalHours} hrs/week</strong> },
            ]}
          />
        </CardContent>
      </Card>

      {/* Department Subjects & Curriculum */}
      <Card>
        <CardHeader
          title="Current Semester Curriculum & Credits (Semester 5)"
          subtitle="Approved by Board of Studies, SPPU"
        />
        <CardContent className="p-0">
          <DataTable
            data={subjects}
            columns={[
              { key: 'code', header: 'Course Code', className: 'font-mono text-blue-700 font-semibold' },
              { key: 'name', header: 'Subject Title', className: 'font-semibold text-slate-900' },
              { key: 'type', header: 'Pattern', render: (s) => <Badge size="sm">{s.type}</Badge> },
              { key: 'credits', header: 'Credits', render: (s) => <strong>{s.credits} Credits</strong> },
              { key: 'facultyName', header: 'Course Coordinator' },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};
