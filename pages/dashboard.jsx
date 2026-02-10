'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from '@/config';
import { signOut } from 'next-auth/react';
import ProfileSection from '@/components/ProfileSection';
import SkillsSection from '@/components/Skills';
import ExperienceSection from '@/components/Experience';
import EducationSection from '@/components/Education';
import ProjectsSection from '@/components/Projects';
import CertificationsSection from '@/components/Certifications';
import GenerateResume from '@/components/GenerateResume';
import UserResume from '@/components/UserResume';
import Sidebar from '@/components/Sidebar';
import SocialsSection from '@/components/Socials';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    signOut({ callbackUrl: '/signin' });
  };

  const [userData, setUserData] = useState({
    profile: {},
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    social: []
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Check if token exists and is not the string "undefined"
    if (token && token !== 'undefined' && token !== 'null') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
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

  // Show sign-in prompt if not authenticated
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl border border-white/10 p-8 text-center">
          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Authentication Required</h2>
          <p className="text-slate-400 mb-6">Please sign in to access your dashboard and manage your resume.</p>
          <button
            onClick={() => router.push('/signin')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In to Continue
          </button>
          <p className="text-slate-500 text-sm mt-4">
            Don't have an account?{' '}
            <button onClick={() => router.push('/signup')} className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up here
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium animate-pulse">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl mix-blend-screen opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl mix-blend-screen opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl mix-blend-screen opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-1">
          <div>
            {/* <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h1> */}
            <p className="text-slate-400 mt-1 text-base">Welcome back, <span className="text-blue-400">{user?.name || "Creator"}</span></p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 py-4">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} handleLogout={handleLogout} />

          <main className="flex-1 min-w-0">
            <div className="bg-transparent rounded-3xl min-h-[500px] transition-all duration-300">
              <div className="mb-6 pb-3 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white capitalize">{activeTab === 'social' ? 'Social Media' : activeTab}</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Manage your {activeTab} information</p>
                </div>
                {isSaving && (
                  <span className="text-xs font-medium text-blue-400 flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /> Saving...
                  </span>
                )}
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'profile' && <ProfileSection data={userData.profile || {}} onSave={saveToDatabase} isSaving={isSaving} />}
                {activeTab === 'skills' && <SkillsSection data={userData.skills || []} onSave={saveToDatabase} isSaving={isSaving} />}
                {activeTab === 'experience' && <ExperienceSection data={userData.experience || []} onSave={saveToDatabase} isSaving={isSaving} />}
                {activeTab === 'education' && <EducationSection data={userData.education || []} onSave={saveToDatabase} isSaving={isSaving} />}
                {activeTab === 'projects' && <ProjectsSection data={userData.projects || []} onSave={saveToDatabase} isSaving={isSaving} />}
                {activeTab === 'social' && <SocialsSection data={userData.social || []} onSave={saveToDatabase} isSaving={isSaving} />}
                {activeTab === 'certifications' && <CertificationsSection data={userData.certifications || []} onSave={saveToDatabase} isSaving={isSaving} />}
                {activeTab === 'generate' && <GenerateResume data={userData} />}
                {activeTab === 'userresume' && <UserResume data={userData} />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
