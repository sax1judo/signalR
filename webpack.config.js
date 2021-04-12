const path = require('path');

module.exports = {
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },
    entry: {
        testGame: ['@babel/polyfill', './src/index.jsx', './src/style/_index.scss']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            { test: /\.jpg$/, use: ['url-loader?mimetype=image/jpg'] },
            {
                test: /\.(gif|eot|woff|woff2|ttf|svg)$/,
                loaders: [
                    'url-loader'
                ]
            },
            { test: /\.png$/, use: ['url-loader?mimetype=image/png'] },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader' // translates CSS into CommonJS
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src', 'img:src', 'link:href'],
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.html']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public')
    }
};