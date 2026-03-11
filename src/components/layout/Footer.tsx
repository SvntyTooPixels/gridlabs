import Link from "next/link";
import footerData from "@/content/footer.json";

const columns = [
  {
    heading: "About Gridlabs",
    links: [
      ["About", "/about"],
      ["Mission & Vision", "/about"],
      ["Founder", "/about"],
      ["Team", "/team"],
      ["Contact", "/contact"],
    ],
  },
  {
    heading: "CSR Services",
    links: [
      ["CSR Strategy", "/csr-services"],
      ["Program Implementation", "/csr-services"],
      ["Impact Measurement", "/csr-services"],
      ["Technical Expertise", "/csr-services"],
    ],
  },
  {
    heading: "Programs",
    links: [
      ["Healthcare", "/projects"],
      ["Education", "/projects"],
      ["Women Welfare", "/projects"],
      ["Community Development", "/projects"],
      ["Environment", "/projects"],
    ],
  },
  {
    heading: "Impact",
    links: [
      ["Social Impact", "/impact"],
      ["Program Outcomes", "/impact"],
      ["Case Studies", "/impact"],
      ["Gallery", "/impact"],
      ["Journal", "/impact"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/70 py-14">
      <div className="container-padded grid gap-10 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <p className="mt-3 text-sm text-slate-300">
            Responsible CSR partnerships for long-term community impact.
          </p>
          <p className="mt-6 text-sm text-slate-300">
            Office Address: {footerData.officeAddress}
          </p>
          <p className="mt-2 text-sm text-slate-300">CIN: {footerData.cin}</p>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              {column.heading}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {column.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
