"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    const emailValid = /\S+@\S+\.\S+/.test(form.email);
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    setSuccess("Message captured successfully. We will contact you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="section-shell gradient-mesh p-6">
      <span className="section-kicker">Let’s build together</span>
      <h3 className="mt-4 text-xl font-semibold text-slate-950">
        Contact Form
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Share your CSR goals and the team will respond with the next best step.
      </p>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm text-slate-700">
          Name
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="rounded-xl border border-white/50 bg-white/85 px-3 py-2 text-slate-900 outline-none ring-brand-300 focus:ring"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-700">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="rounded-xl border border-white/50 bg-white/85 px-3 py-2 text-slate-900 outline-none ring-brand-300 focus:ring"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-700">
          Message
          <textarea
            rows={5}
            value={form.message}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
            className="rounded-xl border border-white/50 bg-white/85 px-3 py-2 text-slate-900 outline-none ring-brand-300 focus:ring"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      {success ? (
        <p className="mt-4 text-sm text-emerald-300">{success}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-2xl bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Send Message"}
      </button>
    </form>
  );
}
