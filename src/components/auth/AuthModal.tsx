import React, { useState } from 'react';
import {
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { Role } from '../../types';
import { Button } from '../common/Button';
import { CollegeLogo } from '../common/CollegeLogo';
import { COLLEGE_INFO, INITIAL_USERS } from '../../data/mockDatabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: Role;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, switchRole } = useCollege();
  const [email, setEmail] = useState('rahul.sharma@scsco.org.in');
  const [password, setPassword] = useState('scsco@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const success = login(email);
      setLoading(false);
      if (success) {
        onClose();
      } else {
        setError('Invalid credentials or unregistered account. Please check email address.');
      }
    }, 400);
  };

  const handleDirectLaunch = (userRole: Role) => {
    switchRole(userRole);
    onClose();
  };

  const roleProfiles: { role: Role; label: string; desc: string; email: string }[] = [
    { role: 'STUDENT', label: 'Student', desc: 'Rahul Sharma (BCS Sem 3)', email: 'rahul.sharma@scsco.org.in' },
    { role: 'FACULTY', label: 'Faculty', desc: 'Dr. V. S. Suryawanshi (Chemistry)', email: 'faculty.suryawanshi@scsco.org.in' },
    { role: 'HOD', label: 'HOD / VP', desc: 'Dr. V. D. Devarkar (VP Science)', email: 'vp.devarkar@scsco.org.in' },
    { role: 'PRINCIPAL', label: 'Principal', desc: 'Dr. Sanjay N. Aswale', email: 'principal.aswale@scsco.org.in' },
    { role: 'SUPER_ADMIN', label: 'President / Admin', desc: 'Shri Amol S. More (President)', email: 'president.more@scsco.org.in' },
    { role: 'MODULE_OFFICER', label: 'Registrar', desc: 'Shri R. B. Sonwane (Registrar)', email: 'registrar.sonwane@scsco.org.in' },
    { role: 'PARENT', label: 'Parent', desc: 'Suresh Sharma', email: 'parent.sharma@gmail.com' },
    { role: 'ALUMNI', label: 'Alumni', desc: 'Amit Jadhav (Sr. SDE)', email: 'alumni.amit@scsco.org.in' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <CollegeLogo size="sm" variant="icon" />
            <div>
              <h2 className="text-sm sm:text-base font-bold tracking-tight">SCSCO Omerga Portal Gateway</h2>
              <p className="text-[11px] text-slate-300">
                Dr. Babasaheb Ambedkar Marathwada University Affiliated ERP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {showForgot ? (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-900">Reset Portal Password</h3>
              <p className="text-xs text-slate-500">
                Enter your registered institute email or enrollment number.
              </p>

              {forgotSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Password reset instructions have been forwarded to {forgotEmail}.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Institute Email / PRN ID
                    </label>
                    <input
                      type="text"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. rahul.sharma@scsco.org.in"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setForgotSuccess(true)}
                      disabled={!forgotEmail.trim()}
                    >
                      Send Instructions
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowForgot(false);
                        setForgotSuccess(false);
                      }}
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Quick 1-Click Role Access Bar */}
              <div className="mb-5 bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Instant Demo Portal Switcher (1-Click Launch)
                  </span>
                  <span className="text-[10px] text-slate-500">Select any role to test</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roleProfiles.map((p) => (
                    <button
                      key={p.role}
                      type="button"
                      onClick={() => handleDirectLaunch(p.role)}
                      className={`text-left p-2 rounded-md border text-xs transition-all ${
                        email === p.email
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-2xs font-semibold'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold text-[11px] text-slate-900 leading-tight">
                        {p.label}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Registered Email or PRN / Employee ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@scsco.org.in"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Remember session</span>
                  </label>
                  <span className="text-[11px] text-slate-400">ETH Automation Secured</span>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    loading={loading}
                    className="w-full py-2.5 font-semibold text-xs tracking-wide"
                  >
                    Authenticate & Access Portal
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>College Code: C34650 · BAMU Affiliation</span>
          <span>Enquiry Desk: (02475) 252020</span>
        </div>
      </div>
    </div>
  );
};
