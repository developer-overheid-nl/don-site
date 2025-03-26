import type { PropsWithChildren } from 'react';
//import '@rijkshuisstijl-community/design-tokens/dist/index.css'
import '../../proprietary/design-tokens/dist/theme.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

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
            <svg className='ro-header__site-logo' aria-label='Vignet' viewBox="0 0 92 75" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style dangerouslySetInnerHTML={{
    __html: `
    .rsaquo { color: #01689B }
    .lowbar { color: #8FCAE7 }
    /* @media (prefers-color-scheme: dark) {
      .rsaquo { color: #66A4C3 }
      .lowbar { color: #CCE7F4 }
    } */
    @media (forced-colors: active) {
      .rsaquo { color: #0F172A }
      .lowbar { color: #475569 }
    }
    @media (forced-colors: active) and (prefers-color-scheme: dark) {
      .rsaquo { color: #E2E8F0 }
      .lowbar { color: #F8FAFC }
    }
  `
                }} />
              </defs>
              <path className="rsaquo" fillRule="evenodd" clipRule="evenodd" d="M26.718 33.2523L0 7.9528L7.15601 0L42.1354 33.3897L34.5678 40.6854L34.5678 40.6853L7.95278 66.783L0.400269 58.8302L26.718 33.2523Z" fill="Currentcolor"/>
              <path className="lowbar" d="M91.0191 64.7855H40.1378V74.7284H91.0191V64.7855Z" fill="CurrentColor"/>
            </svg>
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
