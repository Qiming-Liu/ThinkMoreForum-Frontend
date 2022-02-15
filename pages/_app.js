import React from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import store from '../store/store';
import LoginDialog from '../components/login/LoginDialog';
import Login from '../components/login';
import LoginFBGoogle from '../components/thirdpartylogin';
import '../styles/main.scss';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <Provider store={store}>
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
        <Component {...pageProps} />
        <LoginDialog>
          <Login />
        </LoginDialog>
        <LoginFBGoogle />
      </SessionProvider>
    </Provider>
  );
};

export default MyApp;
