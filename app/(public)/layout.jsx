
import Navbar from "@/src/components/Navbar";
import FootBar from "@/src/components/FootBar";
import Providers from "@/src/components/Providers";
import { SelectionProvider } from "@/src/context/selectionContext";


export default function PublicLayout({ children }) {
  return (<>
        <Navbar />
          <Providers>
            <SelectionProvider>
            {children}
            </SelectionProvider>
            </Providers>
        <FootBar />
        </>

  );
}
