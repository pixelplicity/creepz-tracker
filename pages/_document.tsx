import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-creepz-purple-dark">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Amatic+SC:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
