import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/Providers';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Code.Zen — codezen.dev",
  description: "Code.Zen — Aprenda desenvolvimento FullStack do zero ao emprego com projetos práticos, debugging, testes e gamificação.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${mono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-inter)]"><Providers>{children}</Providers></body>
    </html>
  );
}
