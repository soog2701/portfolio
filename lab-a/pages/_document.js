// import Document, { Head, Main, NextScript } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class RootDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        
    
        return { ...initialProps };
    }
    // lang={this.props.__NEXT_DATA__.props.initialProps.initialLanguage}
    render() {
        return (
            <Html >
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>           
        );
    }
}