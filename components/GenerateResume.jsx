import React, { useRef } from "react";
import { Download, Printer } from "lucide-react";
import ResumePreview from "./ResumePreview";

export default function GenerateResume({ data }) {

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Functionality Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Ready to Export?</h2>
                    <p className="text-gray-500 text-sm">Review your resume and download it as a PDF.</p>
                </div>

                <button
                    onClick={handlePrint}
                    className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all print:hidden"
                >
                    <Printer size={18} />
                    Print / Save as PDF
                </button>
            </div>

            {/* Preview Container (Screen Only) */}
            <div className="flex-1 bg-gray-500/10 rounded-3xl p-8 overflow-y-auto flex justify-center print:hidden">
                <div className="scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-top transition-transform">
                    <ResumePreview data={data} />
                </div>
            </div>

            {/* Print Only Container (Hidden on Screen, Visible on Print) */}
            <div className="hidden print:block fixed inset-0 z-[9999] bg-white">
                <ResumePreview data={data} />
            </div>
        </div>
    );
}
