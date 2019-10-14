const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './app/**/*.html',
  ],

  // Include any special characters you're using in this regular expression
  // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  defaultExtractor: content => content.match(/[\w-/:]*[\w-/:]/g) || []
})
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer') ({
      browsers: ['last 2 versions', 'ie 11'],
      cascade: false,
      grid: true
    }),
    // ...process.env.NODE_ENV === 'production'
    //   ? [purgecss]
    //   : []
    purgecss
  ]
}
