import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template2({ data, id, font = 'font-sans', color = '#000000', pagePadding = 20, sectionSpacing = 24 }) {
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
            className="w-[210mm] min-h-[297mm] mx-auto bg-white text-black leading-snug overflow-hidden"
            style={{ fontFamily: activeFontFamily, padding: `${pagePadding}mm` }}
        >
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-1" style={{ color }}>
                    {profile?.name || "YOUR NAME"}
                </h1>
                <p className="text-xl font-bold text-black uppercase mb-3">{profile?.title || ""}</p>

                <div className="flex flex-wrap gap-x-3 text-[11px] text-black font-medium mb-2">
                    {profile?.location && <span>{profile.location}</span>}
                    {profile?.phone && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span>{profile.phone}</span>
                        </>
                    )}
                    {profile?.email && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span>{profile.email}</span>
                        </>
                    )}
                    {profile?.website && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span>{profile.website}</span>
                        </>
                    )}
                </div>
                <div className="mt-2 w-full" style={{ borderBottom: `2px solid ${color}` }}></div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
                {/* Summary */}
                {(profile?.summary || profile?.about) && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest pb-1 mb-2" style={{ borderBottom: `1px solid ${color}`, color }}>SUMMARY</h2>
                        <p className="text-[11px] leading-relaxed text-black text-justify">
                            {profile.summary || profile.about}
                        </p>
                    </section>
                )}

                {/* Professional Experience */}
                {experience?.length > 0 && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest pb-1 mb-2" style={{ borderBottom: `1px solid ${color}`, color }}>PROFESSIONAL EXPERIENCE</h2>
                        <div className="space-y-4">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-black text-[12px]">{exp.role}, {exp.company}</h3>
                                        <span className="text-[11px] font-medium text-black">
                                            {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <div className="text-black text-[11px] leading-relaxed ml-4">
                                        {exp.details?.split('\n').map((line, i) => (
                                            <div key={i} className="flex gap-2 mb-0.5">
                                                <span className="shrink-0">•</span>
                                                <span>{line.replace(/^[•*-]\s*/, '')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {((projects && projects.length > 0) || (projectExperience && projectExperience.length > 0)) && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest pb-1 mb-2" style={{ borderBottom: `1px solid ${color}`, color }}>PROJECTS</h2>
                        <div className="space-y-4">
                            {projectExperience?.map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-black text-[12px]">{proj.title} {proj.client ? `(${proj.client})` : ''}</h3>
                                        <span className="text-[11px] font-medium text-black">
                                            {proj.start ? new Date(proj.start).getFullYear() : ''} - {proj.end ? new Date(proj.end).getFullYear() : 'Present'}
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-black leading-relaxed italic mb-1">{proj.details || proj.description}</div>
                                </div>
                            ))}
                            {projects?.filter(p => !projectExperience?.some(pe => pe.title === p.title)).map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-black text-[12px]">{proj.title}</h3>
                                        <span className="text-[11px] font-medium text-black uppercase">Project</span>
                                    </div>
                                    <div className="text-[11px] text-black leading-relaxed italic mb-1">{proj.description || proj.desc}</div>
                                    {proj.link && <p className="text-[10px] text-gray-500">{proj.link}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills?.length > 0 && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest pb-1 mb-2" style={{ borderBottom: `1px solid ${color}`, color }}>SKILLS</h2>
                        <div className="grid grid-cols-2 gap-x-8 px-1 text-[11px] text-black">
                            {skills.map((skill, index) => (
                                <div key={index}>
                                    {typeof skill === 'string' ? skill : skill.name}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest pb-1 mb-2" style={{ borderBottom: `1px solid ${color}`, color }}>EDUCATION</h2>
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-black text-[12px]">{edu.degree}</h3>
                                        <span className="text-[11px] text-black">
                                            {edu.start ? new Date(edu.start).getFullYear() : ''} — {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-black">{edu.school}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Additional Information */}
                {(certifications?.length > 0 || social?.length > 0) && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest pb-1 mb-2" style={{ borderBottom: `1px solid ${color}`, color }}>ADDITIONAL INFORMATION</h2>
                        <div className="space-y-2 text-[11px] text-black">
                            {certifications?.length > 0 && (
                                <div className="flex gap-2">
                                    <span className="font-bold shrink-0">• Certifications:</span>
                                    <span>{certifications.map(c => c.name).join(', ')}</span>
                                </div>
                            )}
                            {social?.length > 0 && (
                                <div className="flex gap-2">
                                    <span className="font-bold shrink-0">• Links:</span>
                                    <div className="flex flex-wrap gap-x-4">
                                        {social.map((s, i) => (
                                            <a key={i} href={s.url} target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1" style={{ color: color }}>
                                                {getSocialIcon(s.network)} {s.network}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
