import React, { useState } from 'react';
import {
  Users,
  Building2,
  GraduationCap,
  Award,
  Briefcase,
  Library,
  Megaphone,
  Calendar,
  MessageSquareWarning,
  History,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  FileText,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { PageHeader } from '../common/PageHeader';
import { StatCard } from '../common/StatCard';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { DataTable } from '../common/DataTable';
import { Modal } from '../common/Modal';
import { COLLEGE_INFO } from '../../data/mockDatabase';

export const AdminPortal: React.FC = () => {
  const {
    activePortalTab,
    admissions,
    updateAdmissionStatus,
    certificates,
    updateCertificateStatus,
    notices,
    addNotice,
    deleteNotice,
    toggleNoticePublish,
    events,
    addEvent,
    placements,
    addPlacementDrive,
    libraryBooks,
    bookIssues,
    issueBook,
    returnBook,
    complaints,
    updateComplaintStatus,
    auditLogs,
    departments,
    studentProfile,
  } = useCollege();

  // New Notice Modal
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [nTitle, setNTitle] = useState('');
  const [nContent, setNContent] = useState('');
  const [nCategory, setNCategory] = useState<any>('Academic');
  const [nTargetRole, setNTargetRole] = useState<any>('ALL');
  const [nUrgent, setNUrgent] = useState(false);

  // New Placement Drive Modal
  const [showAddDrive, setShowAddDrive] = useState(false);
  const [pCompany, setPCompany] = useState('');
  const [pRoles, setPRoles] = useState('');
  const [pPackage, setPPackage] = useState('');
  const [pMinCgpa, setPMinCgpa] = useState(7.5);
  const [pDeadline, setPDeadline] = useState('2026-11-20');

  // Issue Book Modal
  const [showIssueBook, setShowIssueBook] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [issueStudentName, setIssueStudentName] = useState('Rahul Sharma');
  const [issueStudentId, setIssueStudentId] = useState('stud-001');

  // Resolve Complaint Modal
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [resolutionText, setResolutionText] = useState('');

  // Submit Notice
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nTitle || !nContent) return;
    addNotice({
      title: nTitle,
      content: nContent,
      category: nCategory,
      targetRole: nTargetRole,
      isUrgent: nUrgent,
      isPublished: true,
      department: 'Central Administration',
    });
    setShowAddNotice(false);
    setNTitle('');
    setNContent('');
  };

  // Submit Placement Drive
  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pCompany || !pPackage) return;
    addPlacementDrive({
      companyName: pCompany,
      logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100',
      rolesOffered: pRoles,
      packageOffered: pPackage,
      minCgpa: pMinCgpa,
      eligibleBranches: ['Computer Engineering', 'AI & Data Science'],
      driveDate: '2026-11-25',
      deadline: pDeadline,
      location: 'Pune Tech Center',
      status: 'ACTIVE',
    });
    setShowAddDrive(false);
    setPCompany('');
    setPPackage('');
    setPRoles('');
  };

  // Submit Issue Book
  const handleIssueBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookId) return;
    issueBook(selectedBookId, issueStudentId, issueStudentName);
    setShowIssueBook(false);
    setSelectedBookId('');
  };

  // Submit Complaint Resolution
  const handleResolveComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    updateComplaintStatus(selectedComplaint.id, 'RESOLVED', resolutionText);
    setSelectedComplaint(null);
    setResolutionText('');
  };

  // Active tab renderer
  const renderTabContent = () => {
    switch (activePortalTab) {
      // 1. ADMISSIONS
      case 'admissions':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Admissions Management (CAP & Institute Quota)"
              description="Review, verify qualifying scorecards, approve or reject applications"
              badge={<Badge variant="info">Total Applications: {admissions.length}</Badge>}
            />
            <DataTable
              data={admissions}
              searchPlaceholder="Search applicants by name, email, or application number..."
              columns={[
                { key: 'applicationNo', header: 'App No', className: 'font-mono text-blue-700 font-bold' },
                { key: 'fullName', header: 'Candidate Name', className: 'font-semibold text-slate-900' },
                { key: 'courseApplied', header: 'Course Applied' },
                { key: 'qualifyingScore', header: 'CET/12th %', render: (a) => <strong>{a.qualifyingScore}%</strong> },
                { key: 'category', header: 'Category', render: (a) => <Badge size="sm">{a.category}</Badge> },
                { key: 'status', header: 'Status', render: (a) => (
                  <Badge variant={a.status === 'APPROVED' ? 'success' : a.status === 'REJECTED' ? 'danger' : 'warning'} size="sm">
                    {a.status}
                  </Badge>
                )},
                {
                  key: 'actions',
                  header: 'Actions',
                  render: (a) => (
                    <div className="flex items-center gap-1.5">
                      {a.status !== 'APPROVED' && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => updateAdmissionStatus(a.id, 'APPROVED', 'Merit seat allocated')}
                        >
                          Approve
                        </Button>
                      )}
                      {a.status !== 'REJECTED' && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => updateAdmissionStatus(a.id, 'REJECTED', 'Eligibility criteria not met')}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        );

      // 2. CERTIFICATE APPROVALS
      case 'certificates-crud':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Student Certificate Verification & Issuance"
              description="Bonafide, Character, and Leaving certificates approval queue"
            />
            <DataTable
              data={certificates}
              searchPlaceholder="Search certificates..."
              columns={[
                { key: 'studentName', header: 'Student Name', className: 'font-semibold text-slate-900' },
                { key: 'enrollmentNo', header: 'PRN No', className: 'font-mono text-blue-700' },
                { key: 'type', header: 'Type', render: (c) => <strong>{c.type}</strong> },
                { key: 'purpose', header: 'Purpose' },
                { key: 'status', header: 'Status', render: (c) => <Badge variant={c.status === 'ISSUED' ? 'success' : 'warning'} size="sm">{c.status}</Badge> },
                { key: 'certificateNo', header: 'Issued Cert ID', render: (c) => c.certificateNo || <span className="text-slate-400">Pending</span> },
                {
                  key: 'action',
                  header: 'Approve / Issue',
                  render: (c) => (
                    c.status !== 'ISSUED' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => updateCertificateStatus(c.id, 'ISSUED')}
                      >
                        Approve & Issue ID
                      </Button>
                    ) : (
                      <span className="text-emerald-700 font-semibold text-xs">Issued ✓</span>
                    )
                  ),
                },
              ]}
            />
          </div>
        );

      // 3. CMS: NOTICES & NEWS
      case 'cms-notices':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Content Management System: Notices & News"
              description="Publish official circulars, edit announcements, manage website visibility"
              actions={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAddNotice(true)}
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Create New Notice
                </Button>
              }
            />
            <DataTable
              data={notices}
              searchPlaceholder="Filter notices by title or category..."
              columns={[
                { key: 'title', header: 'Notice Title', className: 'font-semibold text-slate-900' },
                { key: 'category', header: 'Category', render: (n) => <Badge size="sm">{n.category}</Badge> },
                { key: 'targetRole', header: 'Target Audience' },
                { key: 'publishedDate', header: 'Date' },
                { key: 'isPublished', header: 'Status', render: (n) => (
                  <Badge variant={n.isPublished ? 'success' : 'default'} size="sm">
                    {n.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </Badge>
                )},
                {
                  key: 'actions',
                  header: 'Actions',
                  render: (n) => (
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleNoticePublish(n.id)}
                      >
                        {n.isPublished ? 'Unpublish' : 'Publish'}
                      </Button>
                      <button
                        onClick={() => deleteNotice(n.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        );

      // 4. PLACEMENT DRIVES CRUD
      case 'placements-crud':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Placement Drives & Corporate Recruiting"
              description="Manage visiting companies, eligibility criteria, and student job applications"
              actions={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAddDrive(true)}
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Post New Recruitment Drive
                </Button>
              }
            />
            <DataTable
              data={placements}
              columns={[
                { key: 'companyName', header: 'Company', className: 'font-bold text-slate-900' },
                { key: 'packageOffered', header: 'Package (CTC)', className: 'font-bold text-emerald-700' },
                { key: 'rolesOffered', header: 'Designation' },
                { key: 'minCgpa', header: 'Min CGPA' },
                { key: 'driveDate', header: 'Drive Date' },
                { key: 'appliedCount', header: 'Applications', render: (p) => <span>{p.appliedCount} Candidates</span> },
                { key: 'status', header: 'Status', render: (p) => <Badge variant="success" size="sm">{p.status}</Badge> },
              ]}
            />
          </div>
        );

      // 5. LIBRARY MANAGEMENT
      case 'library-crud':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Central Library Management (OPAC & Transactions)"
              description="Catalog of 65,000 volumes, circulation desk, issue & return tracking"
              actions={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowIssueBook(true)}
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Issue Book to Student
                </Button>
              }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <Card>
                  <CardHeader title="Book Catalogue Inventory" subtitle="Available copies in library racks" />
                  <CardContent className="p-0">
                    <DataTable
                      data={libraryBooks}
                      columns={[
                        { key: 'title', header: 'Book Title', className: 'font-semibold text-slate-900' },
                        { key: 'author', header: 'Author' },
                        { key: 'shelfLocation', header: 'Rack Location', className: 'text-[11px] text-slate-500' },
                        { key: 'availableCopies', header: 'Available / Total', render: (b) => <strong>{b.availableCopies} / {b.totalCopies}</strong> },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-5">
                <Card>
                  <CardHeader title="Current Book Issues" subtitle="Circulation register" />
                  <CardContent className="p-0">
                    <DataTable
                      data={bookIssues}
                      columns={[
                        { key: 'bookTitle', header: 'Book Title', className: 'font-medium text-slate-900' },
                        { key: 'studentName', header: 'Issued To' },
                        { key: 'dueDate', header: 'Due Date' },
                        { key: 'status', header: 'Status', render: (i) => <Badge variant={i.status === 'RETURNED' ? 'success' : 'warning'} size="sm">{i.status}</Badge> },
                        {
                          key: 'action',
                          header: 'Action',
                          render: (i) =>
                            i.status === 'ISSUED' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => returnBook(i.id)}
                              >
                                Return
                              </Button>
                            ) : (
                              <span className="text-slate-400 text-xs">Closed</span>
                            ),
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      // 6. GRIEVANCE REDRESSAL
      case 'complaints-crud':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Grievance Redressal Committee Desk"
              description="Review and resolve formal student, faculty, and parent complaints"
            />
            <DataTable
              data={complaints}
              columns={[
                { key: 'ticketNo', header: 'Ticket No', className: 'font-mono text-blue-700 font-bold' },
                { key: 'title', header: 'Subject Title', className: 'font-semibold text-slate-900' },
                { key: 'category', header: 'Category', render: (c) => <Badge size="sm">{c.category}</Badge> },
                { key: 'submittedBy', header: 'Complainant' },
                { key: 'status', header: 'Status', render: (c) => <Badge variant={c.status === 'RESOLVED' ? 'success' : 'danger'} size="sm">{c.status}</Badge> },
                {
                  key: 'action',
                  header: 'Action',
                  render: (c) => (
                    c.status !== 'RESOLVED' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedComplaint(c);
                          setResolutionText('');
                        }}
                      >
                        Resolve Ticket
                      </Button>
                    ) : (
                      <span className="text-emerald-700 text-xs font-semibold">Resolved ✓</span>
                    )
                  ),
                },
              ]}
            />
          </div>
        );

      // 7. SECURITY AUDIT LOGS
      case 'audit-logs':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Security & System Audit Logging"
              description="Tamper-evident chronological activity trail of all administrative mutations"
              badge={<Badge variant="purple">Total Logged Events: {auditLogs.length}</Badge>}
            />
            <DataTable
              data={auditLogs}
              searchPlaceholder="Search audit trails by user, action or module..."
              columns={[
                { key: 'timestamp', header: 'Timestamp', className: 'font-mono text-slate-500 text-[11px]' },
                { key: 'userName', header: 'User Account', className: 'font-semibold text-slate-900' },
                { key: 'role', header: 'Role', render: (l) => <Badge size="sm">{l.role}</Badge> },
                { key: 'action', header: 'Action', className: 'font-mono text-blue-700 font-semibold' },
                { key: 'module', header: 'Module' },
                { key: 'details', header: 'Details & Record Reference', className: 'text-slate-600' },
                { key: 'ipAddress', header: 'IP', className: 'font-mono text-[10px] text-slate-400' },
              ]}
            />
          </div>
        );

      // DEFAULT: SYSTEM OVERVIEW
      default:
        return (
          <div className="space-y-6">
            <PageHeader
              title="Super Administrator Master Dashboard"
              description="Unified ERP Administration · Security Access Controls · Infrastructure Services"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Pending Admissions"
                value={admissions.filter((a) => a.status === 'SUBMITTED').length}
                subtitle="Online applications awaiting review"
                icon={<Users className="w-4 h-4" />}
                highlightColor="amber"
              />
              <StatCard
                title="Open Grievances"
                value={complaints.filter((c) => c.status === 'OPEN').length}
                subtitle="Active complaint tickets"
                icon={<MessageSquareWarning className="w-4 h-4" />}
                highlightColor="rose"
              />
              <StatCard
                title="Certificates Due"
                value={certificates.filter((c) => c.status !== 'ISSUED').length}
                subtitle="Pending bonafide requests"
                icon={<Award className="w-4 h-4" />}
                highlightColor="blue"
              />
              <StatCard
                title="Library Books Issued"
                value={bookIssues.filter((i) => i.status === 'ISSUED').length}
                subtitle="Circulation active"
                icon={<Library className="w-4 h-4" />}
                highlightColor="indigo"
              />
            </div>

            {/* Quick module links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-5 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Admissions Processing</h4>
                <p className="text-xs text-slate-500">
                  Review applicant documents, qualifying marks, and allocate seats under Merit Quota.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => alert('Navigate using the left sidebar to Admissions Management')}
                >
                  Manage Admissions
                </Button>
              </Card>

              <Card className="p-5 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Website CMS Publisher</h4>
                <p className="text-xs text-slate-500">
                  Instantly publish or unpublish official notices, campus news, events, and gallery items.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => setShowAddNotice(true)}
                >
                  Publish New Circular
                </Button>
              </Card>

              <Card className="p-5 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Placement Recruitment Drives</h4>
                <p className="text-xs text-slate-500">
                  Post new corporate hiring drives and track registered candidate profiles.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => setShowAddDrive(true)}
                >
                  Post Hiring Drive
                </Button>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {renderTabContent()}

      {/* Create Notice Modal */}
      {showAddNotice && (
        <Modal
          isOpen={showAddNotice}
          onClose={() => setShowAddNotice(false)}
          title="Publish Official Notice (CMS)"
          subtitle="Instant dynamic update to the Public Website & Portals"
        >
          <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Notice Title *</label>
              <input
                type="text"
                required
                value={nTitle}
                onChange={(e) => setNTitle(e.target.value)}
                placeholder="e.g. Winter 2026 Examination Hall Ticket Allotment"
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={nCategory}
                  onChange={(e) => setNCategory(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Academic">Academic</option>
                  <option value="Examination">Examination</option>
                  <option value="Placement">Placement</option>
                  <option value="Admission">Admission</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Audience</label>
                <select
                  value={nTargetRole}
                  onChange={(e) => setNTargetRole(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="ALL">All Campus Community</option>
                  <option value="STUDENT">Students Only</option>
                  <option value="FACULTY">Faculty Staff Only</option>
                  <option value="PARENT">Parents Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Notice Content *</label>
              <textarea
                rows={4}
                required
                value={nContent}
                onChange={(e) => setNContent(e.target.value)}
                placeholder="Full official circular announcement..."
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="urgentCheck"
                checked={nUrgent}
                onChange={(e) => setNUrgent(e.target.checked)}
                className="rounded border-slate-300 text-rose-600"
              />
              <label htmlFor="urgentCheck" className="text-slate-700 font-medium">
                Mark as High Priority / Urgent Notice
              </label>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddNotice(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary" size="sm">
                Publish Notice Now
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Post Hiring Drive Modal */}
      {showAddDrive && (
        <Modal
          isOpen={showAddDrive}
          onClose={() => setShowAddDrive(false)}
          title="Post Campus Hiring Recruitment Drive"
          subtitle="T&P Cell Company Onboarding"
        >
          <form onSubmit={handleCreateDrive} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={pCompany}
                onChange={(e) => setPCompany(e.target.value)}
                placeholder="e.g. Atlassian / Google Cloud"
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Package Offered *</label>
                <input
                  type="text"
                  required
                  value={pPackage}
                  onChange={(e) => setPPackage(e.target.value)}
                  placeholder="e.g. ₹22.0 LPA"
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Min CGPA Required</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={pMinCgpa}
                  onChange={(e) => setPMinCgpa(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Roles Offered *</label>
              <input
                type="text"
                required
                value={pRoles}
                onChange={(e) => setPRoles(e.target.value)}
                placeholder="e.g. Cloud Security Analyst / SDE"
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddDrive(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary" size="sm">
                Publish Recruitment Drive
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Issue Book Modal */}
      {showIssueBook && (
        <Modal
          isOpen={showIssueBook}
          onClose={() => setShowIssueBook(false)}
          title="Issue Book to Student"
          subtitle="Circulation counter checkout"
        >
          <form onSubmit={handleIssueBookSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Select Book Title *</label>
              <select
                required
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="">-- Choose Book from Catalogue --</option>
                {libraryBooks.map((b) => (
                  <option key={b.id} value={b.id} disabled={b.availableCopies <= 0}>
                    {b.title} ({b.availableCopies} available)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Student Name *</label>
              <input
                type="text"
                required
                value={issueStudentName}
                onChange={(e) => setIssueStudentName(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <p className="text-[11px] text-slate-500">
              Loan duration: 15 days. Due date calculated automatically.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowIssueBook(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary" size="sm" disabled={!selectedBookId}>
                Issue Book Copy
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Resolve Grievance Modal */}
      {selectedComplaint && (
        <Modal
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          title={`Resolve Grievance: ${selectedComplaint.ticketNo}`}
          subtitle={`Submitted by: ${selectedComplaint.submittedBy}`}
        >
          <form onSubmit={handleResolveComplaint} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <h4 className="font-bold text-slate-900">{selectedComplaint.title}</h4>
              <p className="text-slate-600 mt-1">{selectedComplaint.description}</p>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Official Resolution Remarks *</label>
              <textarea
                rows={3}
                required
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                placeholder="State actions taken to resolve the issue..."
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedComplaint(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="success" size="sm">
                Mark Resolved & Close
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
