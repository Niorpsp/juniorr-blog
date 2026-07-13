import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    setSent(true);
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm text-slate-500">Reset password</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          Send password reset link
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Email address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2"
            />
          </div>
          <Button
            onClick={handleReset}
            className="rounded-full px-5 py-3"
            size="lg"
          >
            <Password size={16} /> Send reset link
          </Button>
          {sent && (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>Reset link sent to {email}</span>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-950">Need help?</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use this section to simulate a password reset flow. In a real admin
            panel, this would notify the user with an email.
          </p>
        </div>
      </div>
    </div>
  );
}
