import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {

  const {pathname} = useRouter();
  let showNavbar = true;

  if (pathname === "/login" || pathname === "/signup") {
    showNavbar = false;
  }
  
  return (
    <SessionProvider session={pageProps.session}>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
