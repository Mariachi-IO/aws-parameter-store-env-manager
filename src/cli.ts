#!/usr/bin/env node

// Grab provided args
import { configure } from './configure';
import { fileExists } from "./utils";
const Path = require('path')

const [, , ...args] = process.argv;

switch (args[0]) {
  case 'configure':
    const path = Path.join?.(__dirname, "../envConfig.js")
    fileExists(path).then((exists)=>{
      if (exists){
        configure(args.slice(1)).then(() => process.exit(0));
      }else {
        console.log('Cannot find the file: envConfig.js \n')
        console.log('For more references, see the documentation.: ','https://github.com/Mariachi-IO/aws-parameter-store-env-manager')
        process.exit(0)
      }
    })
    break;
  default:
    process.exit(0);
    break;
}
