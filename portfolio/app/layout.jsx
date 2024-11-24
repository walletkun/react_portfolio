import { Providers } from "@/components/providers/Providers";
import { Outfit, Plus_Jakarta_Sans, Raleway } from "next/font/google";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import { Toaster } from "@/components/ui/toaster";
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
  title: "Fei's Portfolio",
  description: "Crafting Digital Experiences with Purpose",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${jakarta.variable} ${raleway.variable}`}
      >
        <Providers>
          <RootLayoutClient>
            {children}
            <Toaster />
          </RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
