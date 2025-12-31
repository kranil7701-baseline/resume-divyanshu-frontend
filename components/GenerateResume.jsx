import React, { useState } from "react";
import { Download, Printer, LayoutTemplate } from "lucide-react";
import ResumePreview from "./ResumePreview";

export default function GenerateResume({ data }) {
    const [template, setTemplate] = useState('modern');

    const handlePrint = () => {
        window.print();
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
                            onClick={() => setTemplate('modern')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${template === 'modern' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Modern
                        </button>
                        <button
                            onClick={() => setTemplate('classic')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${template === 'classic' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Classic
                        </button>
                    </div>

                    <button
                        onClick={handlePrint}
                        className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all print:hidden relative z-10"
                    >
                        <Printer size={18} />
                        Print / Save PDF
                    </button>
                </div>
            </div>

            {/* Preview Container (Screen Only) */}
            <div className="flex-1 bg-slate-900/30 border border-white/5 rounded-3xl p-8 overflow-y-auto flex justify-center print:hidden relative">
                <div className="scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-top transition-transform shadow-2xl shadow-black/50">
                    <ResumePreview data={data} template={template} />
                </div>
            </div>

            {/* Print Only Container (Hidden on Screen, Visible on Print) */}
            <div className="hidden print:block fixed inset-0 z-[9999] bg-white">
                <ResumePreview data={data} template={template} />
            </div>
        </div>
    );
}
