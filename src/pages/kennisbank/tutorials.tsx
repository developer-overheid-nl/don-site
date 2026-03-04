import ContentTypeOverview from "@site/src/components/ContentTypeOverview";
import Layout from "@theme/Layout";

export default function Tutorials() {
  return (
    <Layout
      title="Alle Tutorials"
      description="Overzicht van alle tutorials in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <h1>Alle Tutorials</h1>
        <p>Overzicht van alle stapsgewijze handleidingen.</p>
        <ContentTypeOverview contentType="tutorial" />
      </main>
    </Layout>
  );
}
