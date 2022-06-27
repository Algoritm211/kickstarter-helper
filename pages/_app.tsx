import type { AppProps } from 'next/app'
import '../styles/normalize.css';
import NextNprogress from 'nextjs-progressbar'
import {Web3ContextProvider} from "../src/context/Web3Context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <NextNprogress
        showOnShallow
        color="yellow"
        nonce="my-nonce"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ easing: "ease", speed: 500 }}
      />
     <Component {...pageProps} />
    </Web3ContextProvider>
  )
}

export default MyApp
