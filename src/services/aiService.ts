import { GoogleGenAI } from '@google/genai';
import { COLLEGE_INFO } from '../data/mockDatabase';

// Grounded Knowledge Base based on official Information Brochure 2026-27 (माहिती पुस्तिका २०२६-२७)
const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['admission', 'apply', 'eligibility', 'process', 'entrance', 'form', 'requirement', 'cutoff'],
    answer: `Admissions 2026-27 at Shri Chhatrapati Shivaji College, Omerga (SCSCO):
    
• Junior College (11th & 12th): Science (General, IT, GCE, NEET/JEE/CET Batch), Commerce, Arts, and MCVC Vocations. (Min 40% in SSC for Science).
• Under-Graduate (UG):
  - B.Sc. Computer Science (BCS) & B.Sc. IT: 12th Science pass with Mathematics/Computer Techniques or 3-year Engineering Diploma / MCVC. Intake: 60 each.
  - B.A. (English, Marathi, Hindi, History, Geography, Politics, Sociology, Economics): 12th pass. Intake: 360 Aided + 240 Unaided.
  - B.Com. (Accounting, Finance, Entrepreneurship): 12th Commerce/Arts/Science pass. Intake: 120.
  - B.Sc. Regular (Physics, Chemistry, Maths, Botany, Zoology, Industrial Chemistry): 12th Science pass. Intake: 290.
• Post-Graduate (PG): M.Sc. (Chemistry, Physics), M.A. (7 subjects), M.Com. via PG-CET / merit as per BAMU norms.
• Required Documents: Transfer Certificate (TC), 10th & 12th Marks Memo, Passport Photos, Caste Certificate (for backward classes), Income Certificate & EBC form, Aadhar Card, and Academic Bank of Credits (ABC) ID (abc.gov.in).`,
  },
  {
    keywords: ['fee', 'fees', 'cost', 'tuition', 'concession', 'ebc', 'sc', 'st', 'obc'],
    answer: `Official Senior & PG College Admission Fees (2026-27 Academic Year - Approved by BAMU):
    
• B.Sc. in Computer Science (BCS) & B.Sc. IT: ₹33,518 (Paying) | ₹20,326 (SC/ST).
• B.Sc. Regular (Chemistry, Physics, Maths, Bio): ₹5,419 (Paying) | ₹4,619 (Open EBC) | ₹3,477 (SC/ST) | ₹615 (OBC/NT/SEBC).
• B.Com. I: ₹2,719 (Paying) | ₹1,919 (Open EBC) | ₹1,857 (SC/ST) | ₹615 (OBC/NT).
• B.A. I: ₹2,419 (Paying) | ₹1,619 (Open EBC) | ₹1,677 (SC/ST) | ₹615 (OBC/NT).
• M.Sc. I (Chemistry & Physics): ₹21,038 (Paying) | ₹12,838 (SC/ST) | ₹665 (OBC/NT).
• M.A. I (All Subjects): ₹5,308 (Paying) | ₹3,400 (SC/ST) | ₹665 (OBC/NT).
• M.Com. I: ₹5,671 (Paying) | ₹3,664 (SC/ST) | ₹665 (OBC/NT).
• Junior College (XI Science): ₹1,277 (Paying) | ₹1,085 (Open EBC) | ₹1,035 (OBC/NT).
• Scholarships available: MahaDBT Post-Matric, GOI Freeship, State Government Merit Scholarship, National Rural Scholarship, Eklavya Scholarship, and Minority Scholarship.`,
  },
  {
    keywords: ['rac', 'refrigeration', 'ac', 'icici', 'technician', 'air conditioning', 'skill'],
    answer: `ICICI Foundation Sponsored RAC Laboratory & Technician Course:
    
• Marathwada’s only state-of-the-art simulation RAC practical training laboratory at SCSCO Omerga.
• Eligibility: 10th/12th pass or fail, graduates, and unemployed youth.
• Duration: 6 Months (4 Months classroom & hands-on practicals on VRF ACs, Inverter split ACs, deep freezers + 2 Months paid corporate internship).
• Guarantee: 100% placement and seed capital support for self-employment service centers.
• Contact: RAC Inquiry Desk, Shri Chhatrapati Shivaji College, Omerga (Phone: 02475-252020).`,
  },
  {
    keywords: ['soil', 'mati', 'parikshan', 'farmer', 'geography', 'agriculture'],
    answer: `Soil Testing Center (माती परीक्षण केंद्र) - Geography Department:
    
• Location: Botanical Garden Room No. 13, Shri Chhatrapati Shivaji College, Omerga.
• Purpose: Free soil testing and agricultural counseling for farmers of Omerga taluka sponsored by IQAC & Water Literacy Programme.
• Parameters: NPK (Nitrogen, Phosphorus, Potash), pH, electrical conductivity, and organic carbon analysis.
• Coordinator: Dr. D. S. Itle (Head, Geography Department, Phone: 9850619733).`,
  },
  {
    keywords: ['career katta', 'mpsc', 'upsc', 'police', 'ias', 'mitsc', 'competitive'],
    answer: `Career Katta (College Code: C34650):
    
• Initiative of Dept. of Higher & Technical Education, Govt. of Maharashtra & Maharashtra Information Technology Support Centre (MITSC).
• Special Feature: ₹365 for 1,000 days of access with 50+ free add-on credit courses.
• Programs: Daily preparation for UPSC, MPSC, Banking (IBPS/SBI), Police Bharti, Defense (SSB/Army), Staff Selection (SSC), and LIC.
• College Leads: Principal Promoter Dr. Sanjay Aswale | Coordinator Dr. S. P. Pasarkalle (9975473006) | Co-coordinator Dr. C. D. Kare (7276863713) | Helpline: 75076 52555.`,
  },
  {
    keywords: ['nism', 'securities', 'stock', 'mutual fund', 'finance', 'market', 'equity'],
    answer: `NISM Collaboration (National Institute of Securities Markets - MoU Partner):
    
• Industry-certified credit courses in:
  1. Financial Literacy Course for Bharat (FLCB)
  2. Mutual Funds & Broking Operations (SDM)
  3. Securities Market Primer (SMP)
  4. Equity Derivatives Mastery Track
• Credits: 2 Academic Credits per track for NEP curriculum.
• Head Coordinator: Dr. A. S. Ashte (Head, Department of Commerce & Management).`,
  },
  {
    keywords: ['library', 'books', 'granthalaya', 'reading room', 'bhatkar', 'eth'],
    answer: `Central Knowledge Resource Center & Library:
    
• Collection: 1,17,397 Printed Volumes & 34 Scientific Journals.
• Management Software: Dr. Vijay Bhatkar's ETH Software with Online Public Access Catalogue (OPAC).
• Facilities: Internet Access Hub, separate Boys & Girls Reading Rooms, and Special Night Study Room (रात्र अभ्यासिका - Open till Midnight 12:00 AM during exams).
• Librarian: Dr. P. B. Gaikwad (MLISc., M.Phil, PGDLAN, Ph.D.).`,
  },
  {
    keywords: ['crfc', 'research', 'phd', 'laboratory', 'facilities', 'physics', 'chemistry'],
    answer: `Research & Laboratories Infrastructure:
    
• Common Research Facility Center (CRFC): Inaugurated by former CM Ashok Chavan, equipped with X-ray Diffractometer (XRD), FTIR, and thin-film resistivity units.
• Ph.D. Research Centers: Recognized in Chemistry, Physics, Commerce, Botany, and Geography.
• Research Achievements: 71 Ph.D. degrees awarded, 30 M.Phil degrees, and 550+ research publications in national/international journals.
• 31 Well-Equipped Laboratories across Chemistry, Physics, Botany, Zoology, Computer Science, and Language Lab.`,
  },
  {
    keywords: ['principal', 'contact', 'address', 'president', 'sanstha', 'trust', 'phone'],
    answer: `Official Institutional Details:
    
• Institution: Bharat Shikshan Sanstha's Shri Chhatrapati Shivaji College, Omerga
• Trust Founded: 1941 by Late Tatyaraoji More (Aaba) | College Estd: June 1959
• Address: Tq. Omerga, Dist. Dharashiv - 413606, Maharashtra
• President: Shri Amol Shivajirao More
• Principal: Dr. Sanjay Namdev Aswale (Phone: 9422070783 / 02475-252020)
• Registrar: Shri R. B. Sonwane (Phone: 9422655771)
• Email: info@scsco.org.in | Website: www.scsco.org.in
• Affiliation: Dr. Babasaheb Ambedkar Marathwada University (BAMU), Chhatrapati Sambhajinagar
• NAAC Accreditation: 'A' Grade (CGPA 3.14) · BAMU AAA Audit: 'A' Grade (263/300)`,
  },
];

export async function askCampusAssistant(query: string): Promise<string> {
  const normalized = query.toLowerCase();

  // Try knowledge base matching first for instant responsive answers
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((k) => normalized.includes(k))) {
      return item.answer;
    }
  }

  // Check if GEMINI_API_KEY is available in environment
  const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are the official Campus Information AI Assistant for Bharat Shikshan Sanstha's Shri Chhatrapati Shivaji College, Omerga (Tq. Omerga, Dist. Dharashiv - 413606).
        Principal: Dr. Sanjay Namdev Aswale. Affiliated to Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar. NAAC 'A' Grade (CGPA 3.14).
        Answer the following student or parent query factually, concisely, and professionally in English based on the official 2026-27 brochure:
        Query: "${query}"`,
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to knowledge base', err);
    }
  }

  // Default fallback response
  return `Thank you for reaching out to the Shri Chhatrapati Shivaji College, Omerga Helpdesk regarding "${query}". 

For admissions, academic queries, or document verifications:
• Principal: Dr. Sanjay Namdev Aswale (9422070783)
• Central Office & Enquiry: (02475) 252020 | Registrar: 9422655771
• Career Katta Desk (Code: C34650): 75076 52555
• Official Website: www.scsco.org.in | Email: info@scsco.org.in
Campus is open Monday through Saturday (8:00 AM to 5:30 PM).`;
}
