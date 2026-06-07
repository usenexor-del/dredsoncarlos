import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Edson Carlos | Harmonização Facial · Tatuapé, SP",
  description:
    "Agende sua harmonização facial, botox, preenchimento labial e rinomodelação com o Dr. Edson Carlos no Tatuapé. Resultados naturais e seguros.",
  keywords: [
    "harmonização facial tatuapé",
    "botox tatuapé",
    "preenchimento labial sp",
    "dr edson carlos",
    "harmonização masculina",
    "rinomodelação sp",
  ],
  openGraph: {
    title: "Dr. Edson Carlos | Harmonização Facial",
    description: "Agende online em segundos. Resultados naturais e seguros no Tatuapé, SP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-cream-100 text-green-900 antialiased">{children}</body>
    </html>
  );
}
