#!/usr/bin/env node

// Grab provided args
import {configure} from "./configure";

const [, , ...args] = process.argv;

console.log('Hello world ' + args);

switch (args[0]) {
  case 'configure':
    configure().then(() => console.log("Finished!"))
    break;
}
