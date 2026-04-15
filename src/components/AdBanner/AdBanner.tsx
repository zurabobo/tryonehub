import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBannerProps {
  client: string;
  slot: string;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ client, slot, className }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch {
      // ignore adsense runtime errors before approval
    }
  }, []);

  return (
    <div className={`w-full flex justify-center my-4 px-2 ${className ?? ""}`}>
      <ins
        className={`adsbygoogle ${className || ""}`}
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;