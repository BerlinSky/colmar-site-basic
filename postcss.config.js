module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer') ({
      browsers: ['last 2 versions', 'ie 11'],
      cascade: false,
      grid: true
    })
  ]
}  
