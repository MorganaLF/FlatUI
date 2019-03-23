let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin =require('copy-webpack-plugin');

let conf = {
  entry: './src/index.js',
  devServer: {
    overlay: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'ui-kit.html',
      template: path.resolve(__dirname, './src/pages/ui-kit/ui-kit.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/pages/index/index.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'account.html',
      template: path.resolve(__dirname, './src/pages/account/account.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'news.html',
      template: path.resolve(__dirname, './src/pages/news-page/news-page.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'get-started.html',
      template: path.resolve(__dirname, './src/pages/get-started/get-started.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.html',
      template: path.resolve(__dirname, './src/pages/contact/contact.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'freelancers.html',
      template: path.resolve(__dirname, './src/pages/freelancers/freelancers.pug')
    }),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/components/**/*.jpg',
        to: './images',
        flatten: true
      },
      {
        from: './src/components/**/*.png',
        to: './images',
        flatten: true
      },
      {
        from: './src/components/**/*.svg',
        to: './images',
        flatten: true
      },
      {
        from: './src/plugins/**/*.svg',
        to: './images',
        flatten: true
      },
      {
        from: './src/plugins/**/*.jpg',
        to: './images',
        flatten: true
      },
      {
        from: './src/plugins/**/*.png',
        to: './images',
        flatten: true
      },
      {
        from: './src/pages/**/*.jpg',
        to: './images',
        flatten: true
      },
      {
        from: './src/favicons/**/*.*',
        to: './',
        flatten: true
      },
      {
        from: './node_modules/@fortawesome/fontawesome-free/webfonts',
        to: './webfonts',
        flatten: true
      }
    ]),
    require('autoprefixer'),
    //require('cssnano')
  ]

};

module.exports = (env, options) => {
  let production = options.mode === "production";

  conf.devtool = production ? false : "eval-sourcemap";

  let cssMap = !production;
  let publicDir = production ? "https://morganalf.github.io/FlatUI/dist/" : "/";

  conf.output = {
    path: path.resolve(__dirname, './dist'),
        filename: "main.js",
        publicPath: publicDir
  };

  conf.module = {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
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
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: cssMap ? 'inline' : false,
                plugins: function() {
                  if (production) {
                    return [
                      require('autoprefixer'),
                      require('cssnano')
                    ]
                  } else {
                    return [
                      require('autoprefixer')
                    ]
                  }
                }
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.(ttf|woff|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  };

  return conf;
};