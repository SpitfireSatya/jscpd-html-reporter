
(function () {

  'use strict';

  const handlebars = require('handlebars');
  const fs = require('fs');
  const funkyLogger = require('./funky-logger');
  const path = require('path');

  function generateHtmlReport(data, config) {

    console.info(funkyLogger.color('cyan', 'Writing data...'));

    const template = fs.readFileSync(__dirname + '/html-report-template.html', 'utf8');
    const compiledTemplate = handlebars.compile(template, {});
    const html = compiledTemplate(data);

    fs.writeFileSync(path.join(config.path, config.outDir, config.outFileName), html, 'utf8');

    console.info(funkyLogger.color('green', 'Data write complete.'));

  }

  module.exports = generateHtmlReport;
  
}());
