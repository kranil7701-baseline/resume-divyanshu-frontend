import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import { Trash2, Edit3, Eye } from 'lucide-react';
import { API } from '../config';

const SavedTemplatesPage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchSavedTemplates();
    }, []);

    const fetchSavedTemplates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/templates/my-templates`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTemplates(data);
            } else if (response.status === 401) {
                // User not authenticated, redirect to signin
                router.push('/signin');
                return;
            } else {
                setError('Failed to load templates');
            }
        } catch (err) {
            setError('Error loading templates');
            console.error('Error fetching templates:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteTemplate = async (id) => {
        if (!confirm('Are you sure you want to delete this template?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/templates/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setTemplates(templates.filter(t => t._id !== id));
            } else if (response.status === 401) {
                router.push('/signin');
                return;
            } else {
                alert('Failed to delete template');
            }
        } catch (err) {
            console.error('Error deleting template:', err);
            alert('Error deleting template');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-slate-400">Loading your templates...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <p className="text-red-400 mb-4">{error}</p>
                        <Link href="/templates" className="text-blue-400 hover:underline">Back to Templates</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>My Saved Templates | ResumeCraft</title>
                <meta name="description" content="View and manage your saved resume templates." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40">
                <div className="text-center mb-16">
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">My Templates</span>
                    <h1 className="text-4xl md:text-6xl font-black mb-10 leading-none tracking-tighter uppercase">
                        Saved <span className="text-gradient">Templates</span>
                    </h1>
                    <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                        Manage your saved resume templates and create new resumes from them.
                    </p>
                </div>

                {templates.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 mb-8">You haven't saved any templates yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.map((template) => (
                            <div key={template._id} className="bg-slate-900 rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-all">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                                    <p className="text-slate-400 text-sm">
                                        Created: {new Date(template.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        Name: {template.data?.profile?.name || 'Unnamed'}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href={`/edit-template/${template._id}`}
                                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Edit3 size={16} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteTemplate(template._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Link href="/templates" className="text-blue-400 hover:underline mr-8">Back to Templates</Link>
                    <Link href="/special-templates" className="text-blue-400 hover:underline">Create New Template</Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SavedTemplatesPage;