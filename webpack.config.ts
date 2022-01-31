import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';
import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

enum CHUNKS {
    main = 'main',
}

const config: Configuration = {
    entry: {
        [CHUNKS.main]: './src/index.tsx',
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.module\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /\.module\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new TsCheckerPlugin({
            async: false,
        }),
        new HtmlWebpackPlugin({
            title: 'React Typescript Template',
            chunks: [CHUNKS.main],
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        clean: true,
    },
    devServer: {
        static: path.join(__dirname, 'build'),
        compress: true,
        port: 4000,
        // devMiddleware: {
        //     writeToDisk: true
        // }
    },
};

export default config;
