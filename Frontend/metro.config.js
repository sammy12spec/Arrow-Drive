const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude build artifacts and heavy version control folders from watching
config.resolver.blockList = [
  /.*\/node_modules\/.*\/node_modules\/.*/,
  /.*\.git\/.*/,
  /.*\.expo\/.*/,
];

// Extend watch timeout for Windows file systems
config.watcher = {
  ...config.watcher,
  watchman: {
    deferStates: ['hg.update'],
  },
  healthCheck: {
    enabled: false,
  },
};

module.exports = config;