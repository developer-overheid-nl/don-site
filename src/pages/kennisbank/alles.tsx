import React from "react";
import Layout from "@theme/Layout";
import ContentTypeOverview from "@site/src/components/ContentTypeOverview";

export default function AlleArtikelen(): React.JSX.Element {
  return (
    <Layout
      title="Alle Artikelen"
      description="Volledig overzicht van alle artikelen in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <ContentTypeOverview
          showFilter
          title="Alle Artikelen"
          description="Volledig overzicht van alle artikelen in de kennisbank. Filter op content type of zoek op titel."
        />
      </main>
    </Layout>
  );
}
