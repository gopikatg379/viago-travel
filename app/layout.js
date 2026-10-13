import "./globals.css";
import { siteConfig } from "@/lib/config";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Viago | Explore More. Travel Better.", template: "%s | Viago" },
  description: "Premium domestic and international holiday packages, personalized by Viago travel experts.",
  openGraph: { title: "Viago Travel", description: "Explore More. Travel Better.", type: "website", url: siteConfig.url },
  twitter: { card: "summary_large_image", title: "Viago Travel", description: "Curated journeys made simple." },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}