import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Qraft - Free QR Code Generator with Advanced Customization",
  description: "Create beautiful, customizable QR codes for free. Advanced styling options including gradients, logos, custom shapes, and more. Export as PNG, SVG, or JPEG.",
  keywords: ["QR code generator", "free QR codes", "custom QR codes", "QR code with logo", "gradient QR code", "QR code design"],
  authors: [{ name: "Qraft" }],
  openGraph: {
    title: "Qraft - Free QR Code Generator",
    description: "Create beautiful, customizable QR codes with unlimited styling options",
    type: "website",
    url: "https://qraft.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qraft - Free QR Code Generator",
    description: "Create beautiful, customizable QR codes with unlimited styling options",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {children}
      </body>
    </html>
  );
}
