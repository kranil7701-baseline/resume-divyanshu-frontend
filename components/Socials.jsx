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
        <section className="bg-slate-900/50 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="flex justify-between items-center mb-6 relative z-10">
                <div>
                    <h2 className="text-xl font-bold text-white">Social Profiles</h2>
                    <p className="text-slate-500 text-xs mt-0.5">Connect your online presence</p>
                </div>
                <button
                    onClick={addSocial}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    <Plus size={16} /> Add Profile
                </button>
            </div>

            <div className="space-y-3 relative z-10">
                {socials.map((item, index) => (
                    <div key={index} className="group bg-slate-800/40 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                            {/* Network */}
                            <div className="relative">
                                <div className="absolute left-2.5 top-2.5 text-slate-500 pointer-events-none">
                                    {getIcon(item.network)}
                                </div>
                                <input
                                    className="w-full pl-9 p-2 rounded-lg bg-slate-900/50 border border-white/10 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Network (e.g. GitHub)"
                                    value={item.network}
                                    onChange={(e) => updateSocial(index, "network", e.target.value)}
                                />
                            </div>

                            {/* URL */}
                            <div className="md:col-span-2 flex gap-2">
                                <input
                                    className="flex-1 p-2 rounded-lg bg-slate-900/50 border border-white/10 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Profile URL (https://...)"
                                    value={item.url}
                                    onChange={(e) => updateSocial(index, "url", e.target.value)}
                                />
                                <button
                                    onClick={() => removeSocial(index)}
                                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-colors"
                                    title="Remove"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                        </div>
                    </div>
                ))}

                {socials.length === 0 && (
                    <div className="text-center py-6 bg-slate-800/20 rounded-xl border border-dashed border-slate-700">
                        <LinkIcon size={32} className="mx-auto text-slate-600 mb-2 opacity-50" />
                        <p className="text-slate-500 text-xs">No social profiles added yet.</p>
                    </div>
                )}
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end relative z-10">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </section>
    );
}
