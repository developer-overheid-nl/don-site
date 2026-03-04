import ContentTypeOverview from "@site/src/components/ContentTypeOverview";
import Layout from "@theme/Layout";

export default function Standaarden() {
  return (
    <Layout
      title="Alle Standaarden"
      description="Overzicht van alle standaarden in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <h1>Alle Standaarden</h1>
        <p>Overzicht van alle standaarden, protocollen en specificaties.</p>
        <ContentTypeOverview contentType="standaard" />
      </main>
    </Layout>
  );
}
