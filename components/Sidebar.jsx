// components/Sidebar.js
import React from "react";
import { User, Layers, Briefcase, BookOpen, Star, Award, ChevronRight, FileText, Zap, Globe, LogOut } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, userData, handleLogout }) {
  const items = [
    { id: "profile", label: "Profile", Icon: User, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "skills", label: "Skills", Icon: Star, color: "text-yellow-500", bg: "bg-yellow-50" },
    { id: "experience", label: "Experience", Icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" },
    { id: "education", label: "Education", Icon: BookOpen, color: "text-green-500", bg: "bg-green-50" },
    { id: "projects", label: "Projects", Icon: Layers, color: "text-pink-500", bg: "bg-pink-50" },
    { id: "social", label: "Social Media", Icon: Globe, color: "text-cyan-500", bg: "bg-cyan-50" },
    { id: "certifications", label: "Certifications", Icon: Award, color: "text-indigo-500", bg: "bg-indigo-50" },
    { id: "userresume", label: "User Resume", Icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
    { id: "generate", label: "Generate Resume", Icon: FileText, color: "text-gray-900", bg: "bg-gray-200" },
  ];

  return (
    <aside className="lg:w-64 w-full flex-shrink-0 bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-4 flex flex-col gap-4 sticky top-20 h-fit transition-all hover:bg-slate-900/90">

      {/* Profile Summary Header (Mini) */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-lg ring-1 ring-white/10">
          {userData?.profile?.name ? userData.profile.name[0] : "U"}
        </div>
        <div>
          <h3 className="font-bold text-white tracking-tight text-sm">{userData?.profile?.name || "User Name"}</h3>
          <p className="text-[10px] text-slate-400 font-medium bg-slate-800 px-2 py-0.5 rounded-full inline-block mt-0.5">Resume Builder</p>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-grow">
        {items.map(({ id, label, Icon, color, bg }) => {
          const isActive = activeTab === id;
          const count = userData && Array.isArray(userData[id]) ? userData[id].length : (userData?.profile && id === 'profile' ? 1 : 0);

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`group relative flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-300 ease-out border cursor-pointer
                ${isActive
                  ? "bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/10 scale-100 ring-1 ring-blue-500/20"
                  : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 hover:shadow-sm text-slate-400"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? "bg-blue-600/20" : "bg-slate-800/50 group-hover:bg-slate-800"}`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                </div>
                <span className={`font-semibold text-xs tracking-tight ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                  {label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {count > 0 && (
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${isActive ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"}`}>
                    {count}
                  </span>
                )}
                {isActive && <ChevronRight className="w-4 h-4 text-blue-500" />}
              </div>

              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-300 ease-out border border-transparent hover:bg-red-500/10 hover:border-red-500/20 text-slate-400 hover:text-red-400 cursor-pointer"
      >
        <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-red-500/20 transition-colors duration-300">
          <LogOut className="w-4 h-4 text-slate-500 group-hover:text-red-400" />
        </div>
        <span className="font-semibold text-xs tracking-tight">Logout</span>
      </button>
    </aside>
  );
}
