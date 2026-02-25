import React from "react";
import Layout from "@theme/Layout";
import ContentTypeOverview from "@site/src/components/ContentTypeOverview";

export default function AlleStandaarden(): React.JSX.Element {
  return (
    <Layout
      title="Alle Standaarden"
      description="Overzicht van alle standaarden in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <ContentTypeOverview
          contentType="standaard"
          title="Alle Standaarden"
          description="Overzicht van alle standaarden, specificaties en protocollen in de kennisbank, gegroepeerd per categorie."
        />
      </main>
    </Layout>
  );
}
