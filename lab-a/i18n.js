const NextI18Next = require('next-i18next/dist/commonjs').default

const options = {
  defaultLanguage: 'ko',
  otherLanguages: ['en', 'ja'],
}
module.exports = new NextI18Next(options)
