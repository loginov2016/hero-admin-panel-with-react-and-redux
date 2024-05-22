import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';
  
  /* const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    }
  }; */

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      //Добавляем в место 'style-loader
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Creates `style` nodes from JS strings
      //"style-loader",
      // Translates CSS into CommonJS
      //cssLoaderWithModules,
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };
  /* const tsLoader = {
    // ts-loader из коробки умеет работать с JSX.
    // Если бы мы не использовали typescript нужно было подключать babel-loader.
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }; */

  const tsLoader = {
    // ts-loader из коробки умеет работать с JSX.
    // Если бы мы не использовали typescript нужно было подключать babel-loader.
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        // Для ускорения сборки, ошибки typescript не принимаются во внимание.
        options: {
          transpileOnly: isDev
        }
      }
    ]
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    exclude: /node_modules/,
    type: 'asset/resource',
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
   
  }

  return [scssLoader, tsLoader, assetLoader, svgLoader];

}