import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LangProvider } from "@/lib/lang-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "تقييم عقاري مجاني — دبي",
  description:
    "اعرف خلال 3 دقايق إذا تقدر فعلاً تدخل سوق دبي العقاري. تقييم صريح بدون ضغط.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#09090B] text-[#F4F4F5] min-h-[100dvh]">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
