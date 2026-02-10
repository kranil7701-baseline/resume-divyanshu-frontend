import { useState, useEffect } from "react";

export default function Skills({ data, onSave, isSaving }) {
  // UI needs objects with IDs for list management, but data is array of strings
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setItems(data.map((skill, index) => ({ id: Date.now() + index, skill })));
    } else {
      setItems([{ id: Date.now(), skill: "" }]);
    }
  }, [data]);

  const add = () =>
    setItems((s) => [...s, { id: Date.now() + Math.random(), skill: "" }]);

  const remove = (id) =>
    setItems((s) => s.filter((x) => x.id !== id));

  const update = (id, value) =>
    setItems((s) =>
      s.map((x) => (x.id === id ? { ...x, skill: value } : x))
    );

  const handleSave = () => {
    // Convert back to array of strings for backend
    const skillsArray = items.map(i => i.skill).filter(Boolean);
    onSave('skills', skillsArray);
  };

  return (
    <section className="relative z-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Core Expertise</h2>
          <p className="text-xs text-slate-500 mt-1">List your technical skills, tools, and proficiencies.</p>
        </div>
        <button
          onClick={add}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 hover:text-white transition-all active:scale-95"
        >
          + Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it, idx) => (
          <div
            key={it.id}
            className="group flex items-center gap-3 p-1 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="h-10 w-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:text-indigo-400 transition-colors">
              {idx + 1}
            </div>
            <input
              className="flex-1 bg-transparent border-none text-white text-sm focus:ring-0 outline-none placeholder:text-slate-700"
              placeholder="e.g. React.js, Python, AWS..."
              value={it.skill}
              onChange={(e) => update(it.id, e.target.value)}
            />
            <button
              onClick={() => remove(it.id)}
              className="pr-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
          <p className="text-slate-600 text-sm">No skills added yet. Click the button above to start.</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-8 border-t border-white/5 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="group relative px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-[0.98] overflow-hidden"
        >
          <span className="relative z-10">{isSaving ? "Syncing..." : "Save Expertise"}</span>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
