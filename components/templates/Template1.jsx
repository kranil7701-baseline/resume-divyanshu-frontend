import React from "react";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, ExternalLink, Github, Youtube, Twitter } from "lucide-react";

export default function Template1({ data, id }) {
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
        <div id={id || "resume-preview"} className="w-[210mm] h-[297mm] mx-auto bg-[#ffffff] p-[5mm] text-[#1f2937] font-sans text-xs leading-normal overflow-hidden">

            {/* Header / Name Block */}
            <header className="border-b-4 border-[#374151] pb-6 mb-8">
                <h1 className="text-4xl font-extrabold uppercase tracking-widest text-[#111827] mb-2">{profile?.name || "Your Name"}</h1>
                <p className="text-lg font-medium text-[#4b5563] uppercase tracking-wide">{profile?.title || ""}</p>
            </header>

            <div className="grid grid-cols-12 gap-8">

                {/* Left Column (35%) */}
                <div className="col-span-4 space-y-8">

                    {/* Contact */}
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#111827] mb-4 border-b border-[#e5e7eb] pb-2">Contact</h2>
                        <div className="space-y-3 text-xs">
                            {profile?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-[#4b5563]" />
                                    <span>{profile.phone}</span>
                                </div>
                            )}
                            {profile?.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-[#4b5563]" />
                                    <span className="break-all">{profile.email}</span>
                                </div>
                            )}
                            {profile?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-[#4b5563]" />
                                    <span>{profile.location}</span>
                                </div>
                            )}
                            {/* Socials */}
                            {social && social.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-[#4b5563]">{getSocialIcon(item.network)}</span>
                                    <a href={item.url} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb]">{item.network}</a>
                                </div>
                            ))}
                            {/* Web */}
                            {profile?.website && (
                                <div className="flex items-center gap-2">
                                    <LinkIcon size={14} className="text-[#4b5563]" />
                                    <a href={profile.website} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb]">Portfolio</a>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    {skills?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[#111827] mb-4 border-b border-[#e5e7eb] pb-2">Skills</h2>
                            <ul className="space-y-2 text-xs">
                                {skills.map((skill, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#374151] rounded-full" />
                                        <span>{typeof skill === 'string' ? skill : skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Education (Moved to Left for Balance in this layout) */}
                    {education?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[#111827] mb-4 border-b border-[#e5e7eb] pb-2">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id || Math.random()}>
                                        <h3 className="font-bold text-[#111827] text-xs">{edu.school}</h3>
                                        <div className="text-xs text-[#4b5563] mb-1">{edu.degree}</div>
                                        <div className="text-[10px] text-[#6b7280] italic">
                                            {edu.start ? new Date(edu.start).getFullYear() : ''} -
                                            {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}


                </div>

                {/* Right Column (65%) */}
                <div className="col-span-8 space-y-8">
                    {/* Profile */}
                    {(profile?.summary || profile?.about) && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[#111827] mb-4 border-b border-[#e5e7eb] pb-2">Profile</h2>
                            <p className="text-[#374151] text-xs leading-relaxed text-justify">{profile.summary || profile.about}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[#111827] mb-4 border-b border-[#e5e7eb] pb-2">Work Experience</h2>
                            <div className="space-y-6">
                                {experience.map((exp) => (
                                    <div key={exp.id || Math.random()}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-[#111827]">{exp.role}</h3>
                                            <span className="text-xs text-[#6b7280] font-medium whitespace-nowrap">
                                                {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} -
                                                {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                            </span>
                                        </div>
                                        <div className="text-xs font-bold text-[#4b5563] mb-2">{exp.company}</div>
                                        <p className="text-[#374151] whitespace-pre-line text-xs leading-relaxed">{exp.details}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[#111827] mb-4 border-b border-[#e5e7eb] pb-2">Projects</h2>
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.id || Math.random()}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-[#111827] flex items-center gap-2">
                                                {project.title}
                                                {project.link && <a href={project.link} target="_blank" className="text-[#2563eb]"><ExternalLink size={10} /></a>}
                                            </h3>
                                        </div>
                                        <p className="text-[#374151] text-xs leading-relaxed">{project.description || project.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
}
