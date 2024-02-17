import "../styles/global.scss";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css"; //core css
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "mapbox-gl/dist/mapbox-gl.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StyledComponentsRegistry from "./registry";
import { GlobalStyle } from "../styles/styledComponents/GlobalStyled";
import { FlickityStyle } from "@/styles/styledComponents/FlickityStyled";
import ButtonHome from "@/components/ButtonHome";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TMS Daihatsu",
  description: "",
  icons: {
    icon: ["./favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <Providers>
          <GlobalStyle />
          <FlickityStyle />
          <body className={inter.className}>
            <Header />
            {children}
            <ButtonHome />
            <Footer />
          </body>
        </Providers>
      </StyledComponentsRegistry>
    </html>
  );
}
