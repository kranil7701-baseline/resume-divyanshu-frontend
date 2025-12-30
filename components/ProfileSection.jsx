import { useState, useEffect } from "react";

export default function ProfileSection({ data, onSave, isSaving }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    about: ""
  });

  useEffect(() => {
    if (data) {
      setForm(prev => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleSave = () => {
    onSave('profile', form);
  };

  return (
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Profile Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">Full Name</label>
          <input
            className="p-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            placeholder="John Doe"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">Title</label>
          <input
            className="p-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            placeholder="Frontend Developer"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-600 mb-1 font-medium">Email</label>
          <input
            className="p-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            placeholder="email@example.com"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* About */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-600 mb-1 font-medium">About You</label>
          <textarea
            className="p-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            rows={4}
            placeholder="Short bio..."
            value={form.about || ""}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
        >
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </section>
  );
}
