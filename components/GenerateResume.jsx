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
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Ready to Export?</h2>
                    <p className="text-gray-500 text-sm">Select a template, review, and download.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Template Selector */}
                    <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl">
                        <button
                            onClick={() => setTemplate('modern')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${template === 'modern' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Modern
                        </button>
                        <button
                            onClick={() => setTemplate('classic')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${template === 'classic' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Classic
                        </button>
                    </div>

                    <button
                        onClick={handlePrint}
                        className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all print:hidden"
                    >
                        <Printer size={18} />
                        Print / Save PDF
                    </button>
                </div>
            </div>

            {/* Preview Container (Screen Only) */}
            <div className="flex-1 bg-gray-500/10 rounded-3xl p-8 overflow-y-auto flex justify-center print:hidden">
                <div className="scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-top transition-transform">
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
