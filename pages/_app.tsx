import type { AppProps } from 'next/app'
import '../styles/normalize.css';
import {Web3ContextProvider} from "../context/Web3Context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
     <Component {...pageProps} />
    </Web3ContextProvider>
  )
}

export default MyApp
