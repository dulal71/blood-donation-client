import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
    >
      <body className="min-h-full flex flex-col">{children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
