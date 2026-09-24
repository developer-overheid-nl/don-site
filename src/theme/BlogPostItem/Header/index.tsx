import Header from "@theme-original/BlogPostItem/Header";
import type HeaderType from "@theme/BlogPostItem/Header";
import type { WrapperProps } from "@docusaurus/types";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import AiMenu from "@site/src/components/AiMenu";

import styles from "./styles.module.css";

type Props = WrapperProps<typeof HeaderType>;

/**
 * Zet de AI-knop onder de kop van een blogpost. Alleen op de losse post, niet in
 * het overzicht, want daar staat de volledige tekst niet.
 */
export default function HeaderWrapper(props: Props): React.JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost();
  const markdownPath = `${metadata.permalink}.md`;

  return (
    <>
      <Header {...props} />
      {isBlogPostPage ? (
        <div className={styles.bar}>
          <AiMenu markdownPath={markdownPath} title={metadata.title} />
        </div>
      ) : null}
    </>
  );
}
