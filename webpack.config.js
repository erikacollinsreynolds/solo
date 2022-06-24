const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //mode: tells webpack to run either production or development
    mode: process.env.NODE_ENV,

    //entry: tells webpack where our top most level of our front end is so that can start compiling
    entry: {
        src: './client/index.html'
    },

    //output: tells webpack where to output our compiled file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    module: {
        rules: [
            {
                test: /\.jsx?/, //tests for any js/jsx files
                exclude: /node_modules/, //exclude any files inside node modules folder
                loader: 'babel-loader',
                options: {
                    //for babel-loader 8.x | babel 7.x
                    presets: ['@babel/env', '@babel/react']
                    //vs. ['env', 'react'] for babel-loader 7.x | babel 8.x
                }
            },
            {
                test: /\.s?css/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './client/index.html'
        }),
    ],

    devServer: {
        static: {
            publicPath: '/build',
            directory: path.resolve(__dirname, 'build')
        },
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
}