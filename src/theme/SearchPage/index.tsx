import React, {type ReactNode} from 'react';
import SearchPage from '@theme-original/SearchPage';
import type SearchPageType from '@theme/SearchPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof SearchPageType>;

import styles from './styles.module.css';

export default function SearchPageWrapper(props: Props): ReactNode {
  return (
    <>
      <div className={styles.searchPage}>
        <SearchPage {...props} data-lala />
      </div>
    </>
  );
}
