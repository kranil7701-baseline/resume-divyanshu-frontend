import React from "react";
import { Mail, Phone, Link as LinkIcon, Linkedin, Github, Youtube, Twitter } from "lucide-react";

export default function Template2({ data, id }) {
    const { profile, experience, education, skills, projects, certifications, social } = data;

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
        <div id={id || "resume-preview"} className="w-[210mm] h-[297mm] mx-auto bg-[#ffffff] p-[5mm] text-[#000000] font-serif text-xs leading-normal overflow-hidden">

            {/* Header: Centered, Minimal */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-[#000000] mb-2 font-sans tracking-tight">{profile?.name || "Your Name"}</h1>

                <div className="flex justify-center flex-wrap gap-3 text-xs text-[#000000] border-b border-[#000000] pb-4">
                    {profile?.location && <span>{profile.location}</span>}
                    {profile?.email && <span>| {profile.email}</span>}
                    {profile?.phone && <span>| {profile.phone}</span>}
                    {profile?.linkedin && <span>| LinkedIn</span>}
                    {social && social.map((s, i) => (
                        <span key={i} className="flex items-center gap-2 text-[#2563eb]">
                            {(() => {
                                const lower = s.network?.toLowerCase() || '';
                                if (lower.includes('github')) return <Github size={12} />;
                                if (lower.includes('linkedin')) return <Linkedin size={12} />;
                                if (lower.includes('youtube')) return <Youtube size={12} />;
                                if (lower.includes('twitter')) return <Twitter size={12} />;
                                return <LinkIcon size={12} />;
                            })()}
                            <a href={s.url} target="_blank" rel="noreferrer" className="hover:underline">{s.network}</a>
                        </span>
                    ))}

                </div>

                {/* Brief Headline */}
                {profile?.title && <p className="text-center italic mt-3 text-[#333333]">{profile.title}</p>}
            </header>

            {/* Top Skills (Just below header, horizontal list) */}
            {skills?.length > 0 && (
                <section className="mb-6 text-center">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-[#dddddd] mb-2 pb-1 inline-block">Core Competencies</h2>
                    <div className="flex flex-wrap justify-center gap-2 text-xs">
                        {skills.map((skill, index) => (
                            <span key={index} className="font-semibold">
                                {typeof skill === 'string' ? skill : skill.name}{index < skills.length - 1 ? " • " : ""}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-4">Work Experience</h2>
                    <div className="space-y-5">
                        {experience.map((exp) => (
                            <div key={exp.id || Math.random()}>
                                <div className="flex justify-between font-bold text-sm">
                                    <span>{exp.company}, {exp.location || "Location"}</span>
                                    <span>
                                        {exp.start ? new Date(exp.start).getFullYear() : ''} -
                                        {exp.end ? new Date(exp.end).getFullYear() : 'Present'}
                                    </span>
                                </div>
                                <div className="italic text-xs mb-1 font-bold">{exp.role}</div>
                                <p className="text-xs text-justify leading-relaxed">{exp.details}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-4">Key Projects</h2>
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.id || Math.random()}>
                                <div className="font-bold text-xs">{project.title}</div>
                                <p className="text-xs text-justify">{project.description || project.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <section className="mb-6 text-center">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Education</h2>
                    <div className="space-y-2">
                        {education.map((edu) => (
                            <div key={edu.id || Math.random()}>
                                <div className="font-bold text-xs">{edu.degree}</div>
                                <div className="text-xs italic">{edu.school} | {edu.start ? new Date(edu.start).getFullYear() : ''} - {edu.end ? new Date(edu.end).getFullYear() : 'Present'}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
}
