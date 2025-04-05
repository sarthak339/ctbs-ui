'use client'

import "./globals.css";
import Navbar from  "@/src/components/Navbar"; 
import FootBar from "@/src/components/FootBar";
import { Provider } from 'react-redux';
import { store } from '../src/store/store'; 

import { Poppins } from 'next/font/google'
import { Toaster } from "react-hot-toast";

// Load Inter font
const inter = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter', // Optional CSS variable
})


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        
        <Navbar/>
        <main className="min-h-scrren">
        <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
          {children}
        </Provider>
        </main>
        <FootBar/>
      </body>
    </html>
  );
}
