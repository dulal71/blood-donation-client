import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextThemeProvider from "@/provider/NextThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});


export const metadata = {
  title: "Blood Donation | Save Lives Today",
  description: "Join our blood donation platform to find donors, request blood, and help save lives in emergencies quickly and easily.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextThemeProvider>
         {children}
        </NextThemeProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
