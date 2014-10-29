var rc = require('rc');
var optimist = require('optimist');
var path = require('path');
var fs = require('fs');

var defaultConfig = {
  sublime_path: "subl"
};

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

// Works for now but should be moved to bin/sublproject
var argv = optimist
  .usage('sublproject [-v]')
  .alias('v', 'version')
  .describe('v', 'Display sublproject versions')
  .argv;

if (argv.help) {
  optimist.showHelp();
  process.exit(0);
} else if (argv.v) {
  console.log('sublproject version: ' + JSON.parse(fs.readFileSync('../package.json')).version);
  process.exit(0);
} else if (argv.cliconfigonly) {
  var deepExtend = require('deep-extend');
  module.exports = deepExtend.apply(null, [
    defaultConfig,
    argv
  ]);
} else {
  module.exports = rc('sublproject', defaultConfig, argv);
}
