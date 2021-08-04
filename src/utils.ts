const { promises: Fs } = require('fs');

export function getDate(date: Date) {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function paramAsNumber(option: string): number {
  return +option;
}

export async function fileExists(path: string | undefined) {
  try {
    await Fs.access(path);
    return true;
  } catch {
    return false;
  }
}
