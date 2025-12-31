import React, { useState } from "react";
import { Download, Printer, LayoutTemplate } from "lucide-react";
import ResumePreview from "./ResumePreview";
export default function GenerateResume({ data }) {
    const [template, setTemplate] = useState('template1');

    const handleDownload = async () => {
        const element = document.getElementById('resume-pdf-target');
        const opt = {
            margin: 0,
            filename: `Resume_${data.profile?.name || 'User'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all'] }
        };

        const html2pdf = (await import('html2pdf.js')).default;
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Functionality Header */}
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col xl:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-bold text-white">Ready to Export?</h2>
                    <p className="text-slate-400 text-sm">Select a template, review, and download.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Template Selector */}
                    <div className="flex items-center gap-2 bg-slate-800/50 p-1.5 rounded-xl border border-white/5 relative z-10">
                        <button
                            onClick={() => setTemplate('template1')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${template === 'template1' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Modern
                        </button>
                        <button
                            onClick={() => setTemplate('template2')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${template === 'template2' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Minimal
                        </button>
                        <button
                            onClick={() => setTemplate('template3')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${template === 'template3' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Grid
                        </button>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all relative z-10"
                    >
                        <Download size={18} />
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Preview Container (Screen Only) */}
            <div className="flex-1 bg-slate-900/30 border border-white/5 rounded-3xl p-8 overflow-y-auto flex justify-center print:hidden relative">
                <div className="scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-top transition-transform shadow-2xl shadow-black/50">
                    <ResumePreview data={data} template={template} />
                </div>
            </div>

            {/* Hidden Container for PDF Generation (Unscaled) */}
            <div className="fixed left-[-9999px] top-0 overflow-hidden">
                <div id="pdf-wrapper" className="w-[210mm] h-[297mm]">
                    <ResumePreview data={data} template={template} id="resume-pdf-target" />
                </div>
            </div>
        </div>
    );
}
