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
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Education</h2>

      <div className="space-y-6">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition group">

            <input
              className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="School / University"
              value={r.school}
              onChange={(e) => update(r.id, "school", e.target.value)}
            />

            <input
              className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="Degree"
              value={r.degree}
              onChange={(e) => update(r.id, "degree", e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-3 md:col-span-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1">Start Date</label>
                <input
                  type="date"
                  className="p-3 w-full rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
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
                <label className="text-xs text-gray-500 ml-1">End Date</label>
                <input
                  type="date"
                  className="p-3 w-full rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
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
                className="px-4 py-2 rounded-xl bg-red-50 text-red-500 border border-transparent hover:bg-red-100 hover:text-red-700 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button className="px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition" onClick={add}>
          + Add Education
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition ml-auto"
        >
          {isSaving ? "Saving..." : "Save Education"}
        </button>
      </div>
    </section>
  );
}
