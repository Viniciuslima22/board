import { AppProps } from 'next/app'
import '../styles/global.scss'
import Header from '../components/Header'
import { Provider as NextAuthProvider} from 'next-auth/client'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

function MyApp({ Component, pageProps }: AppProps) {

 const initialOptions ={
  "client-id": "AUlvaEaoFZnh4omxaG82Q_gXg8wIn_blwvUSRRRupBjUK4mYilkfFTG0SZVAhZD90MfPcl8UQXfhqKb0",
  currency: "BRL",
  intent: "capture",
 }


  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
    <Header/>
  <Component {...pageProps} />
  </PayPalScriptProvider>
  </NextAuthProvider>
  )
}

export default MyApp
