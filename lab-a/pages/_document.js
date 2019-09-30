import Document, { Head, Main, NextScript } from 'next/document';

export default class RootDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        
    
        return { ...initialProps };
    }
    render() {
        return (
            <html lang={this.props.__NEXT_DATA__.props.initialProps.initialLanguage}>
                <Head>
                    <link rel="shortcut icon" href="" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}