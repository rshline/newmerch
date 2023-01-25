import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { wrapper } from "../app/store";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps} }: AppProps,
  ...rest: any) {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer 
          position='top-center'
          autoClose={1500} 
        />
      </Provider>       
    </SessionProvider>
  )
}

export default MyApp
