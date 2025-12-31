import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config';

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
  const router = useRouter();
  const [user, setUser] = useState(null);

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
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} />

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
