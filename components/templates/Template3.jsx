import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template3({ data, id, font = 'font-sans', color = '#000000', pagePadding = 20, sectionSpacing = 24 }) {
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
            {/* Centered Header */}
            <header className="mb-6 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-1" style={{ color }}>
                    {profile?.name || "YOUR NAME"}
                </h1>
                <p className="text-xl font-bold text-black uppercase mb-4 tracking-widest">{profile?.title || ""}</p>

                <div className="flex flex-wrap justify-center gap-x-4 text-[11px] text-black font-medium mb-4">
                    {profile?.location && <span>{profile.location}</span>}
                    {profile?.phone && (
                        <>
                            <span className="text-black font-bold">|</span>
                            <span>{profile.phone}</span>
                        </>
                    )}
                    {profile?.email && (
                        <>
                            <span className="text-black font-bold">|</span>
                            <span>{profile.email}</span>
                        </>
                    )}
                </div>
                <div className="mt-2 mb-4 w-full" style={{ borderBottom: `6px solid ${color}` }}></div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
                {/* Profile Summary */}
                {(profile?.summary || profile?.about) && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3" style={{ color, borderColor: color }}>PROFILE SUMMARY</h2>
                        <p className="text-[11px] leading-relaxed text-black text-justify">
                            {profile.summary || profile.about}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience?.length > 0 && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4" style={{ color, borderColor: color }}>EXPERIENCE</h2>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-black text-[12px]">{exp.role}</h3>
                                        <div className="text-[11px] font-bold text-black">
                                            {exp.company} <span className="font-medium">| {exp.start ? new Date(exp.start).getFullYear() : ''} — {exp.end ? new Date(exp.end).getFullYear() : 'Present'}</span>
                                        </div>
                                    </div>
                                    <div className="text-black text-[11px] leading-relaxed ml-4">
                                        {exp.details?.split('\n').map((line, i) => (
                                            <div key={i} className="flex gap-2 mb-1">
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
                        <h2 className="text-[14px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4" style={{ color, borderColor: color }}>PROJECTS</h2>
                        <div className="space-y-6">
                            {projectExperience?.map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-black text-[12px]">{proj.title}</h3>
                                        <div className="text-[11px] font-bold text-black">
                                            {proj.client} <span className="font-medium">| {proj.start ? new Date(proj.start).getFullYear() : ''} — {proj.end ? new Date(proj.end).getFullYear() : 'Present'}</span>
                                        </div>
                                    </div>
                                    <div className="text-black text-[11px] leading-relaxed ml-4">
                                        {proj.details || proj.description}
                                    </div>
                                </div>
                            ))}
                            {projects?.filter(p => !projectExperience?.some(pe => pe.title === p.title)).map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-black text-[12px]">{proj.title}</h3>
                                        <span className="text-[11px] font-bold text-black uppercase">Project</span>
                                    </div>
                                    <div className="text-black text-[11px] leading-relaxed ml-4">
                                        {proj.description || proj.desc}
                                    </div>
                                    {proj.link && <p className="text-[10px] text-gray-500 mt-1 ml-4">{proj.link}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3" style={{ color, borderColor: color }}>EDUCATION</h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <h3 className="font-bold text-black text-[12px]">{edu.degree}</h3>
                                    <div className="text-[11px] text-black">
                                        {edu.school}, {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills?.length > 0 && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3" style={{ color, borderColor: color }}>SKILLS</h2>
                        <div className="space-y-3">
                            <div className="px-1 text-[11px] text-black italic">
                                {skills.map((skill, index) => (
                                    <span key={index}>
                                        {typeof skill === 'string' ? skill : skill.name}
                                        {index < skills.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Achievements / Certifications */}
                {(certifications?.length > 0 || social?.length > 0) && (
                    <section>
                        <h2 className="text-[14px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3" style={{ color, borderColor: color }}>ACHIEVEMENTS / LINKS</h2>
                        <div className="space-y-2 text-[11px] text-black px-1">
                            {certifications?.map((cert, i) => (
                                <div key={i} className="flex gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>{cert.name} {cert.issuer ? `- ${cert.issuer}` : ''} {cert.year ? `(${cert.year})` : ''}</span>
                                </div>
                            ))}
                            {social?.map((s, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <span className="shrink-0">•</span>
                                    <span className="font-bold">{s.network}:</span>
                                    <a href={s.url} target="_blank" rel="noreferrer" className="hover:underline">{s.url.replace(/^https?:\/\//, '')}</a>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
