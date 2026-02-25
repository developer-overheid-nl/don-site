import React from "react";
import Layout from "@theme/Layout";
import ContentTypeOverview from "@site/src/components/ContentTypeOverview";

export default function AlleTutorials(): React.JSX.Element {
  return (
    <Layout
      title="Alle Tutorials"
      description="Overzicht van alle tutorials in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <ContentTypeOverview
          contentType="tutorial"
          title="Alle Tutorials"
          description="Overzicht van alle stapsgewijze handleidingen in de kennisbank, gegroepeerd per categorie."
        />
      </main>
    </Layout>
  );
}
