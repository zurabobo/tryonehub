import React, { useEffect, useState } from "react";
import { iconsMap } from "../constants/iconsMap";

function DateTime({ currentLocale }) {
  const [now, setNow] = useState(new Date());
  const ClockIcon = iconsMap.Clock;
  const CalendarIcon = iconsMap.CalendarDays;

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const localesMap = {
    ka: "ka",
    ru: "ru-RU",
    en: "en-US",
  };

  const locale = localesMap[currentLocale] || "ka";

  let time;
  if (currentLocale === "ka") {
    time = now.toLocaleTimeString("ka-GE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else {
    time = now.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  let date;
  if (currentLocale === "ka") {
    const months = [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ];
    date = `${now.getDate().toString().padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()}`;
  } else {
    date = now.toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div
      className="
    flex items-center justify-center
    gap-5
    mb-2.5
    text-[#9CA3AF]
    py-1 px-3
    font-medium
    text-sm
    max-[768px]:mb-0
    max-[768px]:gap-2.5
    max-[465px]:text-[0.775rem]
  "
    >
      <div className="flex items-center gap-[6px] text-[13px]">
        <ClockIcon size={16} />
        {time}
      </div>
      <div className="flex items-center gap-[6px] text-[13px]">
        <CalendarIcon size={16} /> {date}
      </div>
    </div>
  );
}

export default DateTime;
