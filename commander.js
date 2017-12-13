#!/usr/bin/env node
const argv = require('yargs')
  .alias('n', 'name')
  .argv;

console.log('hello ', argv.n);

// const program = require('commander');

		// program
//   .version('0.0.1')
//   .option('-f, --foo', 'enable some foo')
//   .option('-b, --bar', 'enable some bar')
//   .option('-B, --baz', 'enable some baz');

// // must be before .parse() since
// // node's emit() is immediate

// program.on('--help', function(){
//   console.log('  Examples:');
//   console.log('');
//   console.log('    $ custom-help --help');
//   console.log('    $ custom-help -h');
//   console.log('');
// });

// program.parse(process.argv);

// // console.log('stuff');
// // import which from "which";
// const which = require('which')
// console.log('hi')

// // wh
// const resolved = which.sync('node')
//  var runner = require('child_process').spawn(resolved, ['install'], {
//     // keep color
//     stdio: "inherit"
//   });
