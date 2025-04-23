import {usePluginData} from '@docusaurus/useGlobalData';

export default function DocsOverview(): React.JSX.Element {
  const docsData = usePluginData('docusaurus-plugin-content-docs');
  const numDocs = docsData['versions'][0]['docs'].length || 'een onbekend aantal';

  return (
    <p>Er zijn {numDocs} artikelen op dit moment in onze Kennisbank.</p>
  );
}
