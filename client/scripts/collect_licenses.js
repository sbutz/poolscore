#!/usr/bin/env node

var checker = require('license-checker');
var { readFileSync } = require('fs');

const allowedLicenses = [
  "MIT",
  "Apache-2.0",
  "CC0-1.0",
  "BSD-3-Clause",
  "ISC",
  "BSD-2-Clause",
  "Python-2.0",
  "MPL-2.0",
  "CC-BY-4.0",
  "Unlicense",
  "0BSD",
]

checker.init({
  direct: true,
  excludePrivatePackages: true,
  onlyAllow: allowedLicenses.join(";"),
  production: true,
  start: process.cwd(),
}, function(err, packages) {
  if (err) {
      console.error(err);
      process.exit(1);
  } else {
    const data = Object.keys(packages).map(function(name) {
      const text = (packages[name].licenseFile === undefined)
        ? undefined
        : readFileSync(packages[name].licenseFile, { encoding: 'utf8', flag: 'r'});

      return {
        name,
        publisher: packages[name].publisher,
        email: packages[name].email,
        source: packages[name].repository,
        license: packages[name].licenses,
        licenseText: text,
      };
    });
    console.log(JSON.stringify(data));
  }
});
