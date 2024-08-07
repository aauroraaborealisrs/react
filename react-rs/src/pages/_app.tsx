import { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import "../index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
