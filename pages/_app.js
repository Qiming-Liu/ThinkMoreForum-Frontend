import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import store from '../store/store';
import Layout from '../components/Layout';
import createTheme from '../theme';
import '../styles/main.scss';
import '../styles/personalSetting.scss';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
        <Head>
          <title>ThinkMoreForum</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={createTheme()}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </ReduxProvider>
  );
};

export default MyApp;
