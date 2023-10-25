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
      let text = `${name}\n\n`;
      if (packages[name].publisher)
        text += `Publisher: ${packages[name].publisher}\n`;
      if (packages[name].email)
        text += `Contact: ${packages[name].email}\n`;
      if (packages[name].source)
        text += `Source: ${packages[name].source}\n`;
      if (packages[name].licenseFile) {
        text += "\n";
        text += readFileSync(packages[name].licenseFile, { encoding: 'utf8', flag: 'r'});
      }
      return text;
    }).join("\n---\n\n");
    console.log(data)
  }
});
