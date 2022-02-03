import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import '../styles/main.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
