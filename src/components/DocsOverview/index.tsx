import {usePluginData} from '@docusaurus/useGlobalData';

export default function DocsOverview(): React.JSX.Element {
  const docsData = usePluginData('docusaurus-plugin-content-docs');
  const numDocs = docsData['versions'][0]['docs'].length || 'een onbekend aantal';

  return (
    <p>Er zijn op dit moment {numDocs} artikelen in onze Kennisbank.</p>
  );
}
