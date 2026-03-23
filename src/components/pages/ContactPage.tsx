import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  StaggerHoverGroup,
  StaggerHoverItem,
} from "@/components/interactive/StaggerHoverGroup";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import contact from "@/content/contact.json";

export function ContactPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <span className="section-kicker">Start a conversation</span>
        <h1 className="mt-5 section-title">Contact</h1>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <ImageCard
              src={contact.heroImage}
              alt={contact.heroAlt}
              badge="We’d love to hear from you"
            />
            <div className="section-shell gradient-mesh flex flex-col justify-center p-8">
              <h2 className="text-2xl font-semibold text-brand-900">
                Let’s design meaningful CSR work together
              </h2>
              <p className="mt-4 section-copy">
                Reach out for strategy support, implementation partnerships,
                impact measurement, or exploratory conversations.
              </p>
              <ul className="mt-6 grid gap-3">
                {contact.quickPoints.map((point) => (
                  <li
                    key={point}
                    className="rounded-2xl border-2 border-brand-700 bg-cream px-4 py-3 text-sm text-brand-900"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SpotlightPanel>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <SpotlightPanel className="p-6 h-full flex flex-col justify-center">
            <ContactForm />
          </SpotlightPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <SpotlightPanel className="section-shell gradient-mesh p-6">
            <h2 className="text-2xl font-semibold text-brand-900">
              Contact Details
            </h2>

            <StaggerHoverGroup className="mt-5 space-y-4 text-sm text-brand-900 list-none p-0 m-0">
              <StaggerHoverItem className="rounded-xl p-3 border-2 border-brand-700">
                <p className="font-semibold text-brand-900">Address</p>
                <p>{contact.address}</p>
              </StaggerHoverItem>
              <StaggerHoverItem className="rounded-xl p-3 border-2 border-brand-700">
                <p className="font-semibold text-brand-900">Call Us</p>
                <p>{contact.phone}</p>
              </StaggerHoverItem>
              <StaggerHoverItem className="rounded-xl p-3 border-2 border-brand-700">
                <p className="font-semibold text-brand-900">Email us</p>
                {contact.emails.map((email) => (
                  <p key={email}>{email}</p>
                ))}
              </StaggerHoverItem>
              <StaggerHoverItem className="rounded-xl p-3 border-2 border-brand-700">
                <p className="font-semibold text-brand-900">Opening Hours</p>
                {contact.hours.map((hour) => (
                  <p key={hour}>{hour}</p>
                ))}
              </StaggerHoverItem>
            </StaggerHoverGroup>

            <MagneticButton strength={15}>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-2xl border-2 border-sunrise-500 bg-sunrise-400 px-4 py-2 text-sm font-semibold text-brand-950 transition hover:bg-sunrise-300 hover:scale-105"
              >
                Open Map
              </a>
            </MagneticButton>
          </SpotlightPanel>
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
