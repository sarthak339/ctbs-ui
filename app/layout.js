'use client'

import "./globals.css";
import Navbar from  "@/src/components/Navbar"; 
import FootBar from "@/src/components/FootBar";
import { Provider } from 'react-redux';
import { store } from '../src/store/store'; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <Navbar/>
        <main className="min-h-scrren">
        <Provider store={store}>
          {children}
        </Provider>
        </main>
        <FootBar/>
      </body>
    </html>
  );
}
