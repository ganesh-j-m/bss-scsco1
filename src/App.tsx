import React, { useState } from 'react';
import { CollegeProvider, useCollege } from './context/CollegeContext';
import { PublicNavbar } from './components/layout/PublicNavbar';
import { PublicFooter } from './components/layout/PublicFooter';
import { PublicWebsite } from './components/public/PublicWebsite';
import { PortalLayout } from './components/portals/PortalLayout';
import { AuthModal } from './components/auth/AuthModal';
import { AICollegeAssistantModal } from './components/common/AICollegeAssistantModal';
import { Bot, ShieldCheck, ArrowRight, GraduationCap } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeView, setActiveView, currentRole } = useCollege();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (activeView !== 'public') {
      setActiveView('public');
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {activeView === 'public' ? (
        <>
          <PublicNavbar
            onOpenAuth={() => setShowAuthModal(true)}
            onOpenAI={() => setShowAIModal(true)}
            onNavigateSection={handleNavigateSection}
            activeSection={activeSection}
          />

          <main className="flex-1">
            <PublicWebsite
              onOpenAuth={() => setShowAuthModal(true)}
              onOpenAI={() => setShowAIModal(true)}
            />
          </main>

          <PublicFooter
            onNavigateSection={handleNavigateSection}
            onOpenAuth={() => setShowAuthModal(true)}
          />

          {/* Floating Action Badge for reviewers & testers */}
          <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
            <button
              onClick={() => setShowAIModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg border border-slate-700 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              title="Open Campus AI Assistant"
            >
              <Bot className="w-5 h-5 text-blue-400" />
            </button>
            <button
              onClick={() => setActiveView('portal')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold cursor-pointer transition-transform hover:scale-105"
              title="Access Internal Campus Portals"
            >
              <GraduationCap className="w-4 h-4" />
              <span>ERP Portal ({currentRole})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      ) : (
        <PortalLayout />
      )}

      {/* Global Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <AICollegeAssistantModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CollegeProvider>
      <MainAppContent />
    </CollegeProvider>
  );
}
