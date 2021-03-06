const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const Cssnano = require('cssnano');
const PostcssPxtorem = require('postcss-pxtorem');

module.exports = (env, options) => {
  const production = options.mode === 'production';
  const cssMap = !production;
  const publicDir = production ? 'https://morganalf.github.io/FlatUI/' : '/';

  return {
    entry: './src/index.js',
    devServer: {
      overlay: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    devtool: production ? false : 'eval-sourcemap',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js',
      publicPath: publicDir,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: cssMap,
                  url: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: cssMap ? 'inline' : false,
                  plugins() {
                    if (production) {
                      return [
                        Autoprefixer,
                        Cssnano,
                        PostcssPxtorem({
                          rootValue: 14,
                          unitPrecision: 5,
                          propList: ['*', '!max-width', '!min-width'],
                          selectorBlackList: ['html'],
                          replace: true,
                          mediaQuery: false,
                          minPixelValue: 0,
                        }),
                      ];
                    }
                    return [
                      Autoprefixer,
                      PostcssPxtorem({
                        rootValue: 14,
                        unitPrecision: 5,
                        propList: ['*', '!max-width', '!min-width'],
                        selectorBlackList: ['html'],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0,
                      }),
                    ];
                  },
                },
              },
              'stylus-loader',
            ],
          }),
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
        {
          test: /\.svg$/,
          exclude: [
            path.resolve(__dirname, './src/fonts'),
          ],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.(ttf|woff|svg)$/,
          include: [
            path.resolve(__dirname, './src/fonts'),
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new HtmlWebpackPlugin({
        filename: 'account.html',
        template: path.resolve(__dirname, './src/pages/account/account.pug'),
      }),
      new HtmlWebpackPlugin({
        filename: 'contact.html',
        template: path.resolve(__dirname, './src/pages/contact/contact.pug'),
      }),
      new HtmlWebpackPlugin({
        filename: 'freelancers.html',
        template: path.resolve(__dirname, './src/pages/freelancers/freelancers.pug'),
      }),
      new HtmlWebpackPlugin({
        filename: 'get-started.html',
        template: path.resolve(__dirname, './src/pages/get-started/get-started.pug'),
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, './src/pages/index/index.pug'),
      }),
      new HtmlWebpackPlugin({
        filename: 'news.html',
        template: path.resolve(__dirname, './src/pages/news-page/news-page.pug'),
      }),
      new HtmlWebpackPlugin({
        filename: 'ui-kit.html',
        template: path.resolve(__dirname, './src/pages/ui-kit/ui-kit.pug'),
      }),
      new ExtractTextPlugin('styles.css'),
      new CopyWebpackPlugin([
        {
          from: './src/fonts',
          to: './fonts',
        },
        {
          from: './src/+(components|plugins|images|pages)/**/*.+(jpg|png|svg)',
          to: './images',
          flatten: true,
        },
        {
          from: './src/favicons/**/*.*',
          to: './',
          flatten: true,
        },
      ]),
    ],
  };
};
