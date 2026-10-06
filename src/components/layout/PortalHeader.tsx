import React, { useState } from 'react';
import {
  Bell,
  LogOut,
  Globe,
  RefreshCw,
  ShieldCheck,
  ChevronDown,
  X,
  Bot,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { CollegeLogo } from '../common/CollegeLogo';
import { Badge } from '../common/Badge';

export const PortalHeader: React.FC<{
  onOpenAI: () => void;
  onOpenRoleSwitcher: () => void;
}> = ({ onOpenAI, onOpenRoleSwitcher }) => {
  const {
    currentUser,
    currentRole,
    setActiveView,
    logout,
    notifications,
    markNotificationRead,
    clearNotifications,
    resetDatabase,
    setActivePortalTab,
  } = useCollege();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
      <div className="px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
        {/* Left: Brand & Role Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('public')}
            className="flex items-center gap-2 group text-left cursor-pointer"
            title="View Public College Website"
          >
            <CollegeLogo size="sm" variant="icon" />
            <div className="hidden sm:block">
              <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700 block leading-tight">
                SCSCO Omerga
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight">
                Campus ERP Portal
              </span>
            </div>
          </button>

          <span className="text-slate-300 hidden md:inline">|</span>

          {/* Quick Active Role Badge Button */}
          <button
            onClick={onOpenRoleSwitcher}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
            title="Click to Switch Role Instantly"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Role: {currentRole}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Right: Actions, AI, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              resetDatabase();
              alert('College platform data refreshed to official 2026-27 brochure state.');
            }}
            className="hidden md:flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
            title="Reset All Records to Authentic Brochure Seed State"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>

          {/* Public Website Button */}
          <button
            onClick={() => setActiveView('public')}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-blue-700 px-2.5 py-1 rounded hover:bg-slate-100 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Public Site</span>
          </button>

          {/* AI Desk */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Brochure AI</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Notifications ({unreadCount} Unread)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearNotifications}
                      className="text-[11px] text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkTab) setActivePortalTab(n.linkTab);
                        setShowNotifications(false);
                      }}
                      className={`p-3 cursor-pointer hover:bg-slate-50 transition-colors flex items-start gap-2.5 ${
                        !n.isRead ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          !n.isRead ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800 leading-tight">{n.title}</div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                        <span className="text-[10px] text-slate-400 block mt-1">{n.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Capsule */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={currentUser?.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-300"
              />
              <div className="hidden lg:block text-left text-xs">
                <span className="font-semibold text-slate-800 block leading-tight">
                  {currentUser?.name || 'User'}
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  {currentRole}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-bold text-slate-800">{currentUser?.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{currentUser?.email}</div>
                  <div className="mt-1">
                    <Badge variant="purple" size="sm">
                      {currentRole}
                    </Badge>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onOpenRoleSwitcher();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Switch Role / Portal</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView('public');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span>Public College Website</span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
