import React, { useState } from 'react';
import {
  GraduationCap,
  ArrowRight,
  Calendar,
  FileText,
  Briefcase,
  Users,
  Award,
  BookOpen,
  MapPin,
  Clock,
  Download,
  Search,
  Phone,
  CheckCircle2,
  ChevronRight,
  Building2,
  Cpu,
  Sparkles,
  Shield,
  Layers,
  Send,
  ExternalLink,
  ChevronLeft,
  Filter,
  Microscope,
  Leaf,
  Compass,
  TrendingUp,
  CreditCard,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card, CardContent } from '../common/Card';
import { CollegeLogo } from '../common/CollegeLogo';
import { COLLEGE_INFO } from '../../data/mockDatabase';
import { Modal } from '../common/Modal';

interface PublicWebsiteProps {
  onOpenAuth: () => void;
  onOpenAI: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onOpenAuth, onOpenAI }) => {
  const {
    departments,
    courses,
    notices,
    events,
    news,
    gallery,
    placements,
    registerForEvent,
    submitAdmissionApplication,
    setActiveView,
  } = useCollege();

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: "Bharat Shikshan Sanstha's Shri Chhatrapati Shivaji College, Omerga",
      subtitle: "NAAC Re-accreditation 'A' Grade (CGPA 3.14) · Affiliated to Dr. Babasaheb Ambedkar Marathwada University · Estd. 1959",
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80',
      badge: 'माहिती पुस्तिका २०२६-२७ · Admissions Open',
    },
    {
      title: '30-Acre Smart Campus with 31 Research & Advanced Laboratories',
      subtitle: 'Common Research Facility (CRFC) with XRD & FTIR · 41 Ph.D. Chemistry Alumni · ICICI RAC Laboratory',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&auto=format&fit=crop&q=80',
      badge: 'Research & Innovation Excellence',
    },
    {
      title: 'Knowledge Resource Center with 1,17,397 Books & Night Study Room',
      subtitle: 'Career Katta (Code: C34650) · NISM Capital Markets Partner · Police & Defence Academy',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&auto=format&fit=crop&q=80',
      badge: 'Comprehensive Student Empowerment',
    },
  ];

  // Notices filter
  const [noticeCategory, setNoticeCategory] = useState<string>('All');
  const [noticeSearch, setNoticeSearch] = useState<string>('');

  // Gallery category filter
  const [galleryCategory, setGalleryCategory] = useState<string>('All');

  // Selected Department for Details Modal
  const [selectedDept, setSelectedDept] = useState<any>(null);

  // Admission Application Form State
  const [admFullName, setAdmFullName] = useState('');
  const [admEmail, setAdmEmail] = useState('');
  const [admPhone, setAdmPhone] = useState('');
  const [admCourse, setAdmCourse] = useState('B.Sc. in Computer Science (BCS)');
  const [admSchool, setAdmSchool] = useState('');
  const [admScore, setAdmScore] = useState('');
  const [admCategory, setAdmCategory] = useState<'General' | 'OBC' | 'SC' | 'ST' | 'EWS'>('General');
  const [admSubmittedAppNo, setAdmSubmittedAppNo] = useState<string | null>(null);

  // Filtered Notices
  const filteredNotices = notices
    .filter((n) => n.isPublished)
    .filter((n) => (noticeCategory === 'All' ? true : n.category === noticeCategory))
    .filter((n) =>
      noticeSearch.trim() === ''
        ? true
        : n.title.toLowerCase().includes(noticeSearch.toLowerCase()) ||
          n.content.toLowerCase().includes(noticeSearch.toLowerCase())
    );

  // Filtered Gallery
  const filteredGallery = gallery.filter((item) =>
    galleryCategory === 'All' ? true : item.category === galleryCategory
  );

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admFullName || !admEmail || !admPhone || !admScore) return;

    const assignedDeptCode = admCourse.includes('Computer')
      ? 'COMPSCI'
      : admCourse.includes('Chemistry')
      ? 'CHEMISTRY'
      : admCourse.includes('Commerce')
      ? 'COMMERCE'
      : 'ARTS';

    const generatedAppNo = submitAdmissionApplication({
      fullName: admFullName,
      email: admEmail,
      phone: admPhone,
      courseApplied: admCourse,
      departmentCode: assignedDeptCode,
      previousSchool: admSchool || 'HSC Science / Equivalent',
      qualifyingScore: parseFloat(admScore) || 85.0,
      category: admCategory,
    });

    setAdmSubmittedAppNo(generatedAppNo);
    setAdmFullName('');
    setAdmEmail('');
    setAdmPhone('');
    setAdmSchool('');
    setAdmScore('');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SLIDER */}
      <section id="hero" className="relative bg-slate-950 text-white overflow-hidden min-h-[560px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="SCSCO Omerga Campus"
            className="w-full h-full object-cover opacity-30 transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-md text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{heroSlides[currentSlide].badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Online Admission Form 2026-27</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#special-units"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors"
              >
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>RAC Lab & Career Katta</span>
              </a>

              <button
                onClick={onOpenAI}
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-amber-300 px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Brochure AI Advisor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
          <div className="ml-3 flex items-center gap-1">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACCESS ACTION TILES */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Staff / Student ERP', icon: GraduationCap, action: onOpenAuth, color: 'text-blue-700 bg-blue-50' },
              { label: 'Admissions 2026', icon: FileText, href: '#admissions', color: 'text-emerald-700 bg-emerald-50' },
              { label: 'Junior College (11th)', icon: BookOpen, href: '#academics', color: 'text-indigo-700 bg-indigo-50' },
              { label: 'BCS & B.Sc. IT', icon: Cpu, href: '#academics', color: 'text-purple-700 bg-purple-50' },
              { label: 'ICICI RAC Lab', icon: Layers, href: '#special-units', color: 'text-amber-700 bg-amber-50' },
              { label: 'Soil Testing Lab', icon: Leaf, href: '#special-units', color: 'text-teal-700 bg-teal-50' },
              { label: 'Career Katta (C34650)', icon: Compass, href: '#special-units', color: 'text-rose-700 bg-rose-50' },
              { label: 'Central Library', icon: BookOpen, href: '#library', color: 'text-sky-700 bg-sky-50' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return item.href ? (
                <a
                  key={idx}
                  href={item.href}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-center group bg-white"
                >
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center mb-2 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                    {item.label}
                  </span>
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-center group bg-white cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center mb-2 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. OFFICIAL ACCREDITATIONS & INSTITUTIONAL HIGHLIGHTS */}
      <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">NAAC 'A'</div>
              <div className="text-xs text-slate-400 mt-1">CGPA 3.14 (Cycle 3)</div>
            </div>
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">AAA Grade 'A'</div>
              <div className="text-xs text-slate-400 mt-1">BAMU Audit 263/300</div>
            </div>
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">71 Ph.D.</div>
              <div className="text-xs text-slate-400 mt-1">& 30 M.Phil. Scholars</div>
            </div>
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">1,17,397</div>
              <div className="text-xs text-slate-400 mt-1">Library Book Volumes</div>
            </div>
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">31 Labs</div>
              <div className="text-xs text-slate-400 mt-1">State-of-the-Art Labs</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400">6,000+</div>
              <div className="text-xs text-slate-400 mt-1">Students on 30 Acres</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SANSTHA & COLLEGE WITH LEADERSHIP (PAGES 3, 4, 6, 7, 8) */}
      <section id="about" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Bharat Shikshan Sanstha, Omerga (Estd. 1941)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Shri Chhatrapati Shivaji College, Omerga (Estd. 1959)
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Founded in 1941 in the pre-independence era by the revered visionary <strong>Late Tatyaraoji More (Aaba)</strong> and his colleagues under the banner of <strong>Bharat Shikshan Sanstha</strong>, this institution brought the torch of knowledge (ज्ञानज्योत) to the rural Maharashtra-Karnataka border region of Dharashiv district.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                The Senior College commenced in June 1959 with just 50 students, and has expanded over 65 years into an educational powerhouse with over 6,000 students on a 30-acre campus. Affiliated to Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar, the college offers multidisciplinary education from Junior College, Undergraduate, and Postgraduate up to Ph.D. research across Arts, Science, Commerce, and Information Technology.
              </p>

              {/* Sister Institutions under Bharat Shikshan Sanstha */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                <span className="font-bold text-slate-900 block">Sister Institutions under Bharat Shikshan Sanstha:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  15 institutions including Tatyaraoji More College of Pharmacy (D.Pharm, B.Pharm, M.Pharm), The Delhi Public School Omerga, Bharat Vidyalaya (Omerga, Makani, Bedga, Malgi), B.S.S. College Makani, and Junior Colleges across Murum and Narangwadi.
                </p>
              </div>
            </div>

            {/* Leadership Cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* President */}
              <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                  alt="Shri Amol Shivajirao More"
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">Shri Amol Shivajirao More</h4>
                  <p className="text-xs text-amber-300">President, Bharat Shikshan Sanstha</p>
                  <p className="text-[11px] text-slate-300 italic mt-1 leading-snug">
                    "Our students' bright future is the very future of this sacred institution."
                  </p>
                </div>
              </div>

              {/* Principal */}
              <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
                  alt="Dr. Sanjay Namdev Aswale"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-400 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{COLLEGE_INFO.principalName}</h4>
                  <p className="text-xs text-blue-300">Principal & Director</p>
                  <p className="text-[10px] text-slate-400">{COLLEGE_INFO.principalDesignation}</p>
                  <p className="text-[11px] text-slate-300 italic mt-1 leading-snug">
                    "Enter to learn, go out to serve. We build capable, self-reliant citizens."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC PROGRAMS & DEPARTMENTS (PAGES 11-30) */}
      <section id="academics" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              National Education Policy (NEP 2020) Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Academic Faculties & Degree Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Affiliated with Dr. Babasaheb Ambedkar Marathwada University with Multiple Entry & Exit Options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 relative bg-slate-100 overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      Code: {dept.code}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-blue-700 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                      Intake: {dept.intake} Seats
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">{dept.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {dept.description}
                    </p>

                    <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Head / Guide:</span>
                        <strong className="text-slate-800">{dept.hodName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Labs: {dept.labCount}</span>
                        <span>Faculty: {dept.facultyCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs justify-between"
                    onClick={() => setSelectedDept(dept)}
                  >
                    <span>View Curriculum Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FLAGSHIP CENTERS & SPECIAL FACILITIES (PAGES 41, 46, 47, 48, 55, 56, 58) */}
      <section id="special-units" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Centers of Excellence & Career Launchpads
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Distinctive Flagship Centers at SCSCO
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Unique regional initiatives in agricultural testing, capital markets, HVAC engineering, and competitive exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. ICICI RAC Lab */}
            <Card className="p-5 border-l-4 border-l-amber-500 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="warning" size="sm">ICICI Foundation Sponsored</Badge>
                <h3 className="text-base font-bold text-slate-900">RAC Lab & Technician Course</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Marathwada’s only simulation training laboratory for commercial Refrigeration, VRF ACs, and Inverter systems. 6-month skill course (4 months practicals + 2 months paid internship) with 100% placement and seed capital.
                </p>
                <div className="pt-2 text-[11px] text-slate-500">
                  Contact: (02475) 252020 · Inquiry Section
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={onOpenAI}>
                  Course & Eligibility Details
                </Button>
              </div>
            </Card>

            {/* 2. Soil Testing Lab */}
            <Card className="p-5 border-l-4 border-l-emerald-600 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="success" size="sm">Farmer Outreach Initiative</Badge>
                <h3 className="text-base font-bold text-slate-900">Soil Testing Center (माती परीक्षण)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Free soil and water analysis (NPK, pH, electrical conductivity) for local farmers across Omerga taluka run by Geography Department & IQAC at Botanical Garden Room No. 13.
                </p>
                <div className="pt-2 text-[11px] text-slate-500">
                  Head: Dr. D. S. Itle (Phone: 9850619733)
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Soil testing is conducted at Botanical Garden Room 13. Contact Dr. D. S. Itle at 9850619733.')}>
                  Soil Sampling Guide
                </Button>
              </div>
            </Card>

            {/* 3. Career Katta */}
            <Card className="p-5 border-l-4 border-l-rose-500 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="danger" size="sm">College Code: C34650</Badge>
                <h3 className="text-base font-bold text-slate-900">Career Katta (MITSC & Govt of Maharashtra)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ₹365 for 1,000 days of access with 50+ free credit courses. Daily online and offline coaching for UPSC, MPSC, Banking (IBPS/SBI), Police Bharti, and Defence forces.
                </p>
                <div className="pt-2 text-[11px] text-slate-500">
                  Coordinator: Dr. S. P. Pasarkalle (9975473006) · Helpline: 75076 52555
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={onOpenAI}>
                  View Career Katta Timetable
                </Button>
              </div>
            </Card>

            {/* 4. NISM Securities */}
            <Card className="p-5 border-l-4 border-l-blue-600 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="info" size="sm">National Institute of Securities Markets</Badge>
                <h3 className="text-base font-bold text-slate-900">NISM Capital Markets Collaboration</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  MoU Partner credit courses in Financial Literacy for Bharat, Mutual Funds, Broking Operations, Securities Primer, and Equity Derivatives Mastery Track.
                </p>
                <div className="pt-2 text-[11px] text-slate-500">
                  Commerce Dept Head: Dr. A. S. Ashte (9423740707)
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={onOpenAI}>
                  Course Bundles & Credits
                </Button>
              </div>
            </Card>

            {/* 5. Incubation Center SCSC-ICE */}
            <Card className="p-5 border-l-4 border-l-purple-600 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="purple" size="sm">Startup Ecosystem</Badge>
                <h3 className="text-base font-bold text-slate-900">SCSC-ICE Incubation Center</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Shri Chhatrapati Shivaji College Incubation Center for Entrepreneur established 2018-19. Incubates student startups across Chemistry, Physics, Biology, IT, and Commerce.
                </p>
                <div className="pt-2 text-[11px] text-slate-500">
                  Fosters rural innovators & patent commercialization.
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={onOpenAuth}>
                  Submit Startup Proposal
                </Button>
              </div>
            </Card>

            {/* 6. Police & Military Academy */}
            <Card className="p-5 border-l-4 border-l-slate-700 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="default" size="sm">Pre-Recruitment Training</Badge>
                <h3 className="text-base font-bold text-slate-900">Police & Defence Forces Academy</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  120 candidate capacity training center. Morning running drills, shotput, endurance coaching by ex-servicemen, and written examination mock tests.
                </p>
                <div className="pt-2 text-[11px] text-slate-500">
                  Sports Dept: Shri R. M. Suryawanshi (9423339324)
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Police & Defence Academy has 120 intake capacity. Admissions open in Enquiry Section.')}>
                  Enrolment Information
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. CENTRAL LIBRARY (PAGES 23 & 46) */}
      <section id="library" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Knowledge Resource Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                1,17,397 Volumes & 24x7 Night Study Hall
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As the adage goes, <em>"वाचाल तर वाचाल"</em> (Read to Survive and Thrive). The college central library is automated with <strong>Dr. Vijay Bhatkar's ETH Software</strong> and Online Public Access Catalogue (OPAC).
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">TOTAL VOLUMES</span>
                  <span className="font-bold text-base text-slate-900">1,17,397</span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">JOURNALS & PERIODICALS</span>
                  <span className="font-bold text-base text-slate-900">34 Journals / 12 Dailies</span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">NIGHT STUDY HALL</span>
                  <span className="font-bold text-slate-900">Open till Midnight (12 AM)</span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">CHIEF LIBRARIAN</span>
                  <span className="font-bold text-slate-900">Dr. P. B. Gaikwad (Ph.D)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80"
                  alt="SCSCO Central Library Reading Hall"
                  className="w-full h-72 object-cover"
                />
                <div className="p-4 bg-white text-xs text-slate-600">
                  Separate spacious reading chambers for boys, girls, and faculty scholars with high-speed Wi-Fi access.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADMISSION APPLICATION 2026-27 & AUTHENTIC FEES (PAGES 33-36) */}
      <section id="admissions" className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Authentic Fees Table from Brochure Page 36 */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded text-xs font-semibold">
                <span>माहिती पुस्तिका २०२६-२७ · Approved Fees</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Senior & PG College Admission Fees 2026-27
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                Official approved fees as sanctioned by Dr. Babasaheb Ambedkar Marathwada University. EBC / GOI scholarship concessions available for eligible rural students.
              </p>

              {/* Real Fees Snapshot Table */}
              <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/60 text-xs">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-800 text-slate-300 border-b border-slate-700">
                    <tr>
                      <th className="p-2">Class</th>
                      <th className="p-2">Open EBC</th>
                      <th className="p-2">SC / ST</th>
                      <th className="p-2">OBC / NT</th>
                      <th className="p-2">Paying Fees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2 font-medium">B.A. I</td>
                      <td className="p-2">₹1,619</td>
                      <td className="p-2">₹1,677</td>
                      <td className="p-2">₹615</td>
                      <td className="p-2 font-bold text-white">₹2,419</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">B.Sc. I</td>
                      <td className="p-2">₹4,619</td>
                      <td className="p-2">₹3,477</td>
                      <td className="p-2">₹615</td>
                      <td className="p-2 font-bold text-white">₹5,419</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">B.Com. I</td>
                      <td className="p-2">₹1,919</td>
                      <td className="p-2">₹1,857</td>
                      <td className="p-2">₹615</td>
                      <td className="p-2 font-bold text-white">₹2,719</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">BCS I / B.Sc. IT I</td>
                      <td className="p-2">-</td>
                      <td className="p-2">₹20,326</td>
                      <td className="p-2">-</td>
                      <td className="p-2 font-bold text-white">₹33,518</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">M.Sc. I (Chem/Phy)</td>
                      <td className="p-2">-</td>
                      <td className="p-2">₹12,838</td>
                      <td className="p-2">₹665</td>
                      <td className="p-2 font-bold text-white">₹21,038</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">M.A. I (All Subjects)</td>
                      <td className="p-2">-</td>
                      <td className="p-2">₹3,400</td>
                      <td className="p-2">₹665</td>
                      <td className="p-2 font-bold text-white">₹5,308</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-slate-400">
                * Academic Bank of Credits (ABC Account at www.abc.gov.in) is mandatory for all first-year admissions.
              </div>
            </div>

            {/* Right Column: Interactive Admission Form */}
            <div className="lg:col-span-6">
              <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-2xl border border-slate-200">
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  Online Admission Application Form (2026-27)
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Shri Chhatrapati Shivaji College, Omerga · Registration Desk
                </p>

                {admSubmittedAppNo ? (
                  <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="text-base font-bold text-emerald-900">Application Submitted Successfully!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Your provisional application has been securely recorded in the college ERP system.
                    </p>
                    <div className="p-3 bg-white rounded border border-emerald-300 font-mono text-sm font-bold text-emerald-800">
                      Application No: {admSubmittedAppNo}
                    </div>
                    <p className="text-[11px] text-emerald-600">
                      Please carry original marks memos, Transfer Certificate (TC), and caste documents to the college enquiry desk.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdmSubmittedAppNo(null)}
                      className="mt-2"
                    >
                      Fill Another Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleAdmissionSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={admFullName}
                        onChange={(e) => setAdmFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma / Ananya More"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={admEmail}
                          onChange={(e) => setAdmEmail(e.target.value)}
                          placeholder="student@gmail.com"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={admPhone}
                          onChange={(e) => setAdmPhone(e.target.value)}
                          placeholder="+91 94220 XXXXX"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Course Applied For *
                        </label>
                        <select
                          value={admCourse}
                          onChange={(e) => setAdmCourse(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        >
                          <option>B.Sc. in Computer Science (BCS)</option>
                          <option>B.Sc. in Information Technology (B.Sc. IT)</option>
                          <option>B.Sc. Regular (Chemistry, Physics, Maths, Bio)</option>
                          <option>B.Com. (Accounting & Finance)</option>
                          <option>B.A. (Arts Faculty - NEP 2020)</option>
                          <option>M.Sc. in Chemistry</option>
                          <option>M.Sc. in Physics</option>
                          <option>M.Com. (Postgraduate)</option>
                          <option>M.A. (Marathi, Hindi, English, History, etc.)</option>
                          <option>RAC Lab 6-Month Course (ICICI)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          12th / Qualifying Score (%) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={admScore}
                          onChange={(e) => setAdmScore(e.target.value)}
                          placeholder="e.g. 84.50"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Previous Junior College / School
                        </label>
                        <input
                          type="text"
                          value={admSchool}
                          onChange={(e) => setAdmSchool(e.target.value)}
                          placeholder="e.g. Bharat Vidyalaya Omerga"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={admCategory}
                          onChange={(e) => setAdmCategory(e.target.value as any)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="General">Open / General</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="EWS">EWS</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="secondary"
                        size="md"
                        className="w-full py-2.5 font-bold"
                      >
                        Submit Application & Generate Token
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. NOTICES & CIRCULARS */}
      <section id="notices" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Official College Announcements
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Notices & Administrative Circulars
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-md text-xs font-medium">
                {['All', 'Examination', 'Academic', 'General'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNoticeCategory(cat)}
                    className={`px-3 py-1 rounded transition-colors ${
                      noticeCategory === cat
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search circulars..."
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 hover:shadow-xs transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-blue-700">{notice.category}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{notice.publishedDate}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{notice.department}</span>
                  </div>
                  {notice.isUrgent && (
                    <Badge variant="danger" size="sm" dot>
                      URGENT
                    </Badge>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{notice.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {notice.content}
                </p>

                {notice.attachmentName && (
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{notice.attachmentName}</span>
                    </span>
                    <button
                      onClick={() => alert(`Downloading: ${notice.attachmentName}`)}
                      className="text-blue-600 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. EVENTS & MEMORIAL COMPETITIONS (PAGE 43) */}
      <section id="events" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Symposiums & Annual Memorial Series
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Upcoming College & State-Level Events
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 relative bg-slate-100">
                    <img src={ev.bannerUrl} alt={ev.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-blue-700 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded">
                      {ev.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{ev.eventDate}</span>
                      <span className="text-slate-300">·</span>
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{ev.time}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{ev.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {ev.description}
                    </p>

                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{ev.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {ev.registeredCount} / {ev.capacity} Registered
                    </span>
                    <Button
                      variant={ev.isRegistered ? 'success' : 'secondary'}
                      size="sm"
                      onClick={() => registerForEvent(ev.id)}
                    >
                      {ev.isRegistered ? 'Registered ✓' : 'Register Now'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CAMPUS PHOTO GALLERY (PAGE 63) */}
      <section id="gallery" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Glimpses of Infrastructure
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Life & Laboratories at SCSCO Omerga
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-lg text-xs font-medium">
              {['All', 'Campus', 'Labs', 'Sports'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategory(cat)}
                  className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                    galleryCategory === cat
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all group"
              >
                <div className="h-52 overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {item.category}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CONTACT & LOCATION */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Visit Campus
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Administrative Enquiry & Office Desk
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Shri Chhatrapati Shivaji College is located on the main road of Omerga taluka in Dharashiv district, Maharashtra. Administrative offices are open Monday to Saturday from 8:00 AM to 5:30 PM.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Campus Address:</strong>
                    <div className="text-slate-500 mt-0.5">{COLLEGE_INFO.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <strong>Office Phone:</strong> {COLLEGE_INFO.phone} | <strong>Principal:</strong> {COLLEGE_INFO.principalPhone} (Dr. S. N. Aswale)
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <strong>Career Katta Helpline:</strong> {COLLEGE_INFO.helpline}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 mb-1">Send Admission / Academic Inquiry</h4>
                <p className="text-xs text-slate-500 mb-4">Direct message to Registrar & Enquiry Section.</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you! Your message has been routed to the Registrar office, Shri Chhatrapati Shivaji College, Omerga.');
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Subject (e.g. BCS Admission, Soil Testing, RAC Lab)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Your Query..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <Button type="submit" variant="primary" size="sm" className="w-full">
                    Dispatch Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Detail Modal */}
      {selectedDept && (
        <Modal
          isOpen={!!selectedDept}
          onClose={() => setSelectedDept(null)}
          title={selectedDept.name}
          subtitle={`Department Code: ${selectedDept.code} · Established ${selectedDept.establishedYear}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">{selectedDept.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px]">Annual Intake</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDept.intake} Seats</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px]">Specialized Labs</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDept.labCount} Labs</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px]">Faculty Scholars</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDept.facultyCount} Professors</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px]">Head of Department</span>
                <span className="font-bold text-slate-900 text-xs truncate mt-0.5 block">{selectedDept.hodName}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedDept(null)}>
                Close
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedDept(null);
                  window.location.hash = '#admissions';
                }}
              >
                Apply for {selectedDept.code}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
