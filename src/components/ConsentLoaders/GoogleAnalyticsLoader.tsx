import { useEffect } from "react";
import { useCookieConsentStore } from "../../store/cookies/cookieConsent.store";

const GA_ID = "G-RESLHZ84CM";


export default function GoogleAnalyticsLoader() {
  const analyticsEnabled = useCookieConsentStore((s) => s.analyticsEnabled);

  useEffect(() => {
    if (!analyticsEnabled) return;
    if (!GA_ID || GA_ID === "G-RESLHZ84CM") return;
    if (document.getElementById("ga-script")) return;

    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement("script");
    inlineScript.id = "ga-inline-script";
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(inlineScript);
  }, [analyticsEnabled]);

  return null;
}