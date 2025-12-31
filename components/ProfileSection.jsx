import { useState, useEffect } from "react";

export default function ProfileSection({ data, onSave, isSaving }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    about: ""
  });

  useEffect(() => {
    if (data) {
      setForm(prev => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleSave = () => {
    onSave('profile', form);
  };

  return (
    <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <h2 className="text-3xl font-bold mb-6 text-white relative z-10">Profile Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-slate-300 mb-2 font-medium ml-1">Full Name</label>
          <input
            className="p-3.5 rounded-xl bg-slate-800/80 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-500 hover:bg-slate-800"
            placeholder="John Doe"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-slate-300 mb-2 font-medium ml-1">Title</label>
          <input
            className="p-3.5 rounded-xl bg-slate-800/80 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-500 hover:bg-slate-800"
            placeholder="Frontend Developer"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-slate-300 mb-2 font-medium ml-1">Email</label>
          <input
            className="p-3.5 rounded-xl bg-slate-800/80 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-500 hover:bg-slate-800"
            placeholder="email@example.com"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* About */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-slate-300 mb-2 font-medium ml-1">About You</label>
          <textarea
            className="p-3.5 rounded-xl bg-slate-800/80 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-500 hover:bg-slate-800 resize-none"
            rows={4}
            placeholder="Short bio..."
            value={form.about || ""}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </section>
  );
}
