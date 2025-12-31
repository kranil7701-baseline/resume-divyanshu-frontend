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
    <section className="bg-slate-900/50 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <h2 className="text-xl font-bold mb-4 text-white relative z-10">Skills</h2>

      <div className="space-y-3">
        {items.map((it, idx) => (
          <div
            key={it.id}
            className="flex items-center gap-3 p-3 bg-slate-800/40 border border-white/5 rounded-xl shadow-sm hover:border-white/10 transition group relative z-10"
          >
            <input
              className="flex-1 p-2 rounded-lg bg-slate-900/50 border border-white/10 text-white text-sm hover:bg-slate-900 focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-600"
              placeholder={`Skill ${idx + 1}`}
              value={it.skill}
              onChange={(e) => update(it.id, e.target.value)}
            />

            <button
              onClick={() => remove(it.id)}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 hover:text-red-300 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3 relative z-10">
        <button
          onClick={add}
          className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-slate-300 text-sm font-medium hover:bg-slate-700 hover:text-white transition shadow-lg"
        >
          + Add Skill
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] ml-auto"
        >
          {isSaving ? "Saving..." : "Save Skills"}
        </button>
      </div>
    </section>
  );
}
