import NavBar from "@/app/components/NavBar";
import "./styles.css";

import { AuthContextProvider } from "@/app/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
       <NavBar />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
