import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { PortalHeader } from '../layout/PortalHeader';
import { PortalSidebar } from '../layout/PortalSidebar';
import { RoleSwitcherModal } from '../common/RoleSwitcherModal';
import { AICollegeAssistantModal } from '../common/AICollegeAssistantModal';
import { StudentPortal } from './StudentPortal';
import { ParentPortal } from './ParentPortal';
import { FacultyPortal } from './FacultyPortal';
import { HodPortal } from './HodPortal';
import { PrincipalPortal } from './PrincipalPortal';
import { AdminPortal } from './AdminPortal';

export const PortalLayout: React.FC = () => {
  const { currentRole } = useCollege();
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const renderActivePortal = () => {
    switch (currentRole) {
      case 'STUDENT':
        return <StudentPortal />;
      case 'PARENT':
        return <ParentPortal />;
      case 'FACULTY':
        return <FacultyPortal />;
      case 'HOD':
        return <HodPortal />;
      case 'PRINCIPAL':
        return <PrincipalPortal />;
      case 'SUPER_ADMIN':
      case 'MODULE_OFFICER':
      case 'ALUMNI':
      default:
        return <AdminPortal />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <PortalHeader
        onOpenAI={() => setShowAIModal(true)}
        onOpenRoleSwitcher={() => setShowRoleSwitcher(true)}
      />

      <div className="flex-1 flex">
        <PortalSidebar
          isOpen={sidebarOpenMobile}
          onCloseMobile={() => setSidebarOpenMobile(false)}
        />

        <main className="flex-1 min-w-0 overflow-y-auto">
          {renderActivePortal()}
        </main>
      </div>

      <RoleSwitcherModal
        isOpen={showRoleSwitcher}
        onClose={() => setShowRoleSwitcher(false)}
      />

      <AICollegeAssistantModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
      />
    </div>
  );
};
