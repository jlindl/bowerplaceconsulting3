// Single source of truth for every fact on the site.
// Facts are taken from the existing Bower Place site (bowerplace-consulting-demo.vercel.app).
// Images are Unsplash stock photos (free licence), colour graded in scripts/grade.mjs. See CREDITS.md.

export const site = {
  name: "Bower Place",
  legalName: "Bower Place Consulting",
  descriptor: "Public Sector Consulting",
  url: "https://bowerplaceconsulting3.vercel.app",
  email: "hello@bowerplaceconsulting.com",
  phone: "+44 7944 893333",
  phoneHref: "tel:+447944893333",
  description:
    "Senior practitioners who have run government programmes from the inside. Digital transformation, major programme management and AI and cloud services for the UK public sector.",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: "£500M+", label: "In public sector programmes overseen" },
  { value: "40+", label: "Government organisations supported" },
  { value: "20+", label: "Years of public sector experience" },
  { value: "100%", label: "Public sector focused" },
];

export const accreditations = [
  { name: "Crown Commercial Service", detail: "Approved supplier, Management Consultancy Framework (MCF3)" },
  { name: "G-Cloud 14", detail: "Listed supplier for cloud support and professional services" },
  { name: "Cyber Essentials Plus", detail: "Certified annually" },
  { name: "ISO 27001", detail: "Information security management certified" },
];

export const formerRoles = [
  "Ministry of Defence",
  "DWP",
  "Transport for London",
  "Ministry of Justice",
  "Homes England",
  "FCDO",
  "HMRC",
  "The NHS",
];

export type Service = {
  slug: string;
  no: string;
  title: string;
  short: string;
  body: string;
  includes: string[];
  cta: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "digital-transformation",
    no: "01",
    title: "Digital Transformation",
    short: "Modernise legacy systems and redesign the services citizens rely on.",
    body: "End-to-end programmes that modernise legacy systems, redesign citizen-facing services and build lasting digital capability inside your own teams, so the change outlives our involvement.",
    includes: ["Legacy system modernisation", "Citizen-facing service redesign", "GDS-aligned discovery, alpha and beta", "In-house digital capability building"],
    cta: "Discuss your transformation",
    image: "/images/digital.webp",
    alt: "A glass-walled meeting room in a modern office",
  },
  {
    slug: "major-programme-management",
    no: "02",
    title: "Major Programme Management",
    short: "Senior leadership, governance and assurance for high-value programmes.",
    body: "Senior leadership, structured governance and independent assurance for high-value programmes, from the business case through to benefits realisation. We step in to set programmes up well, and to reset them when they drift.",
    includes: ["Programme leadership and SRO support", "Governance design", "Independent assurance", "Programme reset and recovery"],
    cta: "Talk to our programme leads",
    image: "/images/programme.webp",
    alt: "An architectural model of a city district seen from above",
  },
  {
    slug: "ai-and-cloud",
    no: "03",
    title: "AI & Cloud Services",
    short: "Adopt cloud and AI securely, compliantly and in production.",
    body: "Adopting cloud and AI-enabled tools securely and compliantly, shaped around your security, governance and procurement needs. Built to run in live service, not just as a proof of concept.",
    includes: ["Cloud migration and hosting strategy", "AI-assisted workflows with human review", "Information governance and clinical safety", "Procurement through G-Cloud 14"],
    cta: "Explore AI and cloud options",
    image: "/images/cloud.webp",
    alt: "Rows of white server cabinets in a modern data centre",
  },
];

export const principles = [
  { title: "Deep public sector expertise", body: "We know procurement, governance and the political landscape because we have worked inside it." },
  { title: "Outcome-focused delivery", body: "We measure success by impact, not by day rates." },
  { title: "Senior practitioners, not junior teams", body: "We take on a select number of clients at a time, so senior people stay on every programme." },
  { title: "Trusted across government", body: "Central government, local authorities and arm's-length bodies." },
];

export const method = [
  { no: "01", title: "Strategy", body: "Shape the case for change with the people who will own it." },
  { no: "02", title: "Business case", body: "Build a case that survives spending review and spend controls." },
  { no: "03", title: "Discovery & design", body: "Research with real users and design services that work first time." },
  { no: "04", title: "Delivery", body: "Clear governance, honest reporting and independent assurance." },
  { no: "05", title: "Live service", body: "Launch, embed digital capability and hand over with confidence." },
  { no: "06", title: "Benefits", body: "Track the promised outcomes through to realisation." },
];

export type CaseStudy = {
  slug: string;
  service: string;
  client: string;
  figure: string;
  figureLabel: string;
  challenge: string;
  approach: string;
  outcome: string;
  image: string;
  alt: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "central-government",
    service: "Digital Transformation",
    client: "Central government department",
    figure: "60%",
    figureLabel: "Reduction in processing time",
    challenge: "Three legacy case management systems with manual re-entry between them. A previous consolidation had stalled after 18 months and £4M of spend.",
    approach: "Rapid discovery, a single data model, and three workstreams each with its own SRO, joined up by a weekly cross-workstream risk forum.",
    outcome: "One cloud-native platform within 11 months, delivered 8% under the revised business case.",
    image: "/images/case-central.webp",
    alt: "A glass atrium inside a modern office building",
  },
  {
    slug: "local-authority",
    service: "Major Programme Management",
    client: "Metropolitan local authority",
    figure: "£12M",
    figureLabel: "Projected overrun avoided",
    challenge: "A £180M infrastructure programme flagged for a £12M overrun and 14 months of slippage, with two SRO changes in a year.",
    approach: "A six-week programme reset: a new governance framework, a refreshed benefits plan and structured stakeholder workshops.",
    outcome: "Re-approved by full council within eight weeks, and delivered within 2% of the revised baseline.",
    image: "/images/case-council.webp",
    alt: "An aerial view of a city intersection between tall buildings",
  },
  {
    slug: "nhs-trust",
    service: "AI & Cloud Services",
    client: "NHS trust",
    figure: "45%",
    figureLabel: "Reduction in manual processing workload",
    challenge: "Staff spent an estimated 30% of their week hand-processing referral letters, discharge summaries and consent forms.",
    approach: "An AI-assisted document pipeline with human-in-the-loop review, built with the information governance and clinical safety teams.",
    outcome: "Workload down 45% within six months of full deployment. Passed its first DSPT audit with no findings.",
    image: "/images/case-nhs.webp",
    alt: "A quiet, empty hospital corridor with benches",
  },
  {
    slug: "arms-length-body",
    service: "Digital Transformation",
    client: "Arm's-length body",
    figure: "87%",
    figureLabel: "Citizen satisfaction, up from 34%",
    challenge: "A paper application process, a backlog of more than 8,000 cases and 12 administrators keying in data.",
    approach: "GDS-aligned discovery and alpha, more than 60 user research sessions, and 40% fewer questions for citizens to answer.",
    outcome: "Average processing time cut from 34 days to 6. Spend control approval at first submission.",
    image: "/images/case-alb.webp",
    alt: "A pedestrian crossing seen from directly above, in black and white",
  },
];

export const values = [
  { title: "Accountability without hierarchy", body: "One senior team owns the work end to end. No hand-offs to people you have never met." },
  { title: "Expertise over headcount", body: "We bring the right few people rather than the most people." },
  { title: "Public sector first", body: "We work exclusively with public sector and government organisations." },
  { title: "Honest counsel", body: "We tell you what we see, including when it is not what you hoped to hear." },
];

export const founders = [
  {
    name: "Tunji Salami",
    role: "Founding Partner",
    initials: "TS",
    bio: "20 years leading digital transformation programmes across HMRC, DWP and the NHS. Former Deputy Director of Digital Delivery at a central government department.",
  },
  {
    name: "James Place",
    role: "Founding Partner",
    initials: "JP",
    bio: "Former SRO on three major infrastructure programmes totalling over £300M. Specialist in programme reset, governance design and spending review navigation.",
  },
];
