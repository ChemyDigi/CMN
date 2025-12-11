import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"], // correct: singular 'weight' not 'weights'
});

export const metadata: Metadata = {
  title: "CMN Distributors Pvt Ltd",
  description: "Premium Tools, HVAC & Engineering Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.className} ${geistMono.className} ${poppins.className} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
