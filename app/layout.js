import "./globals.css";
import Navbar from "@/src/components/Navbar";
import FootBar from "@/src/components/FootBar";
import { Provider } from "react-redux";
import { Poppins } from "next/font/google";
import Providers from "@/src/components/Providers";

export const metadata = {
  title: 'Big4Bytes',
  description: 'Big4Bytes brings together top tech blogs in one place.',
  icons: {
    icon: "favicon/favicon.ico", 
  },
  other: {
    'google-site-verification': 'uNsBlZNuSE8qQ0L-yp_JBF4_amWpPjwenWganKh_REQ',
  },
};

// Load Inter font
const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter", // Optional CSS variable
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main className="min-h-scrren">
          <Providers>{children}</Providers>
        </main>
        <FootBar />
      </body>
    </html>
  );
}
