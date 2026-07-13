import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Upload, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfileManagement() {
  const { profile, onUpdateProfile } = useOutletContext();
  const [form, setForm] = useState(profile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateProfile(form);
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm text-slate-500">Profile</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          Manage profile
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Name
            </label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Email
            </label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Profile picture URL
            </label>
            <Input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className="mt-2"
            />
          </div>
          <Button
            onClick={handleSave}
            className="rounded-full px-5 py-3"
            size="lg"
          >
            <Save size={16} /> Save profile
          </Button>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-center">
          <img
            src={form.avatar}
            alt={form.name}
            className="mx-auto h-32 w-32 rounded-full object-cover"
          />
          <p className="mt-4 text-lg font-semibold text-slate-950">
            {form.name}
          </p>
          <p className="mt-1 text-sm text-slate-600">{form.email}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            <Upload size={16} /> Upload photo
          </div>
        </div>
      </div>
    </div>
  );
}
