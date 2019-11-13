const path = require('path');
// const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');
const fs = require('fs');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cleanWebPackPlugin = new CleanWebpackPlugin([path.resolve(__dirname, 'dist')])

const entryConfig = {
  vendor: ['ramda'],
  main: [
    path.resolve(__dirname, 'app/js/main.js'),
    path.resolve(__dirname, 'app/sass/main.scss')
  ]
}

const outputConfig = {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].js'
  // filename: 'bundle.[name].[chunkhash].js'
  // filename: '[name].[chunkhash].js'
}

const jsRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader'
    },
    {
      loader: 'eslint-loader'
    }
  ]
}

const sassRules = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        sourceMap: true
      }
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: 'inline'
      }
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true
      }
    }
  ]
}

const htmlRules = {
  test: /\.html$/,
  exclude: /node_modules/,
  use: ['html-loader']
}

const fontRules = {
  test: /\.(ttf|otf|eot|svg|woff2|woff(2)?)(\?[a-z0-9]+)?$/,
  exclude: '/app/images/',
  use: [
    {
      loader: 'file-loader',
      options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
    }
  ]
}

const imageRules = {
  test: /\.(jpg|png|ico|svg)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images/',
      }
    }
  ]
}

const optimization = {
  splitChunks: {
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        chunks: "async",
        priority: 1
      },
    }
  }
}

const createHtmlPluginList = (templateDir) => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]

    return new HtmlWebPackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

const htmlPlugins = createHtmlPluginList('./app/html/')

module.exports = {
  entry: entryConfig,

  output: outputConfig,

  optimization: optimization,

  target: "web",

  devtool: "source-map",

  module: {
    rules: [
      jsRules,
      sassRules,
      htmlRules,
      fontRules,
      imageRules
    ]
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  plugins: [
    cleanWebPackPlugin,

    new MiniCssExtractPlugin({
      filename: "main.css"
      // filename: "main.[contenthash].css"
    }),

    // new HtmlWebPackPlugin({
    //   favicon: 'app/favicon.png',
    //   // hash: true,
    //   template: './app/html/layout.html',
    //   filename: 'layout.html',
    // }),

    // new HtmlWebPackPlugin({
    //   favicon: 'app/favicon.png',
    //   // hash: true,
    //   template: './app/html/header.html',
    //   filename: 'index.html',
    // }),

    new WebpackMd5Hash()

  ].concat(htmlPlugins),

  watch: true,

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    host: 'localhost',
    port: 9090,
    // openPage: 'index.html',
    open: 'Google Chrome',
    watchContentBase: true,
    // writeToDisk: true
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 600
    },
  }
};
