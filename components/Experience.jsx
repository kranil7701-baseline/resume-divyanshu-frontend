import { useState, useEffect } from "react";

export default function Experience({ data, onSave, isSaving }) {
  const empty = () => ({
    id: Date.now() + Math.random(),
    role: "",
    company: "",
    start: "",
    end: "",
    details: "",
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
    setRows((r) =>
      r.map((x) => (x.id === id ? { ...x, [key]: val } : x))
    );

  const handleSave = () => {
    // Strip UI-only IDs
    const payload = rows.map(({ id, _id, createdAt, updatedAt, userId, ...rest }) => rest);
    onSave('experience', payload);
  };

  return (
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Experience</h2>

      <div className="space-y-6">
        {rows.map((r) => (
          <div
            key={r.id}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition group"
          >
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

              {/* Role */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-gray-600 mb-1 font-medium">Role</label>
                <input
                  className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  placeholder="Software Developer"
                  value={r.role}
                  onChange={(e) => update(r.id, "role", e.target.value)}
                />
              </div>

              {/* Company */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-gray-600 mb-1 font-medium">Company</label>
                <input
                  className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  placeholder="Company name"
                  value={r.company}
                  onChange={(e) => update(r.id, "company", e.target.value)}
                />
              </div>

              {/* Dates */}
              <div className="flex flex-col md:col-span-2 gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 flex flex-col">
                    <label className="text-gray-600 mb-1 font-medium">Start</label>
                    <input
                      type="date"
                      className="p-3 w-full rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
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

                  <div className="flex-1 flex flex-col">
                    <label className="text-gray-600 mb-1 font-medium">End</label>
                    <input
                      type="date"
                      className="p-3 w-full rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
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
              </div>

              {/* Details */}
              <div className="flex flex-col md:col-span-6">
                <label className="text-gray-600 mb-1 font-medium">
                  Details / Responsibilities
                </label>
                <textarea
                  className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  rows={3}
                  placeholder="Describe your responsibilities..."
                  value={r.details}
                  onChange={(e) => update(r.id, "details", e.target.value)}
                />
              </div>
            </div>

            {/* Remove Button */}
            <div className="flex justify-end mt-4">
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
      < div className="mt-8 flex gap-4" >
        <button
          onClick={add}
          className="px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
        >
          + Add Experience
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition ml-auto"
        >
          {isSaving ? "Saving..." : "Save Experience"}
        </button>
      </div>
    </section>
  );
}
