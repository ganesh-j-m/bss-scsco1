import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Award,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { CollegeLogo } from '../common/CollegeLogo';
import { COLLEGE_INFO } from '../../data/mockDatabase';

export const PublicFooter: React.FC<{
  onNavigateSection: (sectionId: string) => void;
  onOpenAuth: () => void;
}> = ({ onNavigateSection, onOpenAuth }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      {/* Upper Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Institute Overview & Sanstha */}
        <div className="space-y-3">
          <CollegeLogo size="sm" variant="full" showSubtitle={false} className="text-white" />
          <p className="text-slate-400 leading-relaxed text-[11px] mt-2">
            Run by <strong>Bharat Shikshan Sanstha, Omerga</strong> (Estd. 1941 by Late Tatyaraoji More - Aaba). Established in June 1959, now serving over 6,000 students on a 30-acre lush green campus with 31 well-equipped laboratories.
          </p>
          <div className="pt-1 flex flex-col gap-1 text-[11px] text-amber-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>NAAC Re-accreditation 'A' Grade (CGPA 3.14)</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400">
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>BAMU AAA Audit Grade 'A' (263/300 Marks)</span>
            </div>
          </div>
        </div>

        {/* Col 2: Academic Programs (NEP 2020) */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Academic Programs</h4>
          <ul className="space-y-1.5 text-slate-400 text-[11px]">
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                Junior College (Science, Arts, Commerce & MCVC)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                B.Sc. in Computer Science (BCS) & B.Sc. IT
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                B.Sc. Regular (Chemistry, Physics, Maths, Botany, Zoology)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                B.Com. (Accounting, Finance & Corporate Reporting)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                B.A. (English, Marathi, Hindi, History, Politics, Geog)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                Postgraduate (M.Sc. Chemistry & Physics, M.A., M.Com.)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('research')} className="hover:text-white transition-colors">
                Recognized Ph.D. Research Centers (71 Ph.Ds Awarded)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Flagship Units & Welfare */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Flagship Centers</h4>
          <ul className="space-y-1.5 text-slate-400 text-[11px]">
            <li>
              <button onClick={() => onNavigateSection('special-units')} className="hover:text-white transition-colors">
                ICICI Foundation RAC & AC Technician Lab
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('special-units')} className="hover:text-white transition-colors">
                Geography Dept Soil Testing Lab (माती परीक्षण केंद्र)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('special-units')} className="hover:text-white transition-colors">
                Career Katta (Code: C34650 - IAS/MPSC Guidance)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('special-units')} className="hover:text-white transition-colors">
                NISM Financial Literacy & Securities Markets
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('special-units')} className="hover:text-white transition-colors">
                SCSC-ICE Entrepreneurship Incubation Center
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('library')} className="hover:text-white transition-colors">
                Central Library (1.17 Lakh Books & Night Study Room)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('special-units')} className="hover:text-white transition-colors">
                Police & Army Pre-recruitment Academy (120 Intake)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Leadership */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Campus Contact</h4>
          <div className="space-y-2 text-slate-400 text-[11px]">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{COLLEGE_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Office: {COLLEGE_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Principal: 9422070783 (Dr. S. N. Aswale)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>info@scsco.org.in</span>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenAuth}
                className="w-full text-center bg-slate-800 hover:bg-slate-700 text-white py-1.5 px-3 rounded text-[11px] font-medium transition-colors border border-slate-700 cursor-pointer"
              >
                Access Staff / Student ERP Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Accreditation Bar */}
      <div className="bg-slate-950 py-4 px-4 border-t border-slate-800/80 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Bharat Shikshan Sanstha's Shri Chhatrapati Shivaji College, Omerga. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Affiliated to BAMU, Chhatrapati Sambhajinagar</span>
            <span>·</span>
            <span>माहिती पुस्तिका २०२६-२७</span>
            <span>·</span>
            <span>Enter to Learn, Go to Serve</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
