
(function () {

  'use strict';

  const validateConfig = require('./validate-config');
  const jscpdReport = require('./jscpd-report');
  const generateHtmlReport = require('./generate-html-report');
  const funkyLogger = require('./funky-logger');
  const path = require('path');

  function jscpdHtmlReporter(userConfig, done) {

    console.log(funkyLogger.color('cyan', 'jscpd-html-report started\n'));

    const config = validateConfig(userConfig);
    jscpdReport(config)
      .then((result) => {
        generateHtmlReport(result, config, () => {
            console.log('\n');
          console.log(funkyLogger.color('green', 'jscpd-html-report completed'));
          console.log(funkyLogger.color('cyan', 'Report written to: '),
            funkyLogger.color('magenta', path.join(config.path, config.outDir, config.outFileName)));
          if (done) {
            done();
          }
        });
      });

  }

  module.exports = jscpdHtmlReporter;

}());
