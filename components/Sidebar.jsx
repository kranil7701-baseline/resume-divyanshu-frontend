// components/Sidebar.js
import React from "react";
import { User, Layers, Briefcase, BookOpen, Star, Award, ChevronRight, FileText, Zap } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, userData }) {
  const items = [
    { id: "profile", label: "Profile", Icon: User, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "skills", label: "Skills", Icon: Star, color: "text-yellow-500", bg: "bg-yellow-50" },
    { id: "experience", label: "Experience", Icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" },
    { id: "education", label: "Education", Icon: BookOpen, color: "text-green-500", bg: "bg-green-50" },
    { id: "projects", label: "Projects", Icon: Layers, color: "text-pink-500", bg: "bg-pink-50" },
    { id: "certifications", label: "Certifications", Icon: Award, color: "text-indigo-500", bg: "bg-indigo-50" },
    { id: "userresume", label: "User Resume", Icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
    { id: "generate", label: "Generate Resume", Icon: FileText, color: "text-gray-900", bg: "bg-gray-200" },
  ];

  return (
    <aside className="lg:w-80 w-full flex-shrink-0 bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-6 flex flex-col gap-6 sticky top-24 h-fit">

      {/* Profile Summary Header (Mini) */}
      <div className="flex items-center gap-4 px-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {userData?.profile?.name ? userData.profile.name[0] : "U"}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{userData?.profile?.name || "User Name"}</h3>
          <p className="text-xs text-gray-500 font-medium">Resume Builder</p>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {items.map(({ id, label, Icon, color, bg }) => {
          const isActive = activeTab === id;
          const count = userData && Array.isArray(userData[id]) ? userData[id].length : (userData?.profile && id === 'profile' ? 1 : 0);

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`group relative flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 ease-out border cursor-pointer
                ${isActive
                  ? "bg-white border-blue-100 shadow-lg shadow-blue-500/10 scale-100 ring-1 ring-blue-500/10"
                  : "bg-transparent border-transparent hover:bg-white/50 hover:border-gray-100 hover:shadow-sm text-gray-600"
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl transition-colors duration-300 ${isActive ? bg : "bg-gray-50 group-hover:bg-white"}`}>
                  <Icon className={`w-5 h-5 ${isActive ? color : "text-gray-400 group-hover:text-gray-600"}`} />
                </div>
                <span className={`font-semibold tracking-wide ${isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"}`}>
                  {label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {count > 0 && (
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
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
    </aside>
  );
}
