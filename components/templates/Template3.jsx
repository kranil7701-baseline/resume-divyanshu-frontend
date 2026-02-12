export default function Template3({ data, id, font = 'font-sans', color = '#4f46e5' }) {
    const { profile, experience, education, skills, projects, projectExperience, certifications, social } = data;

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
            className="w-[210mm] min-h-[297mm] mx-auto bg-[#ffffff] p-[20mm] text-[#1f2937] leading-tight overflow-hidden"
            style={{ fontFamily: activeFontFamily }}
        >
            {/* Bold Header */}
            <header className="mb-12">
                <div className="flex justify-between items-start mb-6">
                    <div className="max-w-[70%]">
                        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2" style={{ color }}>
                            {profile?.name || "Your Name"}
                        </h1>
                        <p className="text-xl font-bold text-slate-400 uppercase tracking-widest">{profile?.title || ""}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-0 border-t-4 border-slate-900 pt-6">
                    <div className="space-y-1 pr-4">
                        <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest block">Phone</span>
                        <span className="text-[10px] font-bold text-slate-700">{profile?.phone || "N/A"}</span>
                    </div>
                    <div className="space-y-1 pr-4 border-l border-slate-100 pl-4">
                        <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest block">Email</span>
                        <span className="text-[10px] font-bold text-slate-700 break-all">{profile?.email || "N/A"}</span>
                    </div>
                    <div className="space-y-1 pr-4 border-l border-slate-100 pl-4">
                        <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest block">Location</span>
                        <span className="text-[10px] font-bold text-slate-700">{profile?.location || "N/A"}</span>
                    </div>
                    <div className="space-y-1 border-l border-slate-100 pl-4">
                        <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest block">Network</span>
                        <span className="text-[10px] font-bold text-slate-700">{social?.[0]?.network || "Portfolio"}</span>
                    </div>
                </div>
            </header>

            <div className="space-y-12">
                {/* Profile Grid Item */}
                {(profile?.summary || profile?.about) && (
                    <section className="grid grid-cols-12 items-start">
                        <div className="col-span-1 h-full w-1" style={{ backgroundColor: color }} />
                        <div className="col-span-2 text-[10px] font-black uppercase tracking-widest pt-1 px-2">
                            Summary
                        </div>
                        <div className="col-span-9 pl-6">
                            <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                                {profile.summary || profile.about}
                            </p>
                        </div>
                    </section>
                )}

                {/* Experience History */}
                {experience?.length > 0 && (
                    <section className="grid grid-cols-12 items-start">
                        <div className="col-span-1 h-full w-1 bg-slate-200" />
                        <div className="col-span-2 text-[10px] font-black uppercase tracking-widest pt-1 px-2">
                            History
                        </div>
                        <div className="col-span-9 pl-6 space-y-10">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()} className="relative">
                                    <div className="absolute -left-[28px] top-[7px] w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-black text-[14px] text-slate-900 uppercase">{exp.role}</h3>
                                        <span className="text-[9px] font-black font-mono text-slate-400">
                                            {exp.start ? new Date(exp.start).getFullYear() : ''} // {exp.end ? new Date(exp.end).getFullYear() : 'NOW'}
                                        </span>
                                    </div>
                                    <div className="text-[11px] font-bold mb-3 opacity-60 uppercase tracking-widest">{exp.company}</div>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">{exp.details}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Project History */}
                {projectExperience?.length > 0 && (
                    <section className="grid grid-cols-12 items-start">
                        <div className="col-span-1 h-full w-1 bg-slate-100" />
                        <div className="col-span-2 text-[10px] font-black uppercase tracking-widest pt-1 px-2">
                            Projects
                        </div>
                        <div className="col-span-9 pl-6 space-y-10">
                            {projectExperience.map((proj) => (
                                <div key={proj.id || Math.random()} className="relative">
                                    <div className="absolute -left-[28px] top-[7px] w-2 h-2 rounded-full border-2 border-slate-200 bg-white" />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-black text-[14px] text-slate-900 uppercase">{proj.title}</h3>
                                        <span className="text-[9px] font-black font-mono text-slate-400">
                                            {proj.start ? new Date(proj.start).getFullYear() : ''} // {proj.end ? new Date(proj.end).getFullYear() : 'NOW'}
                                        </span>
                                    </div>
                                    <div className="text-[11px] font-bold mb-2 opacity-60 uppercase tracking-widest">
                                        {proj.client} {proj.role ? `| ${proj.role}` : ''}
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-relaxed mb-2">{proj.details}</p>
                                    {proj.technologies && (
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                            Technologies // <span className="text-slate-600">{proj.technologies}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {education?.length > 0 && (
                    <section className="grid grid-cols-12 items-start">
                        <div className="col-span-1 h-full w-1 bg-slate-100" />
                        <div className="col-span-2 text-[10px] font-black uppercase tracking-widest pt-1 px-2">
                            Education
                        </div>
                        <div className="col-span-9 pl-6 space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <h3 className="font-bold text-[13px] text-slate-900 mb-1">{edu.degree}</h3>
                                    <div className="text-[11px] font-medium text-slate-500">{edu.school}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {skills?.length > 0 && (
                    <section className="grid grid-cols-12 items-start">
                        <div className="col-span-1 h-full w-1 bg-slate-900" />
                        <div className="col-span-2 text-[10px] font-black uppercase tracking-widest pt-1 px-2">
                            Expertise
                        </div>
                        <div className="col-span-9 pl-6">
                            <div className="grid grid-cols-3 gap-4">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex flex-col gap-1">
                                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{typeof skill === 'string' ? skill : skill.name}</span>
                                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full" style={{ backgroundColor: color, width: '80%' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
