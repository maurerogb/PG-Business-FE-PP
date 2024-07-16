import { Metadata } from "next";
import { Suspense } from "react";
import Preloader from "./loading";

export const metadata: Metadata = {
  title: "Registration",
  description: "Registration where all the business are being registered",
};

export default function RegistrationLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen">
      {/* <svg
        className="absolute max-h-screen -z-10"
        width="100%"
        height="662"
        viewBox="0 0 1440 662"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1583_87050)">
          <ellipse cx="667.5" cy="-38.5" rx="772.5" ry="600.5" fill="url(#paint0_linear_1583_87050)" />
        </g>
        <defs>
          <filter
            id="filter0_f_1583_87050"
            x="-205"
            y="-739"
            width="1745"
            height="1401"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1583_87050" />
          </filter>
          <linearGradient
            id="paint0_linear_1583_87050"
            x1="-365.182"
            y1="-639"
            x2="1736.05"
            y2="355.133"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BFEFFF" stopOpacity="0.2" />
            <stop offset="0.192708" stopColor="#CDF2FF" stopOpacity="0.381595" />
            <stop offset="0.848958" stopColor="white" />
            <stop offset="1" stopColor="#2682A1" />
          </linearGradient>
        </defs>
      </svg> */}

      {/* <svg
        className="absolute h-screen max-h-screen top-16 -z-10"
        width="100%"
        height="1065"
        viewBox="0 0 1440 1065"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1583_88213)">
          <ellipse
            cx="683.625"
            cy="532.716"
            rx="772.5"
            ry="366"
            transform="rotate(-19.6745 683.625 532.716)"
            fill="#FDE5D1"
            fillOpacity="0.27"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1583_88213"
            x="-154.258"
            y="0.934082"
            width="1675.77"
            height="1063.56"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1583_88213" />
          </filter>
        </defs>
      </svg> */}
      <Suspense fallback={<Preloader />}>
        {children}
      </Suspense>

    </div>
  );
}
