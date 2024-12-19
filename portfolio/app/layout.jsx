import { Providers } from "@/components/providers/Providers";
import { Outfit, Plus_Jakarta_Sans, Raleway } from "next/font/google";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import { Toaster } from "@/components/ui/toaster";
import NeuralBackground from "@/components/layout/NeuralBackground";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata = {
  title: "Fei Lin - Software Engineer",
  description:
    "Welcome to Fei Lin's portfolio! Explore my work as a software engineer, blending full-stack development with data-driven solutions.",
  openGraph: {
    title: "Fei Lin - Software Engineer",
    description: "Crafting digital experiences with purpose.",
    url: "https://walletkun.com",
    siteName: "Fei Lin Portfolio",
    images: [
      {
        url: "/social_preview.png",
        width: 1200,
        height: 630,
        alt: "Fei Lin Portfolio Cover Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fei Lin - Software Engineer",
    description: "Crafting digital experiences with purpose.",
    images: ["/social_preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />

        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Fei Lin's Portfolio - Software Engineer"
        />
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} ${raleway.variable}`}
      >
        <Providers>
          <RootLayoutClient>
            <NeuralBackground/>
            {children}
            <Toaster />
          </RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
