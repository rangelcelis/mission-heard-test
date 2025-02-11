import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Heard',
  description: 'Test assignment for developer role in Heard.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased py-12 max-w-screen-xl min-h-dvh m-auto`}
      >
        {children}
        <footer className="flex items-center justify-center p-4">
          <a
            className="flex items-center hover:underline hover:underline-offset-4"
            href="https://github.com/rangelcelis"
            target="_blank"
            rel="noopener noreferrer"
          >
            Develop by: @rangelcelis
          </a>
        </footer>
      </body>
    </html>
  );
}
