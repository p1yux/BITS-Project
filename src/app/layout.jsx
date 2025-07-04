import { Inter } from 'next/font/google'
import { AudioProvider } from "@/context/AudioContext";
import AudioControl from "@/components/custom/AudioControl";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/custom/Navigation/Navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "BLITS - Technology Summit",
  description: "The biggest technology summit of the year. Experience innovation, connect with industry leaders, and shape the future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <AudioProvider>
            <Navbar />
            {children}
            <AudioControl />
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
