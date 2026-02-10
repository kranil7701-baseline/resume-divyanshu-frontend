// components/Certifications.js
import { useState, useEffect } from "react";

export default function Certifications({ data, onSave, isSaving }) {
  const empty = () => ({
    id: Date.now() + Math.random(),
    name: "",
    issuer: "",
    year: "",
  });

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setRows(data.map(item => ({ ...item, id: item._id || item.id || Date.now() + Math.random() })));
    } else {
      setRows([empty()]);
    }
  }, [data]);

  const add = () => setRows((r) => [...r, empty()]);
  const remove = (id) => setRows((r) => r.filter((x) => x.id !== id));
  const update = (id, key, val) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, [key]: val } : x)));

  const handleSave = () => {
    const payload = rows.map(({ id, _id, createdAt, updatedAt, userId, ...rest }) => rest);
    onSave('certifications', payload);
  };

  return (
    <section className="relative z-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Recognitions & Awards</h2>
          <p className="text-xs text-slate-500 mt-1">List your professional certifications, awards, and honors.</p>
        </div>
        <button
          onClick={add}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 hover:text-white transition-all active:scale-95"
        >
          + Add Award
        </button>
      </div>

      <div className="space-y-6">
        {rows.map((r, idx) => (
          <div
            key={r.id}
            className="group relative p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Name */}
              <div className="space-y-2 lg:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Award / Certificate Name</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-700"
                  placeholder="e.g. AWS Certified Developer"
                  value={r.name}
                  onChange={(e) => update(r.id, "name", e.target.value)}
                />
              </div>

              {/* Issuer */}
              <div className="space-y-2 lg:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Issuing Organization</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-700"
                  placeholder="e.g. Amazon Web Services"
                  value={r.issuer}
                  onChange={(e) => update(r.id, "issuer", e.target.value)}
                />
              </div>

              {/* Year */}
              <div className="space-y-2 lg:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Year Received</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-700"
                  placeholder="e.g. 2023"
                  value={r.year}
                  onChange={(e) => update(r.id, "year", e.target.value)}
                />
              </div>
            </div>

            {/* Floating Remove Button */}
            <button
              onClick={() => remove(r.id)}
              className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
              title="Remove Entry"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
          <p className="text-slate-600 text-sm">No certifications listed yet. Share your achievements!</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-8 border-t border-white/5 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="group relative px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-[0.98] overflow-hidden"
        >
          <span className="relative z-10">{isSaving ? "Syncing..." : "Update Awards"}</span>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
