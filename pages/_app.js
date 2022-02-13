import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import Head from 'next/head';
import LoginDialog from '../components/login/LoginDialog'
import Login from '../components/login/index.js'
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=optional"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Component {...pageProps} />
      <LoginDialog>
      <Login/>
      </LoginDialog>
    </Provider>
  );
};

export default MyApp;
