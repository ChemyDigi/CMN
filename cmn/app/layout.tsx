import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
});

export const metadata: Metadata = {
  title: "CMN Distributors Pvt Ltd",
  description: "Premium Tools, HVAC & Engineering Solutions",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
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

        {/* THIS IS REQUIRED FOR TOAST NOTIFICATIONS */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 6000, 
            style: {
              background: "black",
              color: "#F272A8",
              border: "1px solid #F272A8",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: "600",
            },
            success: {
              iconTheme: {
                primary: "#F272A8",
                secondary: "black",
              },
            },
            error: {
              iconTheme: {
                primary: "#F272A8",
                secondary: "black",
              },
            },
          }}
        />

      </body>
    </html>
  );
}
