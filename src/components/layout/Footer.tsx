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
    <footer className="mt-24 border-t border-white/40 bg-white/60 py-14 backdrop-blur-xl">
      <div className="container-padded grid gap-10 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-slate-950 flex items-center gap-2"
            >
              <img src="/images/Logo.jpg" alt="Gridlabs Logo" className="h-10 w-auto rounded-md object-contain" />
              <span className="text-gradient hidden sm:inline-block">Gridlabs Research Foundation</span>
            </Link>
          <p className="mt-3 text-sm text-slate-600">
            Responsible CSR partnerships for long-term community impact.
          </p>
          <p className="mt-6 text-sm text-slate-600">
            Office Address: {footerData.officeAddress}
          </p>
          <p className="mt-2 text-sm text-slate-600">CIN: {footerData.cin}</p>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              {column.heading}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              {column.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-fuchsia-700">
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
