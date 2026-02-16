import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template5({ data, id, font = 'font-serif', color = '#000000', pagePadding = 20, sectionSpacing = 24 }) {
    const { profile, experience, education, skills, projects, projectExperience, certifications, social } = data;

    const fontStyles = {
        'font-sans': 'Inter, system-ui, sans-serif',
        'font-serif': 'Georgia, "Times New Roman", serif',
        'font-times': '"Times New Roman", Times, serif',
        'font-garamond': '"EB Garamond", Garamond, serif',
    };

    const activeFontFamily = fontStyles[font] || fontStyles['font-serif'];

    const getSocialIcon = (network) => {
        if (!network) return null;
        const lower = network.toLowerCase();
        if (lower.includes('github')) return <Github size={10} />;
        if (lower.includes('linkedin')) return <Linkedin size={10} />;
        return <LinkIcon size={10} />;
    };

    return (
        <div
            id={id || "resume-preview"}
            className="w-[210mm] min-h-[297mm] mx-auto bg-white text-black leading-tight overflow-hidden text-[12px]"
            style={{ fontFamily: activeFontFamily, padding: `${pagePadding}mm` }}
        >
            {/* Header */}
            <header className="mb-4">
                <h1 className="text-3xl font-bold mb-1">
                    {profile?.name || "YOUR NAME"}
                </h1>
                <div className="flex flex-wrap items-center gap-x-2 text-[11px]">
                    {profile?.email && <span>{profile.email}</span>}
                    {profile?.phone && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span>{profile.phone}</span>
                        </>
                    )}
                    {profile?.location && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span>{profile.location}</span>
                        </>
                    )}
                    {social?.map((s, i) => (
                        <React.Fragment key={i}>
                            <span className="text-gray-400">|</span>
                            <a href={s.url} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline flex items-center gap-0.5">
                                {s.network}
                            </a>
                        </React.Fragment>
                    ))}
                    {profile?.website && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                                Portfolio
                            </a>
                        </>
                    )}
                </div>
                <div className="mt-2 border-b border-black w-full"></div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
                {/* Summary / Profile */}
                {(profile?.summary || profile?.about) && (
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black mb-2 pb-0.5">PROFILE</h2>
                        <p className="text-[11px] leading-relaxed text-black text-justify">
                            {profile.summary || profile.about}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {experience?.length > 0 && (
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black mb-2 pb-0.5">WORK EXPERIENCE</h2>
                        <div className="space-y-4">
                            {experience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline font-bold italic">
                                        <div className="flex flex-col text-black">
                                            <span className="not-italic font-bold">{exp.company}</span>
                                            <span className="text-[11px] font-medium">{exp.role}</span>
                                        </div>
                                        <div className="text-right flex flex-col text-black">
                                            <span>
                                                {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                                {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                            </span>
                                            {exp.location && <span className="text-[10px] font-normal italic">{exp.location}</span>}
                                        </div>
                                    </div>
                                    <ul className="mt-1 ml-4 list-disc space-y-0.5 text-[11px]">
                                        {exp.details?.split('\n').map((line, i) => (
                                            <li key={i}>{line.replace(/^[•*-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {((projects && projects.length > 0) || (projectExperience && projectExperience.length > 0)) && (
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black mb-2 pb-0.5">PROJECTS</h2>
                        <div className="space-y-3">
                            {projectExperience?.map((proj, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline font-bold italic">
                                        <div className="flex flex-col text-black">
                                            <span className="not-italic font-bold">{proj.title}</span>
                                        </div>
                                        <div className="text-right text-black">
                                            <span>
                                                {proj.start ? new Date(proj.start).getFullYear() : ''}
                                                {proj.end ? ` — ${new Date(proj.end).getFullYear()}` : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="mt-0.5 ml-4 list-disc space-y-0.5 text-[11px]">
                                        {(proj.details || proj.description)?.split('\n').map((line, i) => (
                                            <li key={i}>{line.replace(/^[•*-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            {projects?.filter(p => !projectExperience?.some(pe => pe.title === p.title)).map((proj, idx) => (
                                <div key={idx}>
                                    <div className="font-bold italic text-black">
                                        <span className="not-italic font-bold">{proj.title}</span>
                                    </div>
                                    <p className="mt-0.5 text-[11px] italic leading-tight text-gray-700">{proj.description || proj.desc}</p>
                                    {proj.link && <a href={proj.link} className="text-[10px] text-blue-700 hover:underline">Project Link</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black mb-2 pb-0.5">EDUCATION</h2>
                        <div className="space-y-3">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline font-bold italic">
                                        <div className="flex flex-col text-black">
                                            <span className="not-italic font-bold">{edu.school}</span>
                                            <span className="text-[11px] font-medium">{edu.degree}</span>
                                        </div>
                                        <div className="text-right flex flex-col text-black">
                                            <span>
                                                {edu.end ? new Date(edu.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present'}
                                            </span>
                                            {edu.location && <span className="text-[10px] font-normal italic">{edu.location}</span>}
                                        </div>
                                    </div>
                                    {edu.details && <p className="mt-1 ml-4 text-[11px] text-gray-700 italic">{edu.details}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Certifications */}
                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black mb-2 pb-0.5">CERTIFICATIONS, SKILLS & INTERESTS</h2>
                    <ul className="ml-4 list-disc space-y-1 text-[11px]">
                        {certifications?.length > 0 && (
                            <li>
                                <span className="font-bold">Certifications: </span>
                                <span>{certifications.map(c => `${c.name}${c.issuer ? ` (${c.issuer})` : ''}${c.year ? `, ${c.year}` : ''}`).join('; ')}</span>
                            </li>
                        )}
                        {skills?.length > 0 && (
                            <li>
                                <span className="font-bold">Technologies & Skills: </span>
                                <span>{skills.map(s => typeof s === 'string' ? s : s.name).join('; ')}</span>
                            </li>
                        )}
                        {profile?.interests && (
                            <li>
                                <span className="font-bold">Interests: </span>
                                <span>{profile.interests}</span>
                            </li>
                        )}
                        {profile?.languages && (
                            <li>
                                <span className="font-bold">Languages: </span>
                                <span>{profile.languages}</span>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
        </div>
    );
}
