const { join } = require('path');

const MODES = {
  local: 'local',
  security: 'security',
  staging: 'staging',
  production: 'production'
}

module.exports = (env, args) => {

  let plugins = [];
  let optimization = {};
  let mode = 'none';

  switch (args.server) {
    case (MODES.local): {
      optimization.minimize = false;
      mode = 'development';
      break;
    }
    case (MODES.security): {
      optimization.minimize = true;
      mode = 'production';
      break;
    }
    case (MODES.staging): {
      optimization.minimize = true;
      mode = 'production';
      break;
    }
    case (MODES.production): {
      optimization.minimize = true;
      mode = 'production';
      break;
    }
    default: {
      break;
    }
  }

  return {
    mode: mode,
    entry: {
      server: './application/server',
    },
    target: 'node',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    externals: [
      {
        formidable: 'commonjs formidable',
      },
      {
        uws: 'commonjs uws',
      },
      {
        ws: 'commonjs ws',
      }, 
      {
        'bin-wrapper': 'commonjs bin-wrapper',
      }, 
      {
        'socket.io': 'commonjs socket.io',
      }, 
      {
        'require_optional': 'commonjs require_optional',
      }, 
      {
        'mongodb-client-encryption': 'commonjs mongodb-client-encryption',
      }, 
      {
        'saslprep': 'commonjs saslprep',
      }
    ],
    output: {
      path: join(process.cwd(), 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' }
      ]
    },
    plugins: plugins,
    optimization: optimization,
    node: {
      __dirname: true
    }
  }

}