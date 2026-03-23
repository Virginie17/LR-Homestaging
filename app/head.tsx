import { Metadata } from 'next';

import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: "Home staging La Rochelle - LR HomeStaging",
  description: "Vendez votre bien plus vite grâce au home staging à La Rochelle",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.png" />
        <GoogleTagManager gtmId="G-XXXXXXXXXX" />
      </head>
      <body>{children}</body>
    </html>
  );
}