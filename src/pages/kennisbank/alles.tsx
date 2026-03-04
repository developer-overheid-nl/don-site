import ContentTypeOverview from "@site/src/components/ContentTypeOverview";
import Layout from "@theme/Layout";

export default function Alles() {
  return (
    <Layout
      title="Alle Artikelen"
      description="Overzicht van alle artikelen in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <h1>Alle Artikelen</h1>
        <p>Overzicht van alle artikelen in de kennisbank.</p>
        <ContentTypeOverview showFilter />
      </main>
    </Layout>
  );
}
