import React, { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import Router from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import NextClientOnly from '../components/NextClientOnly';
import store from '../store/store';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import createTheme from '../theme';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import Loading from '../components/Loading/Loading';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });
  return (
    <ReduxProvider store={store}>
      <NextNProgress />
      <Head>
        <title>Home | ThinkMoreForum</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={createTheme()}>
          <Layout>
            <NextClientOnly>
              <Toaster position="top-center" reverseOrder={false} />
              <Navbar />
            </NextClientOnly>
            {isLoading ? <Loading /> : <Component {...pageProps} />}
            {isLoading ? <Loading /> : <Footer />}
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </ReduxProvider>
  );
};

export default MyApp;
