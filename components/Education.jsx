// components/Education.js
import { useState, useEffect } from "react";

export default function Education({ data, onSave, isSaving }) {
  const empty = () => ({
    id: Date.now() + Math.random(),
    school: "",
    degree: "",
    start: "",
    end: "",
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
    <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <h2 className="text-3xl font-bold mb-6 text-white relative z-10">Education</h2>

      <div className="space-y-6">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end p-6 bg-slate-800/40 border border-white/5 rounded-2xl shadow-sm hover:border-white/10 transition group relative z-10">

            <input
              className="p-3.5 rounded-xl bg-slate-900/50 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
              placeholder="School / University"
              value={r.school}
              onChange={(e) => update(r.id, "school", e.target.value)}
            />

            <input
              className="p-3.5 rounded-xl bg-slate-900/50 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
              placeholder="Degree"
              value={r.degree}
              onChange={(e) => update(r.id, "degree", e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-3 md:col-span-2">
              <div className="flex-1">
                <label className="text-xs text-slate-400 ml-1 mb-1 block">Start Date</label>
                <input
                  type="date"
                  className="p-3.5 w-full rounded-xl bg-slate-900/50 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [color-scheme:dark]"
                  value={(() => {
                    if (!r.start) return '';
                    try {
                      return new Date(r.start).toISOString().split('T')[0];
                    } catch (e) {
                      return '';
                    }
                  })()}
                  onChange={(e) => update(r.id, "start", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-400 ml-1 mb-1 block">End Date</label>
                <input
                  type="date"
                  className="p-3.5 w-full rounded-xl bg-slate-900/50 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [color-scheme:dark]"
                  value={(() => {
                    if (!r.end) return '';
                    try {
                      return new Date(r.end).toISOString().split('T')[0];
                    } catch (e) {
                      return '';
                    }
                  })()}
                  onChange={(e) => update(r.id, "end", e.target.value)}
                />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={() => remove(r.id)}
                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4 relative z-10">
        <button className="px-5 py-3 rounded-xl bg-slate-800 border border-white/10 text-slate-300 hover:bg-slate-700 hover:text-white transition shadow-lg" onClick={add}>
          + Add Education
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] ml-auto"
        >
          {isSaving ? "Saving..." : "Save Education"}
        </button>
      </div>
    </section>
  );
}
