import DocBreadcrumbs from "@theme-original/DocBreadcrumbs";
import type DocBreadcrumbsType from "@theme/DocBreadcrumbs";
import type { WrapperProps } from "@docusaurus/types";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import AiDropdown from "@site/src/components/AiDropdown";
import InitiativeProvenance from "@site/src/components/InitiativeProvenance";

import styles from "./styles.module.css";

type Props = WrapperProps<typeof DocBreadcrumbsType>;

/**
 * Zet de AI-knop op dezelfde regel als het kruimelpad, rechts uitgelijnd.
 *
 * Stond eerder boven de inhoud, waardoor hij een eigen regel opeiste en de
 * eerste alinea naar beneden duwde. De kruimelpadregel heeft daar ruimte voor
 * en is de plek waar paginabrede acties horen.
 *
 * Op pagina's van een gehost initiatief staat erboven wie de inhoud beheert;
 * buiten die sectie rendert InitiativeProvenance niets.
 */
export default function DocBreadcrumbsWrapper(props: Props): React.JSX.Element {
  const { metadata } = useDoc();

  return (
    <>
      <InitiativeProvenance />
      <div className={styles.row}>
        <DocBreadcrumbs {...props} />
        <AiDropdown
          label="AI-Menu"
          permalink={metadata.permalink}
          title={metadata.title}
        />
      </div>
    </>
  );
}
