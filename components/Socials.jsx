import { useState, useEffect } from "react";
import { Plus, Trash2, Github, Linkedin, Youtube, Link as LinkIcon, Twitter } from "lucide-react";

export default function SocialsSection({ data, onSave, isSaving }) {
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        if (data) {
            // Ensure data is array
            setSocials(Array.isArray(data) ? data : []);
        }
    }, [data]);

    const addSocial = () => {
        setSocials([...socials, { network: "", username: "", url: "" }]);
    };

    const updateSocial = (index, field, value) => {
        const updated = [...socials];
        updated[index] = { ...updated[index], [field]: value };
        setSocials(updated);
    };

    const removeSocial = (index) => {
        setSocials(socials.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave('social', socials);
    };

    const getIcon = (network) => {
        const lower = network.toLowerCase();
        if (lower.includes('github')) return <Github size={18} />;
        if (lower.includes('linkedin')) return <Linkedin size={18} />;
        if (lower.includes('youtube')) return <Youtube size={18} />;
        if (lower.includes('twitter') || lower.includes('x')) return <Twitter size={18} />;
        return <LinkIcon size={18} />;
    };

    return (
        <section className="relative z-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Social Presence</h2>
                    <p className="text-xs text-slate-500 mt-1">Connect your professional profiles, portfolios, and social accounts.</p>
                </div>
                <button
                    onClick={addSocial}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 hover:text-white transition-all active:scale-95 flex items-center gap-2"
                >
                    <Plus size={14} /> Add Profile
                </button>
            </div>

            <div className="space-y-4">
                {socials.map((item, index) => (
                    <div
                        key={index}
                        className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            {/* Network */}
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-400 transition-colors">
                                    {getIcon(item.network)}
                                </div>
                                <input
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
                                    placeholder="Network (e.g. GitHub)"
                                    value={item.network}
                                    onChange={(e) => updateSocial(index, "network", e.target.value)}
                                />
                            </div>

                            {/* URL */}
                            <div className="flex gap-3">
                                <input
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                                    placeholder="Profile Link (https://...)"
                                    value={item.url}
                                    onChange={(e) => updateSocial(index, "url", e.target.value)}
                                />
                                <button
                                    onClick={() => removeSocial(index)}
                                    className="p-2.5 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {socials.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                    <LinkIcon size={32} className="mx-auto text-slate-700 mb-4 opacity-30" />
                    <p className="text-slate-600 text-sm">No social profiles connected yet. Start building your network.</p>
                </div>
            )}

            {/* Action Footer */}
            <div className="pt-8 border-t border-white/5 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="group relative px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-[0.98] overflow-hidden"
                >
                    <span className="relative z-10">{isSaving ? "Syncing..." : "Update Socials"}</span>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </button>
            </div>
        </section>
    );
}
