import { CrispProvider } from "@/components/customComponents/crisp/crisp-provider";
import { ModalProvider } from "@/components/customComponents/modal-provider";
import { ToasterProvider } from "@/components/customComponents/toaster-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Include weights you want to use
// });
export const metadata: Metadata = {
  title: "Alix",
  description: "AI generated plattform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <body
          className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        > */}
        <CrispProvider />
        <body className={` antialiased`}>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
