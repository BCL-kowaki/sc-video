import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import CategoryNavWrapper from "@/components/CategoryNavWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BioVault Movie｜株式会社SCPP",
  description: "お客様向け動画保管・閲覧サイト",
};

function HeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] border-b border-[var(--border-color)]">
      <div className="flex items-center justify-between gap-3 px-3 md:px-6 py-[10px] md:py-[15px]">
        <div className="w-[100px] md:w-[120px] h-8 bg-[var(--card-bg)] rounded animate-pulse" />
        <div className="flex-1 md:w-1/2 max-w-xl h-9 bg-[var(--card-bg)] rounded-full animate-pulse" />
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} antialiased`}>
        <Suspense fallback={<HeaderFallback />}>
          <Header />
        </Suspense>
        <main className="pt-12 md:pt-20">
          <div className="max-w-[960px] mx-auto px-4 pt-2">
            <Suspense fallback={<div className="h-12 border-b border-[var(--border-color)]" />}>
              <CategoryNavWrapper />
            </Suspense>
          </div>
          {children}
        </main>
        <footer className="border-t border-[var(--border-color)] py-6">
          <p className="text-center text-[var(--secondary-text)] text-xs">
            &copy; 株式会社SCPP All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
