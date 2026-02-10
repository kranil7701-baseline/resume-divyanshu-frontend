// components/Education.js
import { useState, useEffect } from "react";

export default function Education({ data, onSave, isSaving }) {
  const empty = () => ({
    id: Date.now() + Math.random(),
    school: "",
    degree: "",
    start: "",
    end: "",
    grade: "",
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
    onSave('education', payload);
  };

  return (
    <section className="relative z-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Academic Background</h2>
          <p className="text-xs text-slate-500 mt-1">Detailed history of your schooling, degrees, and academic performance.</p>
        </div>
        <button
          onClick={add}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 hover:text-white transition-all active:scale-95"
        >
          + Add Education
        </button>
      </div>

      <div className="space-y-6">
        {rows.map((r, idx) => (
          <div
            key={r.id}
            className="group relative p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institution */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Institution Name</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-700"
                  placeholder="e.g. Stanford University or DPS School"
                  value={r.school}
                  onChange={(e) => update(r.id, "school", e.target.value)}
                />
              </div>

              {/* Degree */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Degree / Standard</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-700"
                  placeholder="e.g. B.Tech CS, 12th Standard, etc."
                  value={r.degree}
                  onChange={(e) => update(r.id, "degree", e.target.value)}
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all [color-scheme:dark]"
                    value={(() => {
                      if (!r.start) return '';
                      try { return new Date(r.start).toISOString().split('T')[0]; } catch (e) { return ''; }
                    })()}
                    onChange={(e) => update(r.id, "start", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all [color-scheme:dark]"
                    value={(() => {
                      if (!r.end) return '';
                      try { return new Date(r.end).toISOString().split('T')[0]; } catch (e) { return ''; }
                    })()}
                    onChange={(e) => update(r.id, "end", e.target.value)}
                  />
                </div>
              </div>

              {/* Grade */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">CGPA / Percentage</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-700"
                  placeholder="e.g. 9.5 CGPA or 88%"
                  value={r.grade || ""}
                  onChange={(e) => update(r.id, "grade", e.target.value)}
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
          <p className="text-slate-600 text-sm">No education records found. Share your academic history.</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-8 border-t border-white/5 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="group relative px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-[0.98] overflow-hidden"
        >
          <span className="relative z-10">{isSaving ? "Syncing..." : "Update Academic Records"}</span>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
