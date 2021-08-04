export function getDate(date: Date) {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function paramAsNumber(option: string): number {
  return +option
}
