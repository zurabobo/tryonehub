import { useState } from "react";
import { useCookieConsentStore } from "../../store/cookies/cookieConsent.store";
import { useThemeStore } from "../../store/theme/theme.store";

export default function CookieConsentModal() {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  const {
    status,
    analyticsEnabled,
    adsEnabled,
    acceptAll,
    rejectAll,
    savePreferences,
  } = useCookieConsentStore();

  const [showSettings, setShowSettings] = useState(false);
  const [localAnalytics, setLocalAnalytics] = useState(analyticsEnabled);
  const [localAds, setLocalAds] = useState(adsEnabled);

  if (status !== null) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40 p-3 sm:p-4">
      <div
        className={`
          w-full max-w-[720px] rounded-2xl border shadow-2xl p-4 sm:p-5
          transition-colors duration-300
          ${
            isDark
              ? "bg-[#1E293B] border-white/10 text-[#E5E7EB]"
              : "bg-white border-[#D7E0EA] text-[#0F172A]"
          }
        `}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Cookies და კონფიდენციალურობა
        </h2>

        <p
          className={`text-sm leading-6 ${
            isDark ? "text-[#CBD5E1]" : "text-[#475569]"
          }`}
        >
          საიტი იყენებს აუცილებელ cookie-ებს გამართული მუშაობისთვის. ანალიტიკის
          და რეკლამის cookie-ები ჩაირთვება მხოლოდ თქვენი თანხმობის შემთხვევაში.
        </p>

        {showSettings && (
          <div
            className={`mt-4 rounded-xl border p-4 ${
              isDark
                ? "border-white/10 bg-[#0F172A]"
                : "border-[#D7E0EA] bg-[#F8FAFC]"
            }`}
          >
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">აუცილებელი cookies</p>
                <p
                  className={`text-sm ${
                    isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                  }`}
                >
                  ეს ყოველთვის ჩართულია.
                </p>
              </div>
              <span className="text-sm font-medium text-[#38BDF8]">Always on</span>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-white/10">
              <div className="pr-4">
                <p className="font-medium">Analytics</p>
                <p
                  className={`text-sm ${
                    isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                  }`}
                >
                  Google Analytics და Microsoft Clarity ვიზიტორების ანალიზისთვის.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localAnalytics}
                onChange={(e) => setLocalAnalytics(e.target.checked)}
                className="h-5 w-5 accent-[#38BDF8]"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t border-white/10">
              <div className="pr-4">
                <p className="font-medium">Ads</p>
                <p
                  className={`text-sm ${
                    isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                  }`}
                >
                  AdSense და სარეკლამო ფუნქციონალისთვის საჭირო cookies.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localAds}
                onChange={(e) => setLocalAds(e.target.checked)}
                className="h-5 w-5 accent-[#38BDF8]"
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          {!showSettings && (
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className={`
                rounded-lg px-4 py-2 text-sm font-medium border transition-colors
                ${
                  isDark
                    ? "border-white/10 bg-[#0F172A] hover:bg-[#273449]"
                    : "border-[#D7E0EA] bg-[#F8FAFC] hover:bg-[#EEF2F7]"
                }
              `}
            >
              პარამეტრები
            </button>
          )}

          {showSettings && (
            <button
              type="button"
              onClick={() =>
                savePreferences({
                  analyticsEnabled: localAnalytics,
                  adsEnabled: localAds,
                })
              }
              className="rounded-lg px-4 py-2 text-sm font-medium bg-[#38BDF8] text-[#0F172A] hover:opacity-90 transition-opacity"
            >
              არჩევანის შენახვა
            </button>
          )}

          <button
            type="button"
            onClick={rejectAll}
            className={`
              rounded-lg px-4 py-2 text-sm font-medium border transition-colors
              ${
                isDark
                  ? "border-white/10 bg-transparent hover:bg-[#273449]"
                  : "border-[#D7E0EA] bg-transparent hover:bg-[#EEF2F7]"
              }
            `}
          >
            უარყოფა
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-[#38BDF8] text-[#0F172A] hover:opacity-90 transition-opacity"
          >
            ყველას მიღება
          </button>
        </div>
      </div>
    </div>
  );
}