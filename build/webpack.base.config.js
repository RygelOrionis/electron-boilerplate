const path = require("path");
const LwcWebpackPlugin = require('lwc-webpack-plugin');
const nodeExternals = require('webpack-node-externals'); 


const envName = (env) => {
  if (env.production) {
    return "production";
  }
  if (env.test) {
    return "test";
  }
  return "development";
};

const envToMode = (env) => {
  if (env.production) {
    return "production";
  }
  return "development";
};

module.exports = env => {
  return {
    
    target: "electron-renderer",
    mode: envToMode(env),
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      modules:  ['node_modules'],
      alias: {
        env: path.resolve(__dirname, `../config/env_${envName(env)}.json`),
      }
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          exclude: [/node_modules/, /src/]
      }
      ]
    },
    plugins: [
      new LwcWebpackPlugin({
          modules: [
              {dir: "src/modules"},
              { npm: 'lwc-recipes-oss-ui-components' },
              { npm: 'lightning-base-components' },
              { npm: '@salesforce-ux/design-system' },
          ]
      }
      ),
      {
        apply(compiler) {
          compiler.options.module.rules.push({
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-typescript'],
                plugins: [['@babel/plugin-syntax-decorators', { legacy: true }]],
              }
            }
          })
        }
      }
  
    ],
  };
};
