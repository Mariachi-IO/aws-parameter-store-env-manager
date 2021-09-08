import { ConfigEnv } from './@types';

const { promises: Fs } = require('fs');

export function getDate(date: Date) {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function getIndexParam(envs: ConfigEnv[], option: string): number {
  if (Number.parseInt(option,10)) {
    return +option;
  } else {
    return envs.findIndex((env) => env.name === option) + 1;
  }
}

export async function fileExists(path: string | undefined) {
  try {
    await Fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export function formatParameter(parameter: string) {
  let range = 0;
  if (parameter.length > 1 && parameter.length <= 3) {
    range = 1;
  }
  if (parameter.length > 3 && parameter.length <= 5) {
    range = 2;
  }
  if (parameter.length === 6) {
    range = 3;
  }
  if (parameter.length > 6) {
    range = 4;
  }
  return `****${parameter.slice(parameter.length - range)}`;
}

export function findFirstByKeyValue(array: [], key: string, match: string) {
  const index = array.findIndex((env) => env[key] === match);
  return array[index];
}
