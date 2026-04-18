import { useEffect } from "react";
import { useCookieConsentStore } from "../../store/cookies/cookieConsent.store";

const CLARITY_ID = "Ywcii1hj2tf";


export default function MicrosoftClarityLoader() {
  const analyticsEnabled = useCookieConsentStore((s) => s.analyticsEnabled);

  useEffect(() => {
    if (!analyticsEnabled) return;
    if (!CLARITY_ID || CLARITY_ID === "Ywcii1hj2tf") return;
    if (document.getElementById("clarity-script")) return;

    const script = document.createElement("script");
    script.id = "clarity-script";
    script.type = "text/javascript";
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");
    `;
    document.head.appendChild(script);
  }, [analyticsEnabled]);

  return null;
}