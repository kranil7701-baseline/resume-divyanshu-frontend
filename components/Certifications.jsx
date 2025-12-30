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
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Certifications</h2>

      <div className="space-y-6">
        {rows.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition group"
          >
            <input
              className="md:col-span-2 p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="Certification name"
              value={r.name}
              onChange={(e) => update(r.id, "name", e.target.value)}
            />

            <input
              className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="Issuer / Organization"
              value={r.issuer}
              onChange={(e) => update(r.id, "issuer", e.target.value)}
            />

            <input
              className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="Year"
              value={r.year}
              onChange={(e) => update(r.id, "year", e.target.value)}
            />

            <div className="md:col-span-4 flex justify-end">
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
        <button
          onClick={add}
          className="px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
        >
          + Add Certification
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition ml-auto"
        >
          {isSaving ? "Saving..." : "Save Certifications"}
        </button>
      </div>
    </section>
  );
}
