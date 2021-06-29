export function getDate(date: Date) {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
