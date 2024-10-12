import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import ReduxProvider from "@/components/provider/ReduxProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TeachHub",
  description: "가르치다(Teach)와 허브(Hub)의 조합으로, 강사가 강의를 공유하고 학생이 학습하는 중심지라는 의미입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
				<ReduxProvider>
					{children}
				</ReduxProvider>
      </body>
    </html>
  );
}
