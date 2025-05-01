import React, {type ReactNode} from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import type FooterType from '@theme/BlogPostItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import DiscourseForum from './DiscourseForum';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  
  return (
    <>
      <DiscourseForum discourseEmbedUrl={`${siteConfig.url}${useBaseUrl(location.pathname)}`} />
      <Footer {...props} />
    </>
  );
}
