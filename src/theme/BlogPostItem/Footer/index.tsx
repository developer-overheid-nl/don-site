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
  const { pathname } = useLocation();
  const blogItemRegex = /\/blog\/\d{4}\/\d{2}\/\d{2}\//g;
  
  return (
    <>
      { siteConfig.customFields.discourseCommentsInBlog && blogItemRegex.test(pathname) ? 
        <DiscourseForum discourseEmbedUrl={`${siteConfig.url}${useBaseUrl(pathname)}/index.html`} /> :
        null
      }
      <Footer {...props} />
    </>
  );
}
