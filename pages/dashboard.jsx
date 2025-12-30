// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config'; // [NEW] Import API constant

import ProfileSection from '@/components/ProfileSection';
import SkillsSection from '@/components/Skills';
import ExperienceSection from '@/components/Experience';
import EducationSection from '@/components/Education';
import ProjectsSection from '@/components/Projects';
import CertificationsSection from '@/components/Certifications';
import GenerateResume from '@/components/GenerateResume'; // [NEW]
import UserResume from '@/components/UserResume';
import Sidebar from '@/components/Sidebar'; // [NEW] Import Sidebar

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const [userData, setUserData] = useState({
    profile: {},
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: []
  });

  useEffect(() => {
    fetchUserData();
  }, []);



  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);





  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      // [MODIFY] Use API constant
      const response = await fetch(`${API}/api/user/data`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToDatabase = async (section, data) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      // [MODIFY] Use API constant
      const response = await fetch(`${API}/api/user/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ section, data })
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      // Update local state
      setUserData(prev => ({
        ...prev,
        [section]: data
      }));

      return await response.json();
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  // ... keep imports
  const getColorClasses = (color) => {
    // Deprecated, removed in favor of Sidebar component handling
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium animate-pulse">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">

      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-extra-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.name || "Creator"}</p>
          </div>

          {/* <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/resume/preview')}
              className="cursor-pointer px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm flex items-center gap-2"
            >
              <span>👁️</span> Preview
            </button>
            <button className="cursor-pointer px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 shadow-gray-900/20 shadow-md">
              <span>📥</span> Download PDF
            </button>
          </div> */}
        </header>

        <div className="flex flex-col lg:flex-row gap-8 py-6">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-6 sm:p-10 min-h-[600px] transition-all duration-300">

              {/* Content Header */}
              <div className="mb-8 pb-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h2>
                  <p className="text-gray-500 text-sm mt-1">Manage your {activeTab} information</p>
                </div>
                {isSaving && (
                  <span className="text-sm font-medium text-blue-600 flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    Saving...
                  </span>
                )}
              </div>

              {/* Dynamic Sections with Animation Wrapper */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'profile' && (
                  <ProfileSection data={userData.profile || {}} onSave={saveToDatabase} isSaving={isSaving} />
                )}
                {activeTab === 'skills' && (
                  <SkillsSection data={userData.skills || []} onSave={saveToDatabase} isSaving={isSaving} />
                )}
                {activeTab === 'experience' && (
                  <ExperienceSection data={userData.experience || []} onSave={saveToDatabase} isSaving={isSaving} />
                )}
                {activeTab === 'education' && (
                  <EducationSection data={userData.education || []} onSave={saveToDatabase} isSaving={isSaving} />
                )}
                {activeTab === 'projects' && (
                  <ProjectsSection data={userData.projects || []} onSave={saveToDatabase} isSaving={isSaving} />
                )}
                {activeTab === 'certifications' && (
                  <CertificationsSection data={userData.certifications || []} onSave={saveToDatabase} isSaving={isSaving} />
                )}
                {activeTab === 'generate' && (
                  <GenerateResume data={userData} />
                )}
                {activeTab === 'userresume' && (
                  <UserResume data={userData} />
                )}
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
