import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CookieConsentStatus = "accepted" | "rejected" | null;

interface CookieConsentState {
  status: CookieConsentStatus;
  analyticsEnabled: boolean;
  adsEnabled: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (payload: {
    analyticsEnabled: boolean;
    adsEnabled: boolean;
  }) => void;
  reopenConsent: () => void;
}

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set) => ({
      status: null,
      analyticsEnabled: false,
      adsEnabled: false,

      acceptAll: () =>
        set({
          status: "accepted",
          analyticsEnabled: true,
          adsEnabled: true,
        }),

      rejectAll: () =>
        set({
          status: "rejected",
          analyticsEnabled: false,
          adsEnabled: false,
        }),

      savePreferences: ({ analyticsEnabled, adsEnabled }) =>
        set({
          status: analyticsEnabled || adsEnabled ? "accepted" : "rejected",
          analyticsEnabled,
          adsEnabled,
        }),

      reopenConsent: () =>
        set({
          status: null,
        }),
    }),
    {
      name: "tryonehub-cookie-consent",
    }
  )
);