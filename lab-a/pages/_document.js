import Document, { Head, Main, NextScript } from 'next/document';
import { lngFromReq } from 'next-i18next/dist/commonjs/utils';
// css
import styles from "../static/css/app.scss"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);    
    return { ...initialProps };
  }

  render() {
    return (
      <html lang={this.props.__NEXT_DATA__.props.initialProps.initialLanguage}>
        <Head>
            <style global jsx>{`
                html.height100, body.height100{
                    height: 100%;
                }
                #__next.height100{
                    height: 100%;
                }
            `}</style>
            <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
            {/* <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet"></link> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css" />       
        </Head>
        <body className={styles.platform}>            
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}