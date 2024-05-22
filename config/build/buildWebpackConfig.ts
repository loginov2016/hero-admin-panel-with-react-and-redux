import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders }   from './buildLoaders';
import { buildPlugins }   from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';
import type { Configuration as devServerConfiguration } from 'webpack-dev-server';



export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const {mode, paths} = options
  const isDev = mode === 'development';
    return {
        mode: mode ?? 'development',
        entry: paths.entry, //path.resolve(__dirname, 'src', 'index.tsx')
        output: {
            path: paths.output, //path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true, // Удаляет старые файлы в папке build
          },
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,
        plugins: buildPlugins(options),
        module: {
            //Нажмите Ctrl + кликните на rules чтобы узнать union type rules.
            rules: buildLoaders(options),
          },
          resolve: buildResolvers(options),
    }
}