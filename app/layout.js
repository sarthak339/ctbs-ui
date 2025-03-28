
import "./globals.css";
// import Navbar from  "@/src/components/Navbar"; 
// import FootBar from "@/src/components/FootBar"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar/> */}
        {children}
        {/* <FootBar/> */}
      </body>
    </html>
  );
}
