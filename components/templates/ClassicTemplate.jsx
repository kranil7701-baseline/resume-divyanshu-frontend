import React from "react";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, ExternalLink } from "lucide-react";

export default function ClassicTemplate({ data }) {
    const { profile, experience, education, skills, projects, certifications } = data;

    return (
        <div id="resume-preview" className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[20mm]  text-gray-900 text-sm font-serif leading-relaxed print:w-full print:h-full print:p-0 print:m-0">

            {/* Header */}
            <header className="text-center border-b border-black pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wide text-black mb-1">{profile?.name || "Your Name"}</h1>
                <p className="text-base font-medium italic text-gray-700 mb-3">{profile?.title || ""}</p>

                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-800">
                    {profile?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{profile.email}</span>
                        </div>
                    )}
                    {profile?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{profile.phone}</span>
                        </div>
                    )}
                    {profile?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{profile.location}</span>
                        </div>
                    )}
                    {profile?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-3.5 h-3.5" />
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                        </div>
                    )}
                    {profile?.website && (
                        <div className="flex items-center gap-1">
                            <LinkIcon className="w-3.5 h-3.5" />
                            <a href={profile.website} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {(profile?.summary || profile?.about) && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-2 border-b border-gray-300 pb-1">Summary</h2>
                    <p className="text-gray-900 leading-normal text-justify">{profile.summary || profile.about}</p>
                </section>
            )}

            {/* EXPERIENCE */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-gray-300 pb-1">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id || Math.random()}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-black text-sm">{exp.role}</h3>
                                    <span className="text-xs text-gray-600 font-medium italic">
                                        {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} -
                                        {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                    </span>
                                </div>
                                <div className="text-xs font-semibold text-gray-800 mb-1">{exp.company}</div>
                                <p className="text-gray-900 whitespace-pre-line text-xs leading-normal">{exp.details}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* SKILLS */}
            {skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-2 border-b border-gray-300 pb-1">Technical Skills</h2>
                    <ul className="list-none flex flex-wrap gap-2 text-xs">
                        {skills.map((skill, index) => (
                            <li key={index} className="after:content-[','] last:after:content-[''] pr-1 font-medium text-gray-900">
                                {typeof skill === 'string' ? skill : skill.name}
                            </li>
                        ))}
                    </ul>
                </section>
            )}


            {/* PROJECTS */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-gray-300 pb-1">Projects</h2>
                    <div className="space-y-3">
                        {projects.map((project) => (
                            <div key={project.id || Math.random()}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-black flex items-center gap-1 text-sm">
                                        {project.title}
                                        {project.link && <a href={project.link} target="_blank" className="text-blue-800"><ExternalLink size={10} /></a>}
                                    </h3>
                                </div>
                                <p className="text-gray-900 text-xs leading-normal">{project.description || project.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* EDUCATION */}
            {education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-gray-300 pb-1">Education</h2>
                    <div className="space-y-3">
                        {education.map((edu) => (
                            <div key={edu.id || Math.random()}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-black text-sm">{edu.school}</h3>
                                    <span className="text-xs text-gray-600 font-medium italic">
                                        {edu.start ? new Date(edu.start).getFullYear() : ''} -
                                        {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-800 italic">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CERTIFICATIONS */}
            {certifications?.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-gray-300 pb-1">Certifications</h2>
                    <ul className="list-disc list-inside text-xs text-gray-900 space-y-1">
                        {certifications.map((cert) => (
                            <li key={cert.id || Math.random()}>
                                <span className="font-semibold">{cert.name}</span> - <span className="text-gray-600 italic">{cert.issuer}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

        </div>
    );
}
