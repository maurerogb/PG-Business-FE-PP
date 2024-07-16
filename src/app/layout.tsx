import { Metadata } from "next";
import { Raleway, DM_Sans, Poppins, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

import "@styles/globals.css";

import { Toaster } from "components/ui/toaster";
import Provider from "utils/provider";
import AppSessionProvider from "./_components/SessionProvider";

export const metadata: Metadata = {
  title: "Business",
  description: "Business page as it should be",
};

//font files can be colocated inside of `app`
const raleway = Raleway({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-raleway",
});
const dmsans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-DMSans",
  weight: "400",
});
const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-Poppins",
  weight: "400",
});
const PlusJakartaSans = Plus_Jakarta_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-Plus_Jakarta_Sans",
  weight: "400",
});

const sfpro = localFont({
  display: "swap",
  variable: "--font-sf-pro-display",
  src: [
    {
      path: "../assets/fonts/sf-pro-display-thin-webfont.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/sf-pro-display-ultralight-webfont.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/sf-pro-display-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/sf-pro-display-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/sf-pro-display-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/sf-pro-display-semibold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/sf-pro-text-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/sf-pro-text-heavy-webfont.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});
const CenturyGothic = localFont({
  display: "swap",
  variable: "--font-century-gothic",
  src: [
    {
      path: "../assets/fonts/century-gothic/CenturyGothic-Bold.woff",
      style: "normal",
    },
    {
      path: "../assets/fonts/century-gothic/CenturyGothic.woff2",
      style: "normal",
    },
  ],
});
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${PlusJakartaSans.variable} ${CenturyGothic.variable} ${poppins.variable} ${dmsans.variable} ${raleway.variable} ${sfpro.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-CenturyGothic">
        <AppSessionProvider>
          <Provider>{children}</Provider>
        </AppSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
