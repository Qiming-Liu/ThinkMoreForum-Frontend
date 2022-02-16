import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import store from '../store/store';
import Layout from '../components/Layout';
import createTheme from '../theme';
import LoginDialog from '../components/login/LoginDialog';
import Login from '../components/login';
import LoginFBGoogle from '../components/thirdpartylogin';
import '../styles/main.scss';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
      <Head>
        <title>ThinkMoreForum</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <ThemeProvider theme={createTheme()}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
        <LoginDialog>
          <Login />
        </LoginDialog>
        <LoginFBGoogle />
      </SessionProvider>
    </ReduxProvider>
  );
};

export default MyApp;
