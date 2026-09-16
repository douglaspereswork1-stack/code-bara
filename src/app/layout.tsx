import type { Metadata, Viewport } from "next";
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
  title: {
    default: "Code.Zen — Aprenda FullStack do Zero ao Emprego",
    template: "%s | Code.Zen",
  },
  description: "Plataforma de aprendizado FullStack com projetos práticos, quizzes interativos, gamificação e trilha completa de estudos. Aprenda JavaScript, React, Node.js, Python, SQL, DevOps e mais.",
  keywords: ["fullstack", "desenvolvimento web", "programação", "javascript", "react", "node.js", "python", "sql", "curso online", "code.zen"],
  authors: [{ name: "Code.Zen" }],
  creator: "Code.Zen",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://devfullstack-lilac.vercel.app",
    siteName: "Code.Zen",
    title: "Code.Zen — Aprenda FullStack do Zero ao Emprego",
    description: "Plataforma de aprendizado FullStack com projetos práticos, quizzes interativos e gamificação.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code.Zen — Plataforma de Aprendizado FullStack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code.Zen — Aprenda FullStack do Zero ao Emprego",
    description: "Plataforma de aprendizado FullStack com projetos práticos, quizzes interativos e gamificação.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050914",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${mono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col font-[var(--font-inter)]"><Providers>{children}</Providers></body>
    </html>
  );
}
