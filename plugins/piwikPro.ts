import type { ClientModule } from "@docusaurus/types";
import siteConfig from "@generated/docusaurus.config";
import PiwikPro, { PageViews, SiteSearch, ErrorTracking } from '@piwikpro/react-piwik-pro';

type PiwikProClientConfig = {
  siteId: string;
  accountAddress: string;
};

declare global{
  interface Window {
    piwikIntialized?: boolean;
    trackSiteSearchTimeout?: ReturnType<typeof setTimeout>;
    dataLayer?: unknown;
  }
} 

const SEARCH_KEYWORD_PARAM = "q";

const normalizePathname = (pathname: string | undefined): string => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

const init = () => {
  const { siteId, accountAddress } = siteConfig.customFields?.piwikPro as typeof siteConfig.customFields.piwikPro & PiwikProClientConfig;

  if (!siteId || !accountAddress) {
    console.warn("[piwik-pro] Tracking disabled: missing PIWIK_PRO_SITE_ID and/or PIWIK_PRO_ACCOUNT_ADDRESS.");
    return;
  }

  PiwikPro.initialize(siteId, accountAddress, {
    // nonce: 'nonce-string',
  });
  window.piwikIntialized = true;
};

const piwikClientModule: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (!previousLocation && !window.piwikIntialized) {

      init(); // PageViews.trackPageView() is already done by the PiwikPro.initialize call.

    } 
    else if (location.search && location.search.includes(`${SEARCH_KEYWORD_PARAM}=`)) {

      // debouce tracking to avoid tracking intermediate states of the search query
      window.trackSiteSearchTimeout as ReturnType<typeof setTimeout>;
      if (window.trackSiteSearchTimeout) {
        clearTimeout(window.trackSiteSearchTimeout);
      }
      window.trackSiteSearchTimeout = setTimeout(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get(SEARCH_KEYWORD_PARAM) ?? undefined;
        // Custom id in the SearchPage component to get the amount of results.
        const searchResultsAmount = Number(document.getElementById("searchResultsAmount")?.textContent);

        SiteSearch.trackSiteSearch(query, undefined, searchResultsAmount);
      }, 1000);

    } 
    else if (normalizePathname(location.pathname) !== normalizePathname(previousLocation?.pathname)) {

      // Because the title is changed with a slight delay after the route change, we need to observe the title.
      const observer = new MutationObserver(() => {
        if (normalizePathname(document.location.pathname) === normalizePathname(location.pathname)) {
          PageViews.trackPageView();
        }
      })
      observer.observe(document.querySelector("title"), { childList: true });

    } 
    else {

      ErrorTracking.trackError(new Error(`Unknown route in PiwikPro plugin on page: ${JSON.stringify(location)} from ${JSON.stringify(previousLocation)}`));
    
    }
  },
};

export default piwikClientModule;
