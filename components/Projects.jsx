import { useState, useEffect } from "react";

export default function Projects({ data, onSave, isSaving }) {
  const empty = () => ({
    id: Date.now() + Math.random(),
    title: "",
    link: "",
    desc: "",
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
    const payload = rows.map(({ id, _id, createdAt, updatedAt, userId, ...rest }) => rest);
    onSave('projects', payload);
  };

  return (
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Projects</h2>

      <div className="space-y-6">
        {rows.map((r) => (
          <div
            key={r.id}
            className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition group"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Title */}
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1 font-medium">Title</label>
                <input
                  className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  placeholder="Project title"
                  value={r.title}
                  onChange={(e) => update(r.id, "title", e.target.value)}
                />
              </div>

              {/* Link */}
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1 font-medium">Link (optional)</label>
                <input
                  className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  placeholder="https://example.com"
                  value={r.link}
                  onChange={(e) => update(r.id, "link", e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1 font-medium">Short Description</label>
                <input
                  className="p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  placeholder="Brief summary..."
                  value={r.desc}
                  onChange={(e) => update(r.id, "desc", e.target.value)}
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
      <div className="mt-8 flex gap-4">
        <button
          onClick={add}
          className="px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
        >
          + Add Project
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition ml-auto"
        >
          {isSaving ? "Saving..." : "Save Projects"}
        </button>
      </div>
    </section>
  );
}
