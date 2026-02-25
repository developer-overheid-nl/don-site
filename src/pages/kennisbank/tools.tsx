import React from "react";
import Layout from "@theme/Layout";
import ContentTypeOverview from "@site/src/components/ContentTypeOverview";

export default function AlleTools(): React.JSX.Element {
  return (
    <Layout
      title="Alle Tools"
      description="Overzicht van alle tools in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <ContentTypeOverview
          contentType="tool"
          title="Alle Tools"
          description="Overzicht van alle tools, validators en editors in de kennisbank, gegroepeerd per categorie."
        />
      </main>
    </Layout>
  );
}
