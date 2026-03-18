import { Metadata } from 'next';

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
      </head>
      <body>{children}</body>
    </html>
  );
}
