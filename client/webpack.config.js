const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
   return {
      mode: 'development',
      entry: {
         main: './src/js/index.js',
         install: './src/js/install.js'
      },
      output: {
         filename: '[name].bundle.js',
         path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
         // workbox plugins
         new HtmlWebpackPlugin({
            template: "./index.html",
            title: "Webpack Plugin",
         }),
         new InjectManifest({
            swSrc: "./src-sw.js",
            swDest: "service-worker.js",
         }),
         new WebpackPwaManifest({
            name: "JATE - Just Another Text Editor",
            short_name: "JATE",
            description: "A simple text editor.",
            background_color: "#ffffff",
            theme_color: "000000",
            start_url: "/",
            publicPath: "/",
            fingerprints: false,
            inject: true,
            icons: [
               {
                  src: path.resolve('src/images/logo.png'),
                  sizes: [96, 128, 192, 256, 384, 512],
                  destination: path.join('assets', 'icons'),
               },
            ],
         }),
      ],

      module: {
         rules: [

         ],
      },
   };
};
