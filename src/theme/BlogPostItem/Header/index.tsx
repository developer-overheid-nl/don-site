import Header from "@theme-original/BlogPostItem/Header";
import type HeaderType from "@theme/BlogPostItem/Header";
import type { WrapperProps } from "@docusaurus/types";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import AiDropdown from "@site/src/components/AiDropdown";

import styles from "./styles.module.css";

type Props = WrapperProps<typeof HeaderType>;

/**
 * Zet de AI-knop onder de kop van een blogpost. Alleen op de losse post, niet in
 * het overzicht, want daar staat de volledige tekst niet.
 */
export default function HeaderWrapper(props: Props): React.JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost();

  return (
    <>
      {isBlogPostPage ? (
        <div className={styles.bar}>
          <Header {...props} />
          <AiDropdown permalink={metadata.permalink} title={metadata.title} label="AI-Menu" />
        </div>
      ) : <Header {...props} />}
    </>
  );
}
