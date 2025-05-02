import Layout from "@theme/Layout";
import { ActiveTeam } from "../components/TeamProfileCards";

export default function TeamPage(): React.JSX.Element {
  return (
    <Layout
      title={`Het team | Ontwikkelaarsportaal van de Nederlandse Overheid`}
      description="Het team achter developer.overheid.nl"
    >
      <main>
        <div className="container margin-top--xl margin-bottom--xl">
          <h1>Het Team</h1>
          <p>
            Achter developer.overheid.nl staat een enthousiast team dat
            dagelijks werkt aan het verbeteren en uitbreiden van het platform
            voor en door developers binnen de overheid. We brengen informatie,
            tools en praktijkvoorbeelden samen op één plek, zodat iedereen
            binnen de overheid snel en eenvoudig aan de slag kan. Met een open
            en betrokken community zorgen we ervoor dat het platform actueel,
            betrouwbaar en inspirerend blijft.
          </p>
          <ActiveTeam />
        </div>
      </main>
    </Layout>
  );
}