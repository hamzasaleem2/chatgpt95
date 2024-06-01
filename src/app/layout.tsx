import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ChatGPT95",
  description: "good afternoon in 1995",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
