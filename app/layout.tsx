import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import NowPlayingBar from "@/components/NowPlayingBar/NowPlayingBar";
import PageTransition from "@/components/PageTransition/PageTransition";
import { PlayerProvider } from "@/context/PlayerContext";
import { ToastProvider } from "@/context/ToastContext";
import "../styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RemixHub",
  description:
    "La plataforma donde los productores comparten sus remixes y la comunidad los vive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <PlayerProvider>
          <ToastProvider>
            <Header />
            <PageTransition>{children}</PageTransition>
            <NowPlayingBar />
          </ToastProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
