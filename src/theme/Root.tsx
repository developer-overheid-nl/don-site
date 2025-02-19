import type { PropsWithChildren } from 'react';
//import '@rijkshuisstijl-community/design-tokens/dist/index.css'
import '../../proprietary/design-tokens/dist/theme.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

// Default implementation, that you can customize
function Root({ children }: PropsWithChildren<object>) {
  const { siteConfig } = useDocusaurusContext();
  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');

  return (
    <div className="don-theme" data-page={pathname === '' ? 'home' : pathname}>
      <header className='ro-header container'>
        {/* <h1 className='ro-header__site-name'><img src='/img/logo.svg' className='ro-header__site-logo' alt='Logo Developer Overheid' />Developer Overheid</h1> */}
        <div className='ro-header__word-mark'>
          <h1 className='ro-header__site-name' title={`${siteConfig.title} | ${siteConfig.customFields.siteName}`}>{`${siteConfig.customFields.siteName}`}</h1>
          <p className='ro-header__pay-off'>{siteConfig.tagline}</p>
        </div>
        <div className='ro-header__ro-logo'><img src='/img/logo-rijksoverheid.svg' alt='Logo Rijksoverheid' /></div>
      </header>
      {children}
    </div>
  );
}

export default Root;
