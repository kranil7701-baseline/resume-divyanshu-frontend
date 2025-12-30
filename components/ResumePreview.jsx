import React from "react";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, ExternalLink } from "lucide-react";

export default function ResumePreview({ data }) {
    const { profile, experience, education, skills, projects, certifications } = data;

    return (
        <div id="resume-preview" className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[15mm] shadow-2xl text-gray-800 text-sm leading-relaxed print:shadow-none print:w-full print:h-full print:p-0 print:m-0">

            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-6 mb-6">
                <h1 className="text-4xl font-extrabold uppercase tracking-widest text-gray-900 mb-2">{profile?.name || "Your Name"}</h1>
                <p className="text-lg font-medium text-gray-600 mb-4">{profile?.title || ""}</p>

                <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
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
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-200 pb-1">Professional Summary</h2>
                    <p className="text-gray-700 leading-relaxed text-justify">{profile.summary || profile.about}</p>
                </section>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-200 pb-1">Technical Skills</h2>
                    <div className="flex flex-wrap gap-y-2 gap-x-1">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-700">
                                {typeof skill === 'string' ? skill : skill.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-200 pb-1">Work Experience</h2>
                    <div className="space-y-5">
                        {experience.map((exp) => (
                            <div key={exp.id || Math.random()}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                        {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} -
                                        {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                    </span>
                                </div>
                                <div className="text-xs font-semibold text-gray-600 mb-2">{exp.company}</div>
                                <p className="text-gray-700 whitespace-pre-line text-xs leading-relaxed">{exp.details}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-200 pb-1">Projects</h2>
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.id || Math.random()}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-1">
                                        {project.title}
                                        {project.link && <a href={project.link} target="_blank" className="text-blue-600"><ExternalLink size={10} /></a>}
                                    </h3>
                                </div>
                                <p className="text-gray-700 text-xs leading-relaxed">{project.description || project.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-200 pb-1">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id || Math.random()}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{edu.school}</h3>
                                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                        {edu.start ? new Date(edu.start).getFullYear() : ''} -
                                        {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-600">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-200 pb-1">Certifications</h2>
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        {certifications.map((cert) => (
                            <li key={cert.id || Math.random()}>
                                <span className="font-semibold">{cert.name}</span> - <span className="text-gray-500">{cert.issuer}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

        </div>
    );
}
