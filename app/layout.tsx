import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "De Anza MSA",
  description: "The Muslim Student Association at De Anza College in Cupertino. Faith, community and service, open to every student.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
