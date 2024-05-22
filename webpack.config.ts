import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildMode, BuildPaths, BuildPlatform } from './config/build/types/types';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }
  const config: webpack.Configuration = buildWebpackConfig({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    platform: env.platform ?? 'desktop',
    paths,
  });

  return config;
};