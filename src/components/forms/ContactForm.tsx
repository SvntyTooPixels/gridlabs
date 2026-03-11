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
    <form onSubmit={handleSubmit} className="glass-panel p-6">
      <h3 className="text-xl font-semibold text-white">Contact Form</h3>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm text-slate-300">
          Name
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="rounded-lg border border-white/20 bg-slate-950 px-3 py-2 text-white outline-none ring-brand-400 focus:ring"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="rounded-lg border border-white/20 bg-slate-950 px-3 py-2 text-white outline-none ring-brand-400 focus:ring"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Message
          <textarea
            rows={5}
            value={form.message}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
            className="rounded-lg border border-white/20 bg-slate-950 px-3 py-2 text-white outline-none ring-brand-400 focus:ring"
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
        className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Send Message"}
      </button>
    </form>
  );
}
