import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import contact from "@/content/contact.json";

export function ContactPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <h1 className="section-title">Contact</h1>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.08} className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-white">Contact Details</h2>

          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-slate-100">Address</p>
              <p>{contact.address}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">Call Us</p>
              <p>{contact.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">Email us</p>
              {contact.emails.map((email) => (
                <p key={email}>{email}</p>
              ))}
            </div>
            <div>
              <p className="font-semibold text-slate-100">Opening Hours</p>
              {contact.hours.map((hour) => (
                <p key={hour}>{hour}</p>
              ))}
            </div>
          </div>

          <Link
            href={contact.mapUrl}
            target="_blank"
            className="mt-6 inline-flex rounded-lg border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Open Map
          </Link>
        </Reveal>
      </div>

      <Reveal className="glass-panel overflow-hidden p-0">
        <iframe
          title="Gridlabs Map"
          src="https://www.google.com/maps?q=Ground+Floor+2+Euro+9+Apartment+Lane+no+4+Sanjay+Park+Pune+411014&output=embed"
          className="h-80 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </div>
  );
}
