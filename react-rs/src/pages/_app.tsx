import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "../ThemeContext";
import store from "../store/store";
import "../index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
