import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Template4({ data, id, font = 'font-sans', color = '#000000' }) {
    const { profile, experience, education, skills, projectExperience } = data;

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
            className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[15mm] text-[#333333] leading-normal overflow-hidden"
            style={{ fontFamily: activeFontFamily }}
        >
            {/* Header */}
            <header className="mb-6 text-center">
                <h1 className="text-4xl font-extrabold text-black uppercase tracking-widest mb-1">
                    {profile?.name || "SEBASTIAN BENNETT"}
                </h1>
                <p className="text-lg font-medium text-slate-500 tracking-wide mb-4">
                    {profile?.title || "Professional Accountant"}
                </p>

                <div className="flex justify-center items-center gap-6 text-[10px] text-slate-600 font-medium border-t border-slate-200 pt-4">
                    {profile?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={10} className="text-black" />
                            <span>{profile.phone}</span>
                        </div>
                    )}
                    {profile?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={10} className="text-black" />
                            <span>{profile.email}</span>
                        </div>
                    )}
                    {profile?.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={10} className="text-black" />
                            <span>{profile.location}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="border-t border-slate-200 mb-8"></div>

            {/* Profile / About */}
            {(profile?.summary || profile?.about) && (
                <section className="mb-8">
                    <h2 className="text-sm font-black uppercase tracking-widest text-black mb-4">
                        ABOUT ME
                    </h2>
                    <p className="text-[11px] leading-relaxed text-slate-600 text-justify">
                        {profile.summary || profile.about}
                    </p>
                    <div className="border-t border-slate-100 mt-8"></div>
                </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-black uppercase tracking-widest text-black mb-4">
                        EDUCATION
                    </h2>
                    <div className="space-y-6">
                        {education.map((edu) => (
                            <div key={edu.id || Math.random()}>
                                <div className="flex justify-between items-baseline mb-1 text-[11px] font-bold text-slate-400 italic">
                                    <span>{edu.school}</span>
                                    <span>
                                        {edu.start ? new Date(edu.start).getFullYear() : ''} —
                                        {edu.end ? new Date(edu.end).getFullYear() : 'PRESENT'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-black text-[12px] uppercase mb-2">{edu.degree}</h3>
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                    {edu.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-100 mt-8"></div>
                </section>
            )}

            {/* Project Experience */}
            {projectExperience?.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-black uppercase tracking-widest text-black mb-4">
                        PROJECT EXPERIENCE
                    </h2>
                    <div className="space-y-8">
                        {projectExperience.map((proj) => (
                            <div key={proj.id || Math.random()}>
                                <div className="flex justify-between items-baseline mb-1 text-[11px] font-bold text-slate-400 italic">
                                    <span>{proj.client}</span>
                                    <span>
                                        {proj.start ? new Date(proj.start).getFullYear() : ''} —
                                        {proj.end ? new Date(proj.end).getFullYear() : 'PRESENT'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-black text-[12px] uppercase mb-1">{proj.title}</h3>
                                <div className="text-[10px] text-slate-500 font-bold uppercase mb-2 tracking-wider">{proj.role}</div>
                                <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line mb-2">
                                    {proj.details}
                                </p>
                                {proj.technologies && (
                                    <p className="text-[10px] text-slate-400 font-bold italic">
                                        Technologies: {proj.technologies}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-100 mt-8"></div>
                </section>
            )}

            {/* Work Experience */}
            {experience?.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-black uppercase tracking-widest text-black mb-4">
                        WORK EXPERIENCE
                    </h2>
                    <div className="space-y-8">
                        {experience.map((exp) => (
                            <div key={exp.id || Math.random()}>
                                <div className="flex justify-between items-baseline mb-1 text-[11px] font-bold text-slate-400 italic">
                                    <span>{exp.company}</span>
                                    <span>
                                        {exp.start ? new Date(exp.start).getFullYear() : ''} —
                                        {exp.end ? new Date(exp.end).getFullYear() : 'PRESENT'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-black text-[12px] uppercase mb-2">{exp.role}</h3>
                                <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                                    {exp.details || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-100 mt-8"></div>
                </section>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
                <section>
                    <h2 className="text-sm font-black uppercase tracking-widest text-black mb-4">
                        SKILLS
                    </h2>
                    <div className="grid grid-cols-3 gap-y-2 gap-x-4">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-black rounded-full block"></span>
                                <span className="text-[11px] text-slate-600 font-medium">
                                    {typeof skill === 'string' ? skill : skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
