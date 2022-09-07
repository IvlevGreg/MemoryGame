const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const imgLoaderProduction = (isPod) => {
  if(isPod) {
    return  {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        {
          loader: ImageMinimizerPlugin.loader,
          options: {
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  "imagemin-gifsicle",
                  "imagemin-mozjpeg",
                  "imagemin-pngquant",
                  "imagemin-svgo",
                ],
              },
            },
          },
        },
      ],
    }
  } else { return {}}
}

const jsLoaders = (isPod) => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']}
      }
  ]

  if(!isPod) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = (env) => ( {
  target: 'web',
    entry: {
      index: './src/index.js',
      modules: './src/modules.js'},
    output: {
      filename: env.prod ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: jsLoaders(env.prod),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']}
            }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        imgLoaderProduction(env.prod),
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.scss$/i,
          use: [
            // Creates `style` nodes from JS strings
            env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: env.prod ? '[name].[contenthash].html' : 'index.html'
      }),
      new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css'
        }),
      new ESLintPlugin(),
    ],
    devServer: {
      watchFiles: {
        paths: ['src/**'],
        options: {
          usePolling: false,
        },
      },
      port: 9000,
    },
    devtool: env.prod ? false : 'source-map',
    
  }
)