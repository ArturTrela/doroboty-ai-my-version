import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import "./globals.css";
const timeless = localFont({
  src: "./fonts/timeless-sans-variable.woff2",
  variable: "--font-timeless",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "DoRoboty.ai", template: "%s · DoRoboty.ai" },
  description: "Portal pracy dla specjalistów AI i środowisko case study AI Product Heroes 3.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "DoRoboty.ai",
    title: "DoRoboty.ai — praca dla ludzi, którzy dowożą z AI",
    description:
      "Wyselekcjonowane role, w których AI jest częścią odpowiedzialności i wyniku pracy.",
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={timeless.variable}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
