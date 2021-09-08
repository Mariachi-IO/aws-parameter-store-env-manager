#!/usr/bin/env node

// Grab provided args
import { configure } from './configure';

const [, , ...args] = process.argv;

switch (args[0]) {
  case 'configure':
    configure(args.slice(1)).then(() => process.exit(0));
    break;
  default:
    process.exit(0);
    break;
}
