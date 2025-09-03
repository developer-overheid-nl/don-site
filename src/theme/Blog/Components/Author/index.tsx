import React, {type ReactNode} from 'react';
import Author from '@theme-original/Blog/Components/Author';
import type AuthorType from '@theme/Blog/Components/Author';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof AuthorType>;

export default function AuthorWrapper(props: Props): ReactNode {
  return (
    <>
      <Author {...props} />
    </>
  );
}
