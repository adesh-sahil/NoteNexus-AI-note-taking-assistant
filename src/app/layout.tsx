import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Provider from "@/components/Provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteNexus",
  description: "AI note taking assistant, to write and organize your notes.",
  icons: {
    icon: ['/favicon.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <Head>
        <link rel="icon" href="logo.png" />
      </Head>
        <Provider>
          <body className={inter.className}>{children}</body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
