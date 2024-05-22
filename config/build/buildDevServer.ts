import type { Configuration as devServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): devServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        //Если раздавать статику через nginx, то надо делать проксирование на index.html.
        historyApiFallback: true
    }
}