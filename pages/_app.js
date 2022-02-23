import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import store from '../store/store';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Sign from '../components/Sign';
import createTheme from '../theme';
import '../styles/main.scss';
import '../styles/personalSetting.scss';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const {
    isLogin,
    isOpen,
    content,
    openSignDialog,
    closeSignDialog,
    registerSignDialog,
    loginSignDialog,
  } = store.getState().sign;
  return (
    <ReduxProvider store={store}>
      <Head>
        <title>Home | ThinkMoreForum</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={createTheme()}>
          <Layout>
            <>
              <Component {...pageProps} />
              <Navbar isLogin={isLogin}>
                <Sign
                  isOpen={isOpen}
                  content={content}
                  openSignDialog={openSignDialog}
                  closeSignDialog={closeSignDialog}
                  registerSignDialog={registerSignDialog}
                  loginSignDialog={loginSignDialog}
                />
              </Navbar>
            </>
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </ReduxProvider>
  );
};

export default MyApp;
