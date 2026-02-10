export default function Template2({ data, id, font = 'font-sans', color = '#334155' }) {
    const { profile, experience, education, skills, projects, certifications, social } = data;

    const fontStyles = {
        'font-sans': 'Inter, system-ui, sans-serif',
        'font-serif': 'Georgia, "Times New Roman", serif',
        'font-times': '"Times New Roman", Times, serif',
        'font-garamond': '"EB Garamond", Garamond, serif',
    };

    const activeFontFamily = fontStyles[font] || fontStyles['font-sans'];


    return (
        <div
            id={id || "resume-preview"}
            className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[20mm] text-[#1f2937] leading-tight overflow-hidden"
            style={{ fontFamily: activeFontFamily }}
        >
            {/* Minimalist Header */}
            <header className="mb-12 border-b border-slate-200 pb-8 relative">
                <div className="absolute top-0 right-0 text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
                    Curriculum Vitae
                </div>
                <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-2">
                    {profile?.name || "Your Name"}
                </h1>
                <p className="text-sm font-medium tracking-widest uppercase opacity-60 mb-6" style={{ color }}>
                    {profile?.title || ""}
                </p>

                <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-500">
                    <div className="space-y-1">
                        {profile?.email && <p className="flex items-center gap-2"><span className="font-black text-[9px] uppercase tracking-widest opacity-40">Email:</span> {profile.email}</p>}
                        {profile?.phone && <p className="flex items-center gap-2"><span className="font-black text-[9px] uppercase tracking-widest opacity-40">Phone:</span> {profile.phone}</p>}
                    </div>
                    <div className="space-y-1 text-right">
                        {profile?.location && <p className="flex items-center justify-end gap-2">{profile.location} <span className="font-black text-[9px] uppercase tracking-widest opacity-40">:Location</span></p>}
                        {profile?.website && <p className="flex items-center justify-end gap-2">{profile.website} <span className="font-black text-[9px] uppercase tracking-widest opacity-40">:Web</span></p>}
                    </div>
                </div>
            </header>

            <div className="space-y-12">
                {/* Profile */}
                {(profile?.summary || profile?.about) && (
                    <section className="grid grid-cols-12 gap-8">
                        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.2em] pt-1" style={{ color }}>
                            Description
                        </div>
                        <div className="col-span-9">
                            <p className="text-[12px] text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-4 py-1">
                                {profile.summary || profile.about}
                            </p>
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experience?.length > 0 && (
                    <section className="grid grid-cols-12 gap-8">
                        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.2em] pt-1" style={{ color }}>
                            Experience
                        </div>
                        <div className="col-span-9 space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-bold text-[13px] text-slate-900">{exp.role}</h3>
                                        <span className="text-[10px] font-medium text-slate-400">
                                            {exp.start ? new Date(exp.start).getFullYear() : ''} — {exp.end ? new Date(exp.end).getFullYear() : 'Present'}
                                        </span>
                                    </div>
                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 italic">{exp.company}</div>
                                    <p className="text-[11px] text-slate-600 text-justify leading-relaxed">{exp.details}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <section className="grid grid-cols-12 gap-8">
                        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.2em] pt-1" style={{ color }}>
                            Academic
                        </div>
                        <div className="col-span-9 space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <h3 className="font-bold text-[13px] text-slate-900 mb-1">{edu.degree}</h3>
                                    <div className="text-[11px] text-slate-500 italic mb-1">{edu.school}</div>
                                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                        {edu.start ? new Date(edu.start).getFullYear() : ''} — {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills?.length > 0 && (
                    <section className="grid grid-cols-12 gap-8">
                        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.2em] pt-1" style={{ color }}>
                            Capabilities
                        </div>
                        <div className="col-span-9">
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-slate-600">
                                {skills.map((skill, index) => (
                                    <span key={index} className="pb-1 border-b border-slate-100">
                                        {typeof skill === 'string' ? skill : skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Simple Footer Line */}
            <div className="mt-auto pt-20 text-center text-[9px] text-slate-300 font-bold uppercase tracking-[0.5em]">
                {profile?.name} &copy; 2024
            </div>
        </div>
    );
}
