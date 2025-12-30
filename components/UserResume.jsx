
import React, { useState } from 'react';
import { Loader2, Zap, FileText, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

import { API } from '../config';

export default function UserResume({ data }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        let finalDate = dateString;

        // If it's a Date object
        if (dateString instanceof Date) {
            finalDate = dateString.toISOString();
        }

        // Take strictly YYYY-MM-DD
        if (typeof finalDate === 'string' && finalDate.length >= 10) {
            return finalDate.substring(0, 10);
        }

        return "";
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Construct the payload based on documented schema (v3)
            // https://useresume.ai/resume-generation-api/docs
            const payload = {
                content: {
                    name: data.profile?.name || "",
                    role: data.profile?.title || "",
                    email: data.profile?.email || "",
                    phone: data.profile?.phone || "",
                    address: data.profile?.location || "",
                    summary: data.profile?.summary || data.profile?.about || "",

                    // Social links mapping
                    links: [
                        ...(data.profile?.linkedin ? [{ name: "LinkedIn", url: data.profile.linkedin }] : []),
                        ...(data.profile?.website ? [{ name: "Portfolio", url: data.profile.website }] : [])
                    ],

                    employment: data.experience?.map(exp => ({
                        title: exp.role || exp.title,
                        company: exp.company,
                        location: exp.location || "",
                        start_date: formatDate(exp.start),
                        end_date: formatDate(exp.end),
                        present: !exp.end,
                        short_description: exp.details || exp.description || ""
                    })) || [],

                    education: data.education?.map(edu => ({
                        institution: edu.school,
                        degree: edu.degree,
                        start_date: formatDate(edu.start),
                        end_date: formatDate(edu.end),
                        present: !edu.end,
                        location: edu.location || "",
                        short_description: edu.details || ""
                    })) || [],

                    skills: data.skills?.map(skill => {
                        const skillName = typeof skill === 'string' ? skill : skill.name;
                        // "Experienced" works as a good fallback if api accepts free text or enum
                        const skillLevel = (typeof skill === 'object' && (skill.level || skill.rating || skill.proficiency)) ? (skill.level || skill.rating || skill.proficiency) : "Experienced";

                        return {
                            name: skillName,
                            proficiency: skillLevel
                        };
                    }) || [],

                    projects: data.projects?.map(proj => ({
                        name: proj.title,
                        short_description: proj.description || proj.desc || "",
                        url: proj.link || ""
                    })) || [],

                    certifications: data.certifications?.map(cert => ({
                        name: cert.name,
                        institution: cert.issuer,
                        start_date: formatDate(cert.date),
                    })) || []
                },
                style: {
                    template: "default",
                    template_color: "blue",
                    font: "inter",
                    page_padding: 1.54,
                    page_format: "a4",
                    date_format: "LLL yyyy",
                    background_color: "white",
                    profile_picture_radius: "rounded-full"
                }
            };

            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/resume/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.text();
                // Try to parse JSON error if possible
                try {
                    const jsonErr = JSON.parse(errData);
                    throw new Error(jsonErr.error || `API Error: ${response.status}`);
                } catch (e) {
                    throw new Error(`API Error (${response.status})`);
                }
            }

            const jsonResponse = await response.json();

            // The backend proxy returns the direct data object from UseResume API
            if (jsonResponse.success && jsonResponse.data?.file_url) {
                setResult(jsonResponse.data);
            } else if (jsonResponse.file_url) {
                // If backend unwrapped it or structure differs
                setResult(jsonResponse);
            } else {
                setResult(jsonResponse.data || jsonResponse);
            }

        } catch (err) {
            console.error(err);
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
            {/* Header Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Zap size={200} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Zap className="text-yellow-300" />
                        UseResume Generation
                    </h2>
                    <p className="text-indigo-100 max-w-xl text-lg">
                        Generate an ATS-optimized resume using our powerful API integration.
                        Your existing profile data will be used to create a professional CV in seconds.
                    </p>
                </div>
            </div>

            {/* Actions Area */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Ready to Generate?</h3>
                        <p className="text-gray-500 mt-1">
                            We will send your detailed profile information to the UseResume engine.
                        </p>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg
                            ${loading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none translate-y-0'
                                : 'bg-gray-900 text-white hover:bg-black hover:shadow-gray-900/20 active:scale-95'
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <FileText />
                                Generate Now
                            </>
                        )}
                    </button>
                </div>

                {/* Status Feedback */}
                {error && (
                    <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 animate-in slide-in-from-top-2">
                        <AlertCircle className="shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold">Generation Failed</p>
                            <p className="text-sm opacity-90">{error}</p>
                            <p className="text-xs mt-2 opacity-75">Please check your internet connection or verify the API service status.</p>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="mt-8 p-6 bg-green-50 border border-green-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <CheckCircle size={32} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-green-800">Resume Generated Successfully!</h4>
                                <p className="text-green-700">Your professional resume is ready.</p>
                            </div>
                        </div>

                        {(result.file_url || result.pdfUrl) && (
                            <a
                                href={result.file_url || result.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                <ExternalLink size={18} />
                                View / Download Resume
                            </a>
                        )}

                        {/* Fallback Display */}
                        {!(result.file_url || result.pdfUrl) && (
                            <div className="bg-white p-4 rounded-xl border border-green-200 text-xs font-mono overflow-auto max-w-full">
                                {JSON.stringify(result, null, 2)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
