export default function toRussianDateFormat(isoDate) {
  const day = new Date(isoDate).getDate();
  const month = new Date(isoDate).getMonth() + 1;
  const year = new Date(isoDate).getFullYear();

  let prefix, insert;
  if (day < 10) {
    prefix = '0';
  } else {
    prefix = '';
  }

  if (month < 10) {
    insert = '.0';
  } else {
    insert = '.';
  }

  const russianDate = prefix.concat(
    day, insert, month.toString(), '.', year.toString()
  )

  return isoDate && russianDate;
}
