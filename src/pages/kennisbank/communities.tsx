import ContentTypeOverview from "@site/src/components/ContentTypeOverview";
import Layout from "@theme/Layout";

const OTHER_SOURCES = [
  {
    label: "Autoriteit Persoonsgegevens (AP)",
    href: "https://autoriteitpersoonsgegevens.nl",
  },
  {
    label: "Centrum Informatiebeveiliging en Privacybescherming (CIP)",
    href: "https://cip-overheid.nl",
  },
  { label: "Digitale Overheid", href: "https://digitaleoverheid.nl" },
  { label: "Forum Standaardisatie", href: "https://forumstandaardisatie.nl" },
  {
    label: "Interoperable Europe Portal",
    href: "https://interoperable-europe.ec.europa.eu",
  },
  {
    label: "Nationaal Cyber Security Centrum (NCSC)",
    href: "https://www.ncsc.nl",
  },
  {
    label: "Rijksinspectie Digitale Infrastructuur (RDI)",
    href: "https://rdi.nl",
  },
  {
    label:
      "Nationaal innovatie centrum privacy-enhancing technologies (nicpet)",
    href: "https://nicpet.nl",
  },
];

export default function Communities() {
  return (
    <Layout
      title="Alle Communities"
      description="Overzicht van alle developer communities in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <h1>Alle Communities</h1>
        <p>
          Overzicht van developer communities, verdeeld over de thema&apos;s van
          de kennisbank.
        </p>
        <ContentTypeOverview contentType="community" />

        <h2>Andere bronnen</h2>
        <ul>
          {OTHER_SOURCES.map((source) => (
            <li key={source.href}>
              <a href={source.href}>{source.label}</a>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
