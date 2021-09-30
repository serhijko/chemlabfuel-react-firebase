export default function nextDate(per, lastDate) {
  const day = new Date(lastDate).getDate();
  const months = new Date(lastDate).getMonth() + per / 1;
  const month = months % 12;
  const year = new Date(lastDate).getFullYear() + (months - month) / 12;

  let insert1, insert2;
  if (month < 9) {
    insert1 = '-0';
  } else {
    insert1 = '-';
  }

  if (day < 10) {
    insert2 = '-0';
  } else {
    insert2 = '-';
  }

  return year.toString().concat(
    insert1, (month + 1).toString(), insert2, day.toString()
  );
}
