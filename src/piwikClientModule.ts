import type { ClientModule } from "@docusaurus/types";
import siteConfig from "@generated/docusaurus.config";
import PiwikPro, { PageViews } from "@piwikpro/react-piwik-pro";

type PiwikProClientConfig = {
  siteId: string;
  accountAddress: string;
};

let initialized = false;
let trackingDisabled = false;
let warnedMissingConfig = false;
let warnedInitFailure = false;
let warnedTrackFailure = false;

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
  const customFields = (siteConfig.customFields ?? {}) as Record<string, unknown>;
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

const piwikClientModule: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    // Skip anchor/query-only navigation; we only count pathname changes.
    if (previousLocation && previousLocation.pathname === location.pathname) {
      return;
    }

    if (!ensureInitialized()) {
      return;
    }

    try {
      PageViews.trackPageView();
    } catch (error) {
      trackingDisabled = true;

      if (!warnedTrackFailure) {
        warnedTrackFailure = true;
        warnDev("Tracking disabled: failed to send pageview.", error);
      }
    }
  },
};

export default piwikClientModule;
