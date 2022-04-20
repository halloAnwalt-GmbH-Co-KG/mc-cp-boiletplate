const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested'),
        purgecss({
            content: ['./src/**/*.handlebars'],
            // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
    ]
}