
(function () {

  'use strict';

  const fs = require('fs');
  const funkyLogger = require('./funky-logger');
  const path = require('path');

  function validateConfig(config) {

    const basePath = path.join(__dirname, '..', '..');
    let extendedConfig = {};

    function recursiveMkDir(outDir) {
      let folders = outDir.split('/');
      let folderPath = basePath;
      folders.forEach((folder) => {
        if (folder) {
          folderPath = path.join(folderPath + '/' + folder);
          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
          }
        }
      });
    }

    const defaultConfig = {
      outDir: 'reports/code-duplicity',
      outFileName: 'jscpd-report.html',
      files: '**/*.{js,jsx,ts,tsx}',
      exclude: [],
      minLines: 5,
      minTokens: 70,
      blame: false,
      path: basePath,
      reporter: 'json'
    };

    if (config) {
      extendedConfig = defaultConfig;
      extendedConfig.outDir = config.outDir ? config.outDir : defaultConfig.outDir;
      extendedConfig.outFileName = config.outFileName ? config.outFileName : defaultConfig.outFileName;
      extendedConfig.files = config.files ? config.files : defaultConfig.files;
      extendedConfig.exclude = config.exclude ? config.exclude : defaultConfig.exclude;
      extendedConfig['min-lines'] = config.minLines !== 1 ? config.minLines : defaultConfig.minLines;
      extendedConfig['min-tokens'] = config.minTokens !== 1 ? config.minTokens : defaultConfig.minTokens;
      extendedConfig.blame = config.blame === true ? config.blame : defaultConfig.blame;
      extendedConfig.output = path.join(basePath, extendedConfig.outDir, 'jscpd.json');
    }

    recursiveMkDir(extendedConfig.outDir);

    return extendedConfig;

  }

  module.exports = validateConfig;

}());
