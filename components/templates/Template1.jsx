import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template1({ data, id, font = 'font-sans', color = '#000000', pagePadding = 20, sectionSpacing = 24, h2Size, h3Size, h2Padding, h3Padding, h2Color, h3Color, pSize, pPadding, pColor }) {
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

    const headerBarStyle = {
        backgroundColor: '#f3f4f6', // lighter gray-100
        padding: `${h2Padding || 6}px 16px`,
        borderRadius: '8px',
        marginBottom: '12px',
        marginTop: `${sectionSpacing}px`,
        borderLeft: `4px solid ${h2Color || color}`
    };

    const h2Style = {
        fontSize: h2Size ? `${h2Size}px` : '12px',
        color: h2Color || color
    };

    const h3Style = {
        fontSize: h3Size ? `${h3Size}px` : '12px',
        color: h3Color || '#000000',
        paddingBottom: h3Padding ? `${h3Padding}px` : '0px'
    };

    const pStyle = {
        fontSize: pSize ? `${pSize}px` : '11px',
        color: pColor || '#000000',
        paddingBottom: pPadding ? `${pPadding}px` : '0px'
    };

    return (
        <div
            id={id || "resume-preview"}
            className="w-full bg-white text-black leading-snug"
            style={{ fontFamily: activeFontFamily, padding: `${pagePadding}mm` }}
        >
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-1" style={{ color }}>
                    {profile?.name || "YOUR NAME"}
                </h1>
                <p className="text-xl font-bold text-black uppercase mb-4">{profile?.title || ""}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-black font-medium">
                    {profile?.location && (
                        <span className="flex items-center gap-1">
                            {profile.location}
                        </span>
                    )}
                    {profile?.phone && (
                        <>
                            <span className="text-gray-300">|</span>
                            <span>{profile.phone}</span>
                        </>
                    )}
                    {profile?.email && (
                        <>
                            <span className="text-gray-300">|</span>
                            <span>{profile.email}</span>
                        </>
                    )}
                    {profile?.website && (
                        <>
                            <span className="text-gray-300">|</span>
                            <a href={profile.website} target="_blank" rel="noreferrer" className="hover:underline">{profile.website.replace(/^https?:\/\//, '')}</a>
                        </>
                    )}
                </div>
            </header>

            {/* Content with dynamic spacing */}
            <div className="resume-content">
                {/* Summary */}
                {(profile?.summary || profile?.about) && (
                    <section className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 className="font-extrabold uppercase tracking-widest" style={h2Style}>SUMMARY</h2>
                        </div>
                        <p className="leading-relaxed text-justify px-3" style={pStyle}>
                            {profile.summary || profile.about}
                        </p>
                    </section>
                )}

                {/* Skills */}
                {skills?.length > 0 && (
                    <section className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 className="font-extrabold uppercase tracking-widest" style={h2Style}>TECHNICAL SKILLS</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-y-2 px-3">
                            {skills.map((skill, index) => (
                                <p key={index} className="text-black" style={pStyle}>
                                    {typeof skill === 'string' ? skill : skill.name}
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Experience */}
                {experience?.length > 0 && (
                    <section className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 className="font-extrabold uppercase tracking-widest" style={h2Style}>PROFESSIONAL EXPERIENCE</h2>
                        </div>
                        <div className="space-y-6 px-3">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{exp.role}, {exp.company}</h3>
                                        <span style={pStyle} className="font-bold">
                                            {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <div className="leading-relaxed whitespace-pre-line list-disc ml-4">
                                        {exp.details?.split('\n').map((line, i) => (
                                            <div key={i} className="flex gap-2 mb-1" style={pStyle}>
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

                {/* Projects / Project Experience */}
                {((projects && projects.length > 0) || (projectExperience && projectExperience.length > 0)) && (
                    <section className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 className="font-extrabold uppercase tracking-widest" style={h2Style}>PROJECTS</h2>
                        </div>
                        <div className="space-y-4 px-3">
                            {/* Render projectExperience if exists */}
                            {projectExperience?.map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{proj.title} {proj.client ? `| ${proj.client}` : ''}</h3>
                                        <span style={pStyle} className="font-bold">
                                            {proj.start ? new Date(proj.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {proj.end ? new Date(proj.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <p className="leading-relaxed px-1" style={pStyle}>
                                        {proj.details || proj.description}
                                    </p>
                                </div>
                            ))}
                            {/* Render projects if exists and not already rendered as projectExperience */}
                            {projects?.filter(p => !projectExperience?.some(pe => pe.title === p.title)).map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{proj.title}</h3>
                                        <span className="text-[11px] font-bold text-black uppercase">Project</span>
                                    </div>
                                    <p className="leading-relaxed px-1" style={pStyle}>
                                        {proj.description || proj.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <section className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 className="font-extrabold uppercase tracking-widest" style={h2Style}>EDUCATION</h2>
                        </div>
                        <div className="space-y-4 px-3">
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{edu.degree}</h3>
                                        <span style={pStyle} className="font-bold">
                                            {edu.start ? new Date(edu.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {edu.end ? new Date(edu.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline" style={pStyle}>
                                        <div className="italic">{edu.school}</div>
                                        {edu.grade && <div className="font-bold">Grade: {edu.grade}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Additional Information */}
                {(certifications?.length > 0 || social?.length > 0) && (
                    <section className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 className="font-extrabold uppercase tracking-widest" style={h2Style}>ADDITIONAL INFORMATION</h2>
                        </div>
                        <div className="space-y-2 px-3">
                            {certifications?.length > 0 && (
                                <div className="flex gap-2" style={pStyle}>
                                    <span className="font-bold shrink-0">Certifications:</span>
                                    <span>{certifications.map(c => c.name).join(', ')}</span>
                                </div>
                            )}
                            {social?.length > 0 && (
                                <div className="flex gap-2" style={pStyle}>
                                    <span className="font-bold shrink-0">Links:</span>
                                    <div className="flex flex-wrap gap-x-4">
                                        {social.map((s, i) => (
                                            <a key={i} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
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
