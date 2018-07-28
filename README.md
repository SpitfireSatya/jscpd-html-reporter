# jscpd-html-reporter
An npm module which uses jscpd and git blame to generate a pretty html report for code duplicity

## Installation

Install jscpd-html-reporter locally and add it to the dev dependancies
```bash
npm install jscpd-html-reporter --save-dev
```

## Usage

Simple require the module in your script/gulp task and invoke it with the desired config

```js
const jscpdHtmlReporter = require('jscpd-html-reporter');

jscpdHtmlReporter({/*config*/}, callback);

```

and you're done!!

## Config

The jscpd-html-reporter takes the following config object and the default values are as below

```js
config: {
  outDir: 'reports/code-duplicity', // Output directory for report. Relative to project root.
  outFileName: 'jscpd-report.html', // Name of final html file generated.
  files: '**/*.{js,jsx,ts,tsx}', // Glob specifying files to check for duplicity.
  exclude: [], // Globs which should be excluded from the report. 
  minLines: 5, // Minimum lines to qualify as duplicate.
  minTokens: 70, // Minimum tokens to qualify as duplicate.
  blame: false // Set to true to add information of author with each duplicate line (for Git).
}
```


## Sample Report

![This is what the report looks like](sample.jpg?raw=true "Sample Report")
