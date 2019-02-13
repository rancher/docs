#! /usr/bin/env node
'use strict';

const atomicalgolia = require("atomic-algolia");

console.log('Publishing to algolia', process.env.ALGOLIA_INDEX_NAME);
atomicalgolia(process.env.ALGOLIA_INDEX_NAME, '/run/final.algolia.json', {verbose: true},  (err, result) => {
  console.log(result);
  if ( err ) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});
