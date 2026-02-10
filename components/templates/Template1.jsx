import React from "react";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, ExternalLink, Github, Youtube, Twitter } from "lucide-react";

export default function Template1({ data, id, font = 'font-sans', color = '#2563eb' }) {
    const { profile, experience, education, skills, projects, certifications, social } = data;

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

    const sectionTitleStyle = {
        color: color,
        borderColor: color
    };

    return (
        <div
            id={id || "resume-preview"}
            className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[15mm] text-[#1f2937] leading-normal overflow-hidden"
            style={{ fontFamily: activeFontFamily }}
        >
            {/* Header */}
            <header className="mb-10 text-center">
                <h1 className="text-5xl font-black uppercase tracking-tight text-[#111827] mb-2" style={{ color: color }}>
                    {profile?.name || "Your Name"}
                </h1>
                <p className="text-xl font-medium text-[#4b5563] tracking-widest uppercase mb-6">{profile?.title || "Professional Role"}</p>

                <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {profile?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={10} style={{ color }} />
                            <span>{profile.phone}</span>
                        </div>
                    )}
                    {profile?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={10} style={{ color }} />
                            <span>{profile.email}</span>
                        </div>
                    )}
                    {profile?.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={10} style={{ color }} />
                            <span>{profile.location}</span>
                        </div>
                    )}
                    {profile?.website && (
                        <div className="flex items-center gap-1.5">
                            <LinkIcon size={10} style={{ color }} />
                            <a href={profile.website} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
                {/* Main Content */}
                <div className="col-span-8 space-y-10">
                    {/* Profile */}
                    {(profile?.summary || profile?.about) && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 border-b-2 pb-1" style={sectionTitleStyle}>
                                Professional Profile
                            </h2>
                            <p className="text-slate-700 text-[11px] leading-relaxed text-justify italic opacity-90">
                                "{profile.summary || profile.about}"
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 border-b-2 pb-1" style={sectionTitleStyle}>
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id || Math.random()} className="relative">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-[#111827] text-sm uppercase tracking-tight">{exp.role}</h3>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100 italic">
                                                {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                                {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                            </span>
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">{exp.company}</div>
                                        <div className="text-slate-600 text-[11px] leading-relaxed whitespace-pre-line pl-2 border-l-2 border-slate-100">
                                            {exp.details}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 border-b-2 pb-1" style={sectionTitleStyle}>
                                Featured Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {projects.map((project) => (
                                    <div key={project.id || Math.random()}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-800 text-[12px] uppercase">
                                                {project.title}
                                            </h3>
                                            {project.link && (
                                                <a href={project.link} target="_blank" className="text-slate-400 hover:text-indigo-600">
                                                    <ExternalLink size={10} />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-slate-600 text-[11px] leading-relaxed">{project.description || project.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-10">
                    {/* Skills */}
                    {skills?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 border-b-2 pb-1" style={sectionTitleStyle}>
                                Expertise
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="text-[10px] font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200"
                                    >
                                        {typeof skill === 'string' ? skill : skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 border-b-2 pb-1" style={sectionTitleStyle}>
                                Education
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id || Math.random()}>
                                        <h3 className="font-bold text-slate-800 text-[11px] uppercase leading-tight mb-1">{edu.school}</h3>
                                        <div className="text-[11px] text-slate-500 font-medium mb-1">{edu.degree}</div>
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic">
                                            {edu.start ? new Date(edu.start).getFullYear() : ''} —
                                            {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Socials */}
                    {social?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 border-b-2 pb-1" style={sectionTitleStyle}>
                                Social Connections
                            </h2>
                            <div className="space-y-3">
                                {social.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 group"
                                    >
                                        <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 group-hover:text-indigo-600 transition-colors">
                                            {getSocialIcon(item.network)}
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-500 group-hover:underline">{item.network}</span>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
