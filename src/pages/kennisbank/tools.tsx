import ContentTypeOverview from "@site/src/components/ContentTypeOverview";
import Layout from "@theme/Layout";

export default function Tools() {
  return (
    <Layout
      title="Alle Tools"
      description="Overzicht van alle tools in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <h1>Alle Tools</h1>
        <p>Overzicht van alle tools, validators, linters en editors.</p>
        <ContentTypeOverview contentType="tool" />
      </main>
    </Layout>
  );
}
