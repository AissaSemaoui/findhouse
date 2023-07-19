import { Provider } from "react-redux";
import { store } from "../app/store";
import ScrollToTop from "../components/common/ScrollTop";
import Seo from "../components/common/seo";
import "../index.scss";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "../providers/AuthProvider";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Seo
        font={
          "https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
        }
      />
      <SessionProvider session={session}>
        <Provider store={store}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Provider>
      </SessionProvider>

      <ScrollToTop />
    </>
  );
}

export default MyApp;
