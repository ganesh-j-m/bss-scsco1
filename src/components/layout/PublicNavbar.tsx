import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  LogIn,
  Bot,
  GraduationCap,
  Sparkles,
  Download,
  BookOpen,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { Button } from '../common/Button';
import { CollegeLogo } from '../common/CollegeLogo';
import { COLLEGE_INFO } from '../../data/mockDatabase';

interface PublicNavbarProps {
  onOpenAuth: () => void;
  onOpenAI: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  onOpenAuth,
  onOpenAI,
  onNavigateSection,
  activeSection,
}) => {
  const { currentUser, setActiveView } = useCollege();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Sanstha & College' },
    { id: 'academics', label: 'Programs (Junior / UG / PG)' },
    { id: 'special-units', label: 'Flagship Centers' },
    { id: 'admissions', label: 'Admissions & Fees 2026' },
    { id: 'research', label: 'Research & Labs' },
    { id: 'library', label: 'Library' },
    { id: 'notices', label: 'Notices' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Campus Tour' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-amber-400">
              NAAC 'A' Grade (CGPA 3.14) · BAMU AAA Audit Grade 'A' (263/300)
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">
              Affiliated to Dr. Babasaheb Ambedkar Marathwada University
            </span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-slate-300">College Code: C34650</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <a href="tel:02475252020" className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3 h-3 text-amber-400" />
                <span>Office: (02475) 252020</span>
              </a>
              <span className="text-slate-700">|</span>
              <a href="tel:7507652555" className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3 h-3 text-sky-400" />
                <span>Career Katta: 75076 52555</span>
              </a>
            </div>

            <button
              onClick={onOpenAI}
              className="flex items-center gap-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white px-2.5 py-0.5 rounded text-[11px] transition-all cursor-pointer border border-blue-500/30"
            >
              <Bot className="w-3 h-3 text-sky-300" />
              <span>Campus AI Advisor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="cursor-pointer group select-none"
        >
          <CollegeLogo size="md" variant="full" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-slate-700">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-800 font-semibold'
                  : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActiveView('portal')}
              icon={<GraduationCap className="w-4 h-4" />}
            >
              ERP Portal ({currentUser.role})
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenAuth}
              icon={<LogIn className="w-3.5 h-3.5" />}
            >
              Staff & Student Login
            </Button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top duration-150">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 text-xs rounded-md font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAI}
              className="w-full justify-start"
              icon={<Bot className="w-4 h-4 text-blue-600" />}
            >
              Ask Campus AI Assistant (Information Brochure 2026-27)
            </Button>
            {currentUser ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setActiveView('portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Access Portal ({currentUser.name})
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Sign In to College ERP
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
