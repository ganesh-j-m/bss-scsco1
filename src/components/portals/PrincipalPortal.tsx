import React from 'react';
import {
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  CreditCard,
  Award,
  CalendarCheck,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useCollege } from '../../context/CollegeContext';
import { PageHeader } from '../common/PageHeader';
import { StatCard } from '../common/StatCard';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import { COLLEGE_INFO } from '../../data/mockDatabase';

export const PrincipalPortal: React.FC = () => {
  const { departments, admissions, complaints } = useCollege();

  // Recharts Chart Datasets
  const departmentStrengthData = departments.map((d) => ({
    name: d.code,
    fullName: d.name,
    students: d.studentCount,
    faculty: d.facultyCount,
  }));

  const monthlyAttendanceTrend = [
    { month: 'Jul', attendance: 92.4, target: 80 },
    { month: 'Aug', attendance: 90.1, target: 80 },
    { month: 'Sep', attendance: 88.5, target: 80 },
    { month: 'Oct', attendance: 87.8, target: 80 },
    { month: 'Nov', attendance: 89.2, target: 80 },
    { month: 'Dec', attendance: 91.0, target: 80 },
  ];

  const placementTrends = [
    { year: '2022', placed: 88, highestLpa: 24, avgLpa: 6.8 },
    { year: '2023', placed: 91, highestLpa: 32, avgLpa: 7.4 },
    { year: '2024', placed: 93, highestLpa: 36, avgLpa: 8.0 },
    { year: '2025', placed: 94.2, highestLpa: 42, avgLpa: 8.6 },
  ];

  const feeCollectionPie = [
    { name: 'Collected Fees', value: 24800000, color: '#10b981' },
    { name: 'Pending Installments', value: 3200000, color: '#f59e0b' },
    { name: 'Govt. MahaDBT Subsidy Due', value: 4500000, color: '#3b82f6' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Principal & Institutional Executive Dashboard"
        description={`${COLLEGE_INFO.principalName} · Institution Head (Phone: ${COLLEGE_INFO.principalPhone}) · Affiliated to BAMU`}
        badge={<Badge variant="success">NAAC 'A' Grade (CGPA 3.14) · BAMU AAA Audit 263/300</Badge>}
      />

      {/* Institutional Top Stat KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Student Enrolled"
          value={COLLEGE_INFO.totalStudents.toLocaleString()}
          subtitle="Across 6 Academic Departments"
          icon={<Users className="w-4 h-4" />}
          highlightColor="blue"
        />
        <StatCard
          title="Faculty Scholars"
          value={COLLEGE_INFO.totalFaculty}
          subtitle="Ph.D Holders: 48 (35.5%)"
          icon={<Award className="w-4 h-4" />}
          highlightColor="indigo"
        />
        <StatCard
          title="Campus Placement Rate"
          value={COLLEGE_INFO.placementRate}
          subtitle={`Highest: ${COLLEGE_INFO.highestPackage}`}
          icon={<Briefcase className="w-4 h-4" />}
          highlightColor="emerald"
        />
        <StatCard
          title="Total Fee Collection"
          value="₹24.8 Cr"
          subtitle="88.6% of Annual Budget Collected"
          icon={<CreditCard className="w-4 h-4" />}
          highlightColor="amber"
        />
      </div>

      {/* Row 1: Charts (Student Strength & Monthly Attendance) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department Student Strength Bar Chart */}
        <div className="lg:col-span-7">
          <Card className="p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900">Student Strength by Department</h3>
              <p className="text-xs text-slate-500">Total undergraduate and postgraduate headcount</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentStrengthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ fontSize: '11px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="students" fill="#2563eb" name="Students" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="faculty" fill="#93c5fd" name="Faculty" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Monthly Attendance Trend Line Chart */}
        <div className="lg:col-span-5">
          <Card className="p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900">Institute-Wide Attendance Trend</h3>
              <p className="text-xs text-slate-500">Benchmark minimum mandatory threshold: 75%</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyAttendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                  <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2.5} name="Actual Attendance %" />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1.5} name="Req. Minimum %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 2: Charts (Placement Trend AreaChart & Fee Revenue Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Placement Growth Area Chart */}
        <div className="lg:col-span-7">
          <Card className="p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900">Four-Year Campus Placement Salary Growth</h3>
              <p className="text-xs text-slate-500">Highest package offered (₹ LPA) vs Average package</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={placementTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                  <Area type="monotone" dataKey="highestLpa" stroke="#3b82f6" fill="#bfdbfe" fillOpacity={0.5} name="Highest CTC (₹ LPA)" />
                  <Area type="monotone" dataKey="avgLpa" stroke="#10b981" fill="#a7f3d0" fillOpacity={0.5} name="Average CTC (₹ LPA)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Fee Collection Status Pie */}
        <div className="lg:col-span-5">
          <Card className="p-5">
            <div className="mb-2">
              <h3 className="text-sm font-bold text-slate-900">Institutional Revenue & Dues</h3>
              <p className="text-xs text-slate-500">Fee realization breakdown</p>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feeCollectionPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {feeCollectionPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => `₹${(Number(val) / 10000000).toFixed(2)} Cr`}
                    contentStyle={{ fontSize: '11px', borderRadius: '6px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Statutory Bodies Oversight & Active Grievances */}
      <Card>
        <CardHeader
          title="Internal Complaints & Grievance Committee Oversight"
          subtitle="Mandated statutory reporting under AICTE & UGC regulations"
        />
        <CardContent className="divide-y divide-slate-100 p-0 text-xs">
          {complaints.map((c) => (
            <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-blue-700 font-semibold">{c.ticketNo}</span>
                <h4 className="font-bold text-slate-900 mt-0.5">{c.title}</h4>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Submitted by {c.submittedBy} ({c.role}) · Assigned to {c.assignedTo}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={c.status === 'RESOLVED' ? 'success' : 'warning'}>
                  {c.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
