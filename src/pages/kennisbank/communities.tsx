import ContentTypeOverview from "@site/src/components/ContentTypeOverview";
import Layout from "@theme/Layout";

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
      </main>
    </Layout>
  );
}
