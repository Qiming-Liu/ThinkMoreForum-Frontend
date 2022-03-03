import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import NextClientOnly from '../components/NextClientOnly';
import store from '../store/store';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import createTheme from '../theme';
import 'antd/dist/antd.css';
import '../styles/main.scss';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => (
  <ReduxProvider store={store}>
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
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  </ReduxProvider>
);

export default MyApp;
