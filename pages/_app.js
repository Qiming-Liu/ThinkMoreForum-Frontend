import React, { useState, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import Router from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import NextClientOnly from '../components/NextClientOnly';
import store from '../store/store';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import { WSContextProvider } from '../contexts/WebsocketContext';
import createTheme from '../theme';
import GitHubButton from 'react-github-btn';
import 'antd/dist/antd.css';
import '../styles/main.scss';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <WSContextProvider>
        <NextNProgress />
        <Head>
          <title>Home | ThinkMore Forum</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={createTheme()}>
          <CssBaseline />
          <Layout>
            <NextClientOnly>
              <Toaster position="top-center" reverseOrder={false} />
              <Navbar />
            </NextClientOnly>
            {isLoading ? <Loading /> : <Component {...pageProps} />}
          </Layout>
          <NextClientOnly>
            {process.env.NEXT_PUBLIC_PREVIEW_ENABLED && (
              <Snackbar open={true} autoHideDuration={5000}>
                <Alert variant="filled" severity="info">
                  <AlertTitle>
                    Preview Version
                  </AlertTitle>
                  <GitHubButton
                    href="https://github.com/Qiming-Liu/ThinkMoreForum-Frontend"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star Qiming-Liu/ThinkMoreForum-Frontend on GitHub"
                  >
                    Get Full Version Here
                  </GitHubButton>
                </Alert>
              </Snackbar>
            )}
          </NextClientOnly>
        </ThemeProvider>
      </WSContextProvider>
    </ReduxProvider>
  );
};

export default MyApp;
