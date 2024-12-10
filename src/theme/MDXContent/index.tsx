import { MDXProvider } from '@mdx-js/react';
import type { Props } from '@theme/MDXContent';
import type { ReactElement } from 'react';

import { Link } from '@rijkshuisstijl-community/components-react';

export default function MDXContent({ children }: Props): ReactElement {
    return (
        <MDXProvider
            components={{
                // code: Code,
                a: Link,
                // em: Emphasis,DocCardList
                // ul: ({ children }) => {
                //     return <UnorderedList className="utrecht-unordered-list--html-content">{children}</UnorderedList>;
                // },
                // ol: ({ children }) => {
                //     return <OrderedList className="utrecht-ordered-list--html-content">{children}</OrderedList>;
                // },
                // img: Image,
                // h1: Heading1,
                // h2: Heading2,
                // h3: Heading3,
                // h4: Heading4,
                // h5: Heading5,
                // h6: Heading6,
                // mermaid: Mermaid,
            }}
        >
            {children}
        </MDXProvider>
    );
}
