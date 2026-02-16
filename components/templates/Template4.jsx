import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template4({ data, id, font = 'font-sans', color = '#000000', pagePadding = 20, sectionSpacing = 24 }) {
    const { profile, experience, education, skills, projects, projectExperience, certifications, social } = data;

    const fontStyles = {
        'font-sans': 'Inter, system-ui, sans-serif',
        'font-serif': 'Georgia, "Times New Roman", serif',
        'font-times': '"Times New Roman", Times, serif',
        'font-garamond': '"EB Garamond", Garamond, serif',
    };

    const activeFontFamily = fontStyles[font] || fontStyles['font-sans'];

    const getSocialIcon = (network) => {
        if (!network) return <LinkIcon size={12} />;
        const lower = network.toLowerCase();
        if (lower.includes('github')) return <Github size={12} />;
        if (lower.includes('linkedin')) return <Linkedin size={12} />;
        if (lower.includes('youtube')) return <Youtube size={12} />;
        if (lower.includes('twitter')) return <Twitter size={12} />;
        return <LinkIcon size={12} />;
    };

    return (
        <div
            id={id || "resume-preview"}
            className="w-[210mm] min-h-[297mm] mx-auto bg-white text-black leading-tight overflow-hidden"
            style={{ fontFamily: activeFontFamily, padding: `${pagePadding}mm` }}
        >
            {/* Header */}
            <header className="mb-6 pb-4" style={{ borderBottom: `4px solid ${color}` }}>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none" style={{ color }}>
                            {profile?.name || "YOUR NAME"}
                        </h1>
                        <p className="text-xl font-bold text-black uppercase mt-2 tracking-widest">{profile?.title || ""}</p>
                    </div>
                    <div className="text-right text-[11px] font-bold text-black space-y-0.5">
                        {profile?.location && <p>{profile.location}</p>}
                        {profile?.phone && <p>{profile.phone}</p>}
                        {profile?.email && <p>{profile.email}</p>}
                        {profile?.website && <p className="hover:underline">{profile.website}</p>}
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
                {/* Summary */}
                {(profile?.summary || profile?.about) && (
                    <section>
                        <h2 className="text-[14px] font-black uppercase tracking-widest px-3 py-1 mb-3 text-white" style={{ backgroundColor: color }}>PROFESSIONAL SUMMARY</h2>
                        <p className="text-[11px] leading-relaxed text-black text-justify px-1">
                            {profile.summary || profile.about}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience?.length > 0 && (
                    <section>
                        <h2 className="text-[14px] font-black uppercase tracking-widest pb-1 mb-4" style={{ borderBottom: `2px solid ${color}` }}>EXPERIENCE</h2>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-black text-[13px] uppercase">{exp.role}</h3>
                                        <span className="text-[11px] font-bold text-black">
                                            {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-600 mb-2 uppercase italic">{exp.company}</div>
                                    <ul className="text-black text-[11px] leading-relaxed space-y-1 ml-4 list-disc">
                                        {exp.details?.split('\n').map((line, i) => (
                                            <li key={i}>{line.replace(/^[•*-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {((projects && projects.length > 0) || (projectExperience && projectExperience.length > 0)) && (
                    <section>
                        <h2 className="text-[14px] font-black uppercase tracking-widest pb-1 mb-4" style={{ borderBottom: `2px solid ${color}` }}>KEY PROJECTS</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {projectExperience?.map((proj) => (
                                <div key={proj.id || Math.random()} className="pl-3 py-1" style={{ borderLeft: `2px solid ${color}` }}>
                                    <h3 className="font-bold text-black text-[12px] uppercase mb-1">{proj.title}</h3>
                                    <p className="text-[11px] text-black leading-relaxed italic">{proj.details || proj.description}</p>
                                </div>
                            ))}
                            {projects?.filter(p => !projectExperience?.some(pe => pe.title === p.title)).map((proj) => (
                                <div key={proj.id || Math.random()} className="pl-3 py-1" style={{ borderLeft: `2px solid ${color}` }}>
                                    <h3 className="font-bold text-black text-[12px] uppercase mb-1">{proj.title}</h3>
                                    <p className="text-[11px] text-black leading-relaxed italic">{proj.description || proj.desc}</p>
                                    {proj.link && <a href={proj.link} className="text-[10px] text-gray-500 hover:underline mt-1 block font-mono">Project Link</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Education */}
                <div className="grid grid-cols-2 gap-10">
                    {/* Education */}
                    {education?.length > 0 && (
                        <section>
                            <h2 className="text-[14px] font-black uppercase tracking-widest pb-1 mb-4" style={{ borderBottom: `2px solid ${color}` }}>EDUCATION</h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id || Math.random()}>
                                        <h3 className="font-bold text-black text-[12px] uppercase">{edu.degree}</h3>
                                        <div className="text-[11px] text-black font-medium">{edu.school}</div>
                                        <div className="text-[10px] text-gray-500 font-bold italic">
                                            Graduated: {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills?.length > 0 && (
                        <section>
                            <h2 className="text-[14px] font-black uppercase tracking-widest pb-1 mb-4" style={{ borderBottom: `2px solid ${color}` }}>CORE SKILLS</h2>
                            <div className="grid grid-cols-2 gap-y-2 text-[11px] text-black font-bold italic">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 shrink-0" style={{ backgroundColor: color }}></span>
                                        <span>{typeof skill === 'string' ? skill : skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Certifications & Social */}
                {(certifications?.length > 0 || social?.length > 0) && (
                    <section className="pt-4" style={{ borderTop: `2px solid ${color}` }}>
                        {certifications?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">CERTIFICATIONS</h3>
                                <div className="flex flex-wrap gap-x-6 gap-y-1">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="text-[11px] font-bold text-black uppercase">{cert.name}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {social?.length > 0 && (
                            <div className="flex flex-wrap justify-between gap-4">
                                {social.map((s, i) => (
                                    <a key={i} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter hover:underline" style={{ color }}>
                                        {getSocialIcon(s.network)}
                                        <span>{s.network}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}
