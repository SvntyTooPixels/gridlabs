"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import clsx from "clsx";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AMOUNTS = [500, 1000, 2500, 5000];

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount =
      selectedAmount === "custom" ? parseInt(customAmount) : selectedAmount;
    console.log("Donation Submitting:", { amount, name, email });
    // TODO: Add actual payment gateway integration here
    alert(`Thank you for your generous pledge of ₹${amount}!`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg my-auto rounded-3xl bg-white shadow-2xl overflow-hidden shadow-2xl"
            >
              {/* Decorative Header */}
              <div className="relative overflow-hidden bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] px-8 py-10 text-center text-white">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Make an Impact
                  </h2>
                  <p className="mt-2 text-white/90">
                    Your contribution helps us create a better place.
                  </p>
                </div>
                {/* Abstract shapes */}
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-white transition-colors hover:bg-black/20"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-700">
                      Select Amount (₹)
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {AMOUNTS.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className={clsx(
                            "rounded-xl border py-3 text-center font-semibold transition-all",
                            selectedAmount === amount
                              ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600"
                              : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50",
                          )}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <div className="flex items-center">
                      <div className="flex-1 border-t border-slate-200" />
                      <span className="px-4 text-xs font-medium uppercase text-slate-400">
                        Or Custom Amount
                      </span>
                      <div className="flex-1 border-t border-slate-200" />
                    </div>
                    <div className="mt-4 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount("custom");
                        }}
                        className={clsx(
                          "w-full rounded-xl border py-3 pl-8 pr-4 outline-none transition-all",
                          selectedAmount === "custom"
                            ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                            : "border-slate-200 bg-slate-50/50 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400",
                        )}
                      />
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <MagneticButton strength={10} className="w-full h-full">
                      <button
                        type="submit"
                        disabled={
                          !name ||
                          !email ||
                          (selectedAmount === "custom" && !customAmount)
                        }
                        className="w-full rounded-xl bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] py-4 text-center font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
                      >
                        Proceed to Donate{" "}
                        {selectedAmount === "custom" && customAmount
                          ? `₹${customAmount}`
                          : selectedAmount !== "custom"
                            ? `₹${selectedAmount}`
                            : ""}
                      </button>
                    </MagneticButton>
                  </div>
                  
                  <p className="text-center text-xs text-slate-500">
                    Secure payment processing powered by our partners.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
