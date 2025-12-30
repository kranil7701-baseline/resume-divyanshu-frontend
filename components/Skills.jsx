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
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Skills</h2>

      <div className="space-y-4">
        {items.map((it, idx) => (
          <div
            key={it.id}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition group"
          >
            <input
              className="flex-1 p-3 rounded-lg bg-gray-50 border border-transparent hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              placeholder={`Skill ${idx + 1}`}
              value={it.skill}
              onChange={(e) => update(it.id, e.target.value)}
            />

            <button
              onClick={() => remove(it.id)}
              className="px-4 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={add}
          className="px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
        >
          + Add Skill
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition ml-auto"
        >
          {isSaving ? "Saving..." : "Save Skills"}
        </button>
      </div>
    </section>
  );
}
