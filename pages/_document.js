import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta
            name="keywords"
            content="ThinkMore Community Forum Github Qiming-Liu"
          />
          <meta name="referrer" content="always" />
          <meta property="og:image" content="/home-preview.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1201" />
          <meta property="og:image:height" content="751" />
          <meta property="og:title" content="thinkmore." />
          <meta
            property="og:description"
            content="ThinkMore Forum is place for people to make any kind of disscusion, where people come together to share their opinion."
          />
          <meta property="og:site_name" content="ThinkMore Community Forum" />
          <meta property="og:url" content="https://www.thinkmoreapp.com/" />
          <meta name="robots" content="index, follow" />
          <link rel="shortcut icon" href="/logo.svg" />
          <link rel="apple-touch-icon" href="/logo.svg" />
          <link rel="canonical" href="https://www.thinkmoreapp.com/" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=optional"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
