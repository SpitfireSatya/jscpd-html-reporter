
(function () {

  'use strict';

  const handlebars = require('handlebars');
  const fs = require('fs');
  const funkyLogger = require('./funky-logger');
  const path = require('path');

  function generateHtmlReport(data, config, done) {

    console.info(funkyLogger.color('cyan', 'Writing data...'));

    fs.readFile(__dirname + '/html-report-template.html', 'utf8', (error, template) => {

      const compiledTemplate = handlebars.compile(template, {});
      const html = compiledTemplate(data);

      fs.writeFile(path.join(config.path, config.outDir, config.outFileName), html, 'utf8', () => {
        console.info(funkyLogger.color('green', 'Data write complete.'));
        done();
      });

    });

  }

  module.exports = generateHtmlReport;
  
}());
