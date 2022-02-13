import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import store from '../store/store';
import LoginDialog from '../components/login/LoginDialog';
import Login from '../components/login';
import '../styles/main.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default MyApp;
