
(function () {

  'use strict';

  const jscpd = require('jscpd');

  function jscpdReporter(config) {

    const jscpdOutput = {
      statistics: {},
      clones: []
    };
    const jscpdConfig = {
      path: config.path,
      files: config.files,
      output: config.output,
      exclude: config.exclude,
      reporter: config.reporter,
      minLines: config.minLines,
      minTokens: config.minTokens,
      blame: config.blame
    };

    const result = config.blame ? new jscpd().run(jscpdConfig) : Promise.resolve(new jscpd().run(jscpdConfig));

    return result.then((report) => {

      jscpdOutput.statistics = report.report.statistics;

      for (let i = 0; i < report.map.clones.length; i++) {
        let index1 = 0, index2 = 0;
        report.report.duplicates[i] = report.report.duplicates[i].fragment.split('\r\n');
        jscpdOutput.clones.push({
          index: i + 1,
          firstFile: report.map.clones[i].firstFile,
          secondFile: report.map.clones[i].secondFile,
          firstFileStart: report.map.clones[i].firstFileStart,
          secondFileStart: report.map.clones[i].secondFileStart,
          linesCount: report.map.clones[i].linesCount,
          tokensCount: report.map.clones[i].tokensCount,
          fragmentDetails: []
        });

        if (Object.keys(report.map.clones[i].firstFileAnnotatedCode).length === 0) {

          for (let j = 0; j < report.report.duplicates[i].length; j++) {
            jscpdOutput.clones[i].fragmentDetails.push({
              author1: 'NA',
              file1Line: report.map.clones[i].firstFileStart + j,
              fragment: report.report.duplicates[i][j],
              author2: 'NA',
              file2Line: report.map.clones[i].secondFileStart + j,
            });
          }

        } else {

          for (const key in report.map.clones[i].firstFileAnnotatedCode) {
            jscpdOutput.clones[i].fragmentDetails.push({
              author1: report.map.clones[i].firstFileAnnotatedCode[key].author,
              file1Line: key,
              fragment: report.report.duplicates[i][index1]
            });
            index1++;
          }

          for (const key in report.map.clones[i].secondFileAnnotatedCode) {
            jscpdOutput.clones[i].fragmentDetails[index2].author2 = report.map.clones[i].secondFileAnnotatedCode[key].author;
            jscpdOutput.clones[i].fragmentDetails[index2].file2Line = key;
            index2++;
          }

        }


      }

      return jscpdOutput;

    });

  }

  module.exports = jscpdReporter

}());
