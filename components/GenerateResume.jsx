import React, { useState } from "react";
import { Download, Printer, LayoutTemplate } from "lucide-react";
import ResumePreview from "./ResumePreview";
export default function GenerateResume({ data }) {
    const [template, setTemplate] = useState('template1');
    const [font, setFont] = useState('font-sans'); // Inter default
    const [color, setColor] = useState('#2563eb'); // Blue default

    const fonts = [
        { id: 'font-sans', label: 'Inter (Modern)', family: 'Inter, system-ui, sans-serif' },
        { id: 'font-serif', label: 'Georgia (Classic)', family: 'Georgia, serif' },
        { id: 'font-times', label: 'Times New Roman', family: '"Times New Roman", Times, serif' },
        { id: 'font-garamond', label: 'Garamond (Elegant)', family: '"EB Garamond", Garamond, serif' },
    ];

    const colors = [
        { id: 'blue', value: '#2563eb' },
        { id: 'slate', value: '#334155' },
        { id: 'emerald', value: '#059669' },
        { id: 'indigo', value: '#4f46e5' },
        { id: 'rose', value: '#e11d48' },
        { id: 'amber', value: '#d97706' },
    ];

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
        <div className="flex flex-col gap-6 h-full">
            {/* Functionality Header */}
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/10 flex flex-col xl:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col gap-6 w-full">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">Resume Customization</h2>
                            <p className="text-slate-400 text-xs mt-1">Select a professional template, font, and accent color.</p>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all relative z-10 text-sm"
                        >
                            <Download size={16} />
                            Download PDF
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-2 border-t border-white/5">
                        {/* Template Selector */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <LayoutTemplate size={12} /> Templates
                            </label>
                            <div className="flex items-center gap-2 bg-slate-800/30 p-1 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setTemplate('template1')}
                                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${template === 'template1' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Modern
                                </button>
                                <button
                                    onClick={() => setTemplate('template2')}
                                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${template === 'template2' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Minimal
                                </button>
                                <button
                                    onClick={() => setTemplate('template3')}
                                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${template === 'template3' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Grid
                                </button>
                            </div>
                        </div>

                        {/* Font Selector */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Typography</label>
                            <select
                                value={font}
                                onChange={(e) => setFont(e.target.value)}
                                className="w-full bg-slate-800/30 border border-white/5 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500/50 transition-all font-medium"
                            >
                                {fonts.map(f => (
                                    <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Color Picker */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Accent Color</label>
                            <div className="flex items-center gap-2">
                                {colors.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setColor(c.value)}
                                        className={`w-6 h-6 rounded-full border-2 transition-all ${color === c.value ? 'scale-125 border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        style={{ backgroundColor: c.value }}
                                    />
                                ))}
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-6 h-6 rounded-full bg-transparent border-none cursor-pointer p-0 overflow-hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Container (Screen Only) */}
            <div className="flex-1 bg-slate-900/30 border border-white/5 rounded-3xl p-8 overflow-y-auto flex justify-center print:hidden relative custom-scrollbar">
                <div className="scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-top transition-transform shadow-2xl shadow-black/50">
                    <ResumePreview data={data} template={template} font={font} color={color} />
                </div>
            </div>

            {/* Hidden Container for PDF Generation (Unscaled) */}
            <div className="fixed left-[-9999px] top-0 overflow-hidden">
                <div id="pdf-wrapper" className="w-[210mm]">
                    <ResumePreview data={data} template={template} font={font} color={color} id="resume-pdf-target" />
                </div>
            </div>
        </div>
    );
}
