import webpack, { Configuration, DefinePlugin } from 'webpack';
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export function buildPlugins({ mode, paths, platform}: BuildOptions): Configuration['plugins']{
  const isDev  = mode === 'development';
  const isProd = mode === 'production';
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.html }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform)
    })
  ];
  
  if(isDev) {
    plugins.push( new webpack.ProgressPlugin() );
    // Выносит проверку типов в отдельный процесс: не нагружая сборку.
    plugins.push( new ForkTsCheckerWebpackPlugin() );
  }

  if( isProd ) {
    plugins.push( new MiniCssExtractPlugin(
      {
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }) );
  }

  return plugins;
}