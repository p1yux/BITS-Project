import { Geist, Geist_Mono } from "next/font/google";
import { AudioProvider } from "@/context/AudioContext";
import AudioControl from "@/components/custom/AudioControl";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BITS 2025 - Technology Summit",
  description: "The biggest technology summit of the year. Experience innovation, connect with industry leaders, and shape the future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AudioProvider>
            {children}
            <AudioControl />
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
