import { AppProps } from 'next/app';
import '../index.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
    // <Layout>
      <Component {...pageProps} />
    // </Layout>
  )
}

export default MyApp;