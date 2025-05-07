import type { PropsWithChildren } from 'react';
//import '@rijkshuisstijl-community/design-tokens/dist/index.css'
import '../../proprietary/design-tokens/dist/theme.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import SiteLogo from './SiteLogo';

function HomepageLink({ pathname, siteName, tagline, children }: PropsWithChildren<object>) {
  return (
    (pathname !== '') ? 
      <a href='/' aria-label={`Logo ${siteName}, ${tagline}; naar de homepage`}>{ children }</a> :
      <>{ children }</>
  )
}

// Default implementation, that you can customize
function Root({ children }: PropsWithChildren<object>) {
  const { siteConfig } = useDocusaurusContext();
  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');

  return (
    <div className="don-theme" data-page={pathname === '' ? 'home' : pathname}>
      <header className='ro-header container'>
        <HomepageLink pathname={pathname} siteName={siteConfig.customFields.siteName} tagline={siteConfig.tagline}>
          <div className='ro-header__word-mark'>
            <SiteLogo />
            <h1 className='ro-header__site-name'>{`${siteConfig.customFields.siteName}`}</h1>
            <p className='ro-header__pay-off'>{siteConfig.tagline}</p>
          </div>
        </HomepageLink>
        <div className='ro-header__ro-logo'><img src='/img/logo-rijksoverheid.svg' alt='Logo Rijksoverheid' /></div>
      </header>
      {children}
    </div>
  );
}

export default Root;
