import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Linkedin, Github, Youtube, Twitter } from "lucide-react";

export default function Template3({ data, id }) {
    const { profile, experience, education, skills, projects, certifications, social } = data;

    // Helper for hex colors (Blue-ish purple from image)
    const primaryColor = "#4c1d95"; // deep violet/indigo
    const dividerColor = "#4c1d95";

    return (
        <div id={id || "resume-preview"} className="w-[210mm] min-h-[297mm] mx-auto bg-[#ffffff] p-[15mm] text-[#1f2937] font-sans text-xs leading-normal">

            {/* Header */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-1" style={{ color: primaryColor }}>{profile?.name || "Your Name"}</h1>
                <p className="text-sm font-semibold text-[#374151] mb-4">{profile?.title || "Your Title"}</p>

                {/* Contact Bar */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-b-2 py-2" style={{ borderColor: primaryColor }}>
                    <div className="font-bold text-[#374151] mr-2">CONTACT</div>

                    {profile?.phone && (
                        <div className="flex flex-col">
                            <span className="font-bold text-[10px] text-[#6b7280]">Phone</span>
                            <span>{profile.phone}</span>
                        </div>
                    )}
                    {profile?.email && (
                        <div className="flex flex-col">
                            <span className="font-bold text-[10px] text-[#6b7280]">Email</span>
                            <span>{profile.email}</span>
                        </div>
                    )}
                    {profile?.location && (
                        <div className="flex flex-col">
                            <span className="font-bold text-[10px] text-[#6b7280]">Address</span>
                            <span>{profile.location}</span>
                        </div>
                    )}
                    {profile?.linkedin && (
                        <div className="flex flex-col">
                            <span className="font-bold text-[10px] text-[#6b7280]">LinkedIn</span>
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn Profile</a>
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-6">

                {/* Profile / Summary */}
                {(profile?.summary || profile?.about) && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>Profile</h2>
                        </div>
                        <div className="col-span-9">
                            <p className="text-justify leading-relaxed">{profile.summary || profile.about}</p>
                        </div>
                    </div>
                )}

                {/* Employment History */}
                {experience?.length > 0 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>Employment History</h2>
                        </div>
                        <div className="col-span-9 space-y-4">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold">{exp.role}</h3>
                                        <span className="font-bold text-[#374151]">{exp.company}, {exp.location || "Location"}</span>
                                    </div>
                                    <div className="text-[10px] text-[#6b7280] mb-2 font-medium">
                                        {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} -
                                        {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                    </div>
                                    <p className="whitespace-pre-line leading-relaxed">{exp.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>Education</h2>
                        </div>
                        <div className="col-span-9 space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <div className="font-bold">{edu.degree}</div>
                                    <div className="text-[#374151]">{edu.school}</div>
                                    <div className="text-[10px] text-[#6b7280]">
                                        {edu.start ? new Date(edu.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} -
                                        {edu.end ? new Date(edu.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Skills */}
                {skills?.length > 0 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>Skills</h2>
                        </div>
                        <div className="col-span-9">
                            <div className="flex flex-wrap gap-x-8 gap-y-2">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex flex-col w-[45%]">
                                        <span className="font-medium">{typeof skill === 'string' ? skill : skill.name}</span>
                                        {/* Fake bar for visual effect */}
                                        <div className="h-1 w-full bg-[#f3f4f6] mt-1 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#4c1d95]" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Socials / Links */}
                {(social?.length > 0 || projects?.length > 0) && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>Links & Projects</h2>
                        </div>
                        <div className="col-span-9 space-y-2">
                            {social?.map((s, i) => (
                                <div key={i} className="flex gap-2">
                                    <span className="font-bold text-[#374151]">{s.network}:</span>
                                    <a href={s.url} className="text-[#2563eb] hover:underline">{s.url}</a>
                                </div>
                            ))}
                            {projects?.map((p, i) => (
                                <div key={i} className="mt-2">
                                    <div className="font-bold">{p.title}</div>
                                    <p className="text-[10px]">{p.description}</p>
                                    {p.link && <a href={p.link} className="text-[#2563eb] hover:underline text-[10px]">{p.link}</a>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
