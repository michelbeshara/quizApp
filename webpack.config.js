const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  // entry: './main.ts', // single entry points
  entry: {
    vendor: './vendor.ts',
    app: './main.ts',
    styles: './styles.scss'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // do this for multiple entry points
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      '.ts', '.js', '.html', '.scss'
    ],
    modules: ['node_modules']
  },
  module: {
    // loaders
    rules: [
      {
        test: /\.html$/,
        use: 'raw-loader'
      }, {
        //.ts has to come at the end of the file name
        test: /\.ts?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(__dirname, 'src', 'tsconfig.json')
            }
          },
          'angular2-template-loader'
        ]
      }, {
        test: /\.(sass|scss)$/,
        use: ['raw-loader', 'sass-loader']
      }, {
        // global sass/scss loader
        test: {
          and: [/\.(scss|sass)$/, /src\/scss/]
        },
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'index.html'}),
    new ExtractTextPlugin({ // define where to save the files
      filename: 'styles.css',
      allChunks: true
    }),
    new CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}),
    new CircularDependencyPlugin({exclude: /node_modules/g}),
    new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.resolve(__dirname, 'src'))

  ],
  devServer: {
    port: 4000
  }
}
