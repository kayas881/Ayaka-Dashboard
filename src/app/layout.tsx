import "./globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayaka Dashboard",
  description: "Discord bot dashboard for Ayaka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
