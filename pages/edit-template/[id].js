import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SpecialTemplates from '../../components/SpecialTemplates';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { API } from '../../config';

const EditTemplatePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchTemplate();
        }
    }, [id]);

    const fetchTemplate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/templates/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTemplate(data);
            } else if (response.status === 401) {
                router.push('/signin');
                return;
            } else if (response.status === 404) {
                setError('Template not found');
            } else {
                setError('Failed to load template');
            }
        } catch (err) {
            setError('Error loading template');
            console.error('Error fetching template:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-slate-400">Loading template...</p>
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
                        <Link href="/saved-templates" className="text-blue-400 hover:underline">Back to Saved Templates</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head>
                <title>Edit Template | ResumeCraft</title>
                <meta name="description" content="Edit your saved resume template." />
                <style dangerouslySetInnerHTML={{ __html: `
          body > div:last-child > span + img {
            display: inline !important;
          }
        ` }} />
            </Head>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/saved-templates" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tighter">
                            Edit Template: <span className="text-gradient">{template?.name}</span>
                        </h1>
                        <p className="text-slate-400 text-sm">Make changes and save to update your template</p>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8">
                <SpecialTemplates userData={template?.data} initialStyle={template?.style} initialSectionOrder={template?.sectionOrder} templateId={id} />
            </div>

            <Footer />
        </div>
    );
};

export default EditTemplatePage;