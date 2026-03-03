import type { ClientModule } from "@docusaurus/types";
import siteConfig from "@generated/docusaurus.config";
import PiwikPro, { PageViews, SiteSearch } from "@piwikpro/react-piwik-pro";

type PiwikProClientConfig = {
  siteId: string;
  accountAddress: string;
};

let initialized = false;
let trackingDisabled = false;
let warnedMissingConfig = false;
let warnedInitFailure = false;
let warnedPageViewTrackFailure = false;
let warnedSiteSearchTrackFailure = false;

const isDevelopment = process.env.NODE_ENV !== "production";

function warnDev(message: string, error?: unknown): void {
  if (!isDevelopment) {
    return;
  }

  if (error) {
    console.warn(`[piwik-pro] ${message}`, error);
    return;
  }

  console.warn(`[piwik-pro] ${message}`);
}

function getPiwikConfig(): PiwikProClientConfig | null {
  const customFields = (siteConfig.customFields ?? {}) as Record<
    string,
    unknown
  >;
  const piwikPro = (customFields.piwikPro ?? {}) as Record<string, unknown>;

  const siteId =
    typeof piwikPro.siteId === "string" ? piwikPro.siteId.trim() : "";
  const accountAddress =
    typeof piwikPro.accountAddress === "string"
      ? piwikPro.accountAddress.trim()
      : "";

  if (!siteId || !accountAddress) {
    if (!warnedMissingConfig) {
      warnedMissingConfig = true;
      warnDev(
        "Tracking disabled: missing PIWIK_PRO_SITE_ID and/or PIWIK_PRO_ACCOUNT_ADDRESS.",
      );
    }

    return null;
  }

  return { siteId, accountAddress };
}

function normalizePathname(pathname: string | undefined): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

function getSearchKeyword(search: string | undefined): string {
  if (!search) {
    return "";
  }

  return new URLSearchParams(search).get("q")?.trim() ?? "";
}

function getConfiguredSearchPath(): string | null {
  const themeConfig = (siteConfig.themeConfig ?? {}) as Record<string, unknown>;
  const typesense = (themeConfig.typesense ?? {}) as Record<string, unknown>;
  const searchPagePath =
    typeof typesense.searchPagePath === "string"
      ? typesense.searchPagePath.trim()
      : "";

  if (!searchPagePath) {
    return null;
  }

  const baseUrl =
    typeof siteConfig.baseUrl === "string" ? siteConfig.baseUrl : "/";
  const normalizeSegment = (segment: string) => segment.replace(/^\/+|\/+$/g, "");
  const pathSegments = [normalizeSegment(baseUrl), normalizeSegment(searchPagePath)]
    .filter(Boolean)
    .join("/");

  return normalizePathname(`/${pathSegments}`);
}

function ensureInitialized(): boolean {
  if (trackingDisabled) {
    return false;
  }

  if (initialized) {
    return true;
  }

  const config = getPiwikConfig();
  if (!config) {
    trackingDisabled = true;
    return false;
  }

  try {
    PiwikPro.initialize(config.siteId, config.accountAddress);
    initialized = true;
    return true;
  } catch (error) {
    trackingDisabled = true;

    if (!warnedInitFailure) {
      warnedInitFailure = true;
      warnDev("Tracking disabled: failed to initialize Piwik PRO.", error);
    }

    return false;
  }
}

const configuredSearchPath = getConfiguredSearchPath();

const piwikClientModule: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    const pathname = normalizePathname(location.pathname);
    const previousPathname = previousLocation
      ? normalizePathname(previousLocation.pathname)
      : null;
    const pathnameChanged = previousPathname !== pathname;

    const searchKeyword =
      configuredSearchPath && pathname === configuredSearchPath
        ? getSearchKeyword(location.search)
        : "";
    const previousSearchKeyword =
      configuredSearchPath &&
      previousLocation &&
      previousPathname === configuredSearchPath
        ? getSearchKeyword(previousLocation.search)
        : "";

    const shouldTrackSiteSearch =
      Boolean(configuredSearchPath) &&
      pathname === configuredSearchPath &&
      searchKeyword.length > 0 &&
      searchKeyword !== previousSearchKeyword;

    // Skip hash-only/query-only navigation, except new site search queries.
    if (!pathnameChanged && !shouldTrackSiteSearch) {
      return;
    }

    if (!ensureInitialized()) {
      return;
    }

    if (pathnameChanged) {
      try {
        PageViews.trackPageView();
      } catch (error) {
        trackingDisabled = true;

        if (!warnedPageViewTrackFailure) {
          warnedPageViewTrackFailure = true;
          warnDev("Tracking disabled: failed to send pageview.", error);
        }

        return;
      }
    }

    if (shouldTrackSiteSearch) {
      try {
        SiteSearch.trackSiteSearch(searchKeyword);
      } catch (error) {
        if (!warnedSiteSearchTrackFailure) {
          warnedSiteSearchTrackFailure = true;
          warnDev("Failed to send site search event.", error);
        }
      }
    }
  },
};

export default piwikClientModule;
