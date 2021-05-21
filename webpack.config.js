const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        }
    };

    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new CssMinimizerWebpackPlugin(),
        ];
    }

    return config;
}

const getPattern = (ext) => isDev ? `[name].${ext}` : `[name][contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, './src'),

    entry: {
        main: './index.js',
    },

    output: {
        filename: getPattern('js'),
        path: path.resolve(__dirname, './dist'),
    },

    optimization: optimization(),

    devServer: {
        port: 4200,
    },

    plugins: [
        new CleanWebpackPlugin(),

        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './assets/favicon.ico',
                    to: path.resolve(__dirname, './dist'),
                },
            ],
        }),

        new MiniCssExtractPlugin({
            filename: getPattern('css'),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: ['file-loader'],
            },
        ],
    },
};