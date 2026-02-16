import React, { useState } from "react";
import { Download, Printer, LayoutTemplate } from "lucide-react";
import ResumePreview from "./ResumePreview";
export default function GenerateResume({ data }) {
    const [template, setTemplate] = useState('template1');
    const [font, setFont] = useState('font-sans'); // Inter default
    const [color, setColor] = useState('#000000'); // Black default
    const [pagePadding, setPagePadding] = useState(20); // in mm
    const [sectionSpacing, setSectionSpacing] = useState(24); // in px (margin top for sections)

    const fonts = [
        { id: 'font-sans', label: 'Inter (Modern)', family: 'Inter, system-ui, sans-serif' },
        { id: 'font-serif', label: 'Georgia (Classic)', family: 'Georgia, serif' },
        { id: 'font-times', label: 'Times New Roman', family: '"Times New Roman", Times, serif' },
        { id: 'font-garamond', label: 'Garamond (Elegant)', family: '"EB Garamond", Garamond, serif' },
    ];

    const colors = [
        { id: 'black', value: '#000000' },
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
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: {
                scale: 4,
                useCORS: true,
                letterRendering: true,
                onclone: (clonedDoc) => {
                    const elements = clonedDoc.getElementsByTagName('*');
                    for (let i = 0; i < elements.length; i++) {
                        const el = elements[i];
                        const styles = window.getComputedStyle(el);

                        // List of properties that might contain colors
                        const props = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'fill', 'stroke'];

                        props.forEach(prop => {
                            const value = styles[prop];
                            if (value && value.includes('oklch')) {
                                // Simple replacement to prevent crash.
                                // Since we are using mostly black/gray/blue, we can try to approximate or just force black/white
                                // A better way would be to use a canvas to convert it, but that's complex here.
                                // For now, let's just force a safe color to avoid the crash.
                                if (prop === 'backgroundColor') el.style[prop] = '#ffffff';
                                else if (styles.color && styles.color.includes('oklch')) el.style.color = '#000000';
                                else el.style[prop] = '#000000';
                            }
                        });
                    }
                }
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
            pagebreak: { mode: ['avoid-all'] }
        };

        const html2pdf = (await import('html2pdf.js')).default;
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
            {/* Sidebar for Customization */}
            <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
                <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/10 flex flex-col gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">Customization</h2>
                        <p className="text-slate-400 text-[10px] mt-0.5">Refine your professional look.</p>
                    </div>

                    <div className="space-y-8">
                        {/* Download Button moved here for visibility */}
                        <button
                            onClick={handleDownload}
                            className="w-full bg-white text-blue-900 hover:bg-blue-50 px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all relative z-10 text-[11px]"
                        >
                            <Download size={14} />
                            Download PDF
                        </button>

                        <div className="h-px bg-white/5 w-full" />

                        {/* Template Selector */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <LayoutTemplate size={12} /> Template Design
                            </label>
                            <select
                                value={template}
                                onChange={(e) => setTemplate(e.target.value)}
                                className="w-full bg-slate-800/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500/50 transition-all font-medium appearance-none cursor-pointer hover:bg-slate-800/60"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                            >
                                <option value="template1" className="bg-slate-900 text-white">Modern Layout</option>
                                <option value="template2" className="bg-slate-900 text-white">Minimalist Style</option>
                                <option value="template3" className="bg-slate-900 text-white">Grid Based</option>
                                <option value="template4" className="bg-slate-900 text-white">Executive Corporate</option>
                                <option value="template5" className="bg-slate-900 text-white">Professional Classic</option>
                            </select>
                        </div>

                        {/* Font Selector */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Typography / Font Family</label>
                            <select
                                value={font}
                                onChange={(e) => setFont(e.target.value)}
                                className="w-full bg-slate-800/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500/50 transition-all font-medium appearance-none cursor-pointer hover:bg-slate-800/60"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                            >
                                {fonts.map(f => (
                                    <option key={f.id} value={f.id} className="bg-slate-900 text-white" style={{ fontFamily: f.family }}>{f.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Layout Spacing */}
                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Layout Spacing</label>
                            <div className="bg-slate-800/20 p-4 rounded-2xl border border-white/5 space-y-5">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                        <span>Page Padding</span>
                                        <span className="text-white bg-slate-700 px-2 py-0.5 rounded-md">{pagePadding}mm</span>
                                    </div>
                                    <input
                                        type="range" min="5" max="40" value={pagePadding}
                                        onChange={(e) => setPagePadding(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                        <span>Section Gap</span>
                                        <span className="text-white bg-slate-700 px-2 py-0.5 rounded-md">{sectionSpacing}px</span>
                                    </div>
                                    <input
                                        type="range" min="8" max="48" value={sectionSpacing}
                                        onChange={(e) => setSectionSpacing(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Color Picker */}
                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Accent Color</label>
                            <div className="grid grid-cols-4 gap-3 bg-slate-800/20 p-4 rounded-2xl border border-white/5">
                                {colors.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setColor(c.value)}
                                        className={`group relative w-full aspect-square rounded-xl border-2 transition-all flex items-center justify-center ${color === c.value ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        style={{ backgroundColor: c.value }}
                                    >
                                        {color === c.value && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xl" />}
                                    </button>
                                ))}
                                <div className="relative group w-full aspect-square rounded-xl border-2 border-white/5 bg-slate-800/50 hover:border-white/20 transition-all flex items-center justify-center cursor-pointer">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                    <div className="text-[10px] font-black text-white pointer-events-none">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-slate-900/30 border border-white/5 rounded-[32px] p-6 lg:p-8 overflow-y-auto flex justify-center print:hidden relative custom-scrollbar shadow-inner">
                <div className="scale-[0.4] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.7] xl:scale-[0.85] origin-top transition-all duration-500 shadow-2xl shadow-black/50">
                    <ResumePreview data={data} template={template} font={font} color={color} pagePadding={pagePadding} sectionSpacing={sectionSpacing} />
                </div>
            </div>

            {/* Hidden Container for PDF Generation */}
            <div className="fixed left-[-9999px] top-0 overflow-hidden">
                <div id="pdf-wrapper" className="w-[210mm]">
                    <ResumePreview data={data} template={template} font={font} color={color} pagePadding={pagePadding} sectionSpacing={sectionSpacing} id="resume-pdf-target" />
                </div>
            </div>
        </div>
    );
}
