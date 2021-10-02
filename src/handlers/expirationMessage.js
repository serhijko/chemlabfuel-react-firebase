export default function expirationMessage(daysBeforeExpiration) {
  let message = "";
  if (daysBeforeExpiration > 0) {
    let rest = daysBeforeExpiration % 100;
    if (rest >= 10 && rest <= 20) {
      message += `осталось ${daysBeforeExpiration} дней`;
    } else {
      rest = daysBeforeExpiration % 10;
      if (rest === 1) {
        message += `остался ${daysBeforeExpiration} день`;
      } else if (rest > 1 && rest < 5) {
        message += `осталось ${daysBeforeExpiration} дня`;
      } else {
        message += `осталось ${daysBeforeExpiration} дней`;
      }
    }
  } else {
    message = "Просрочено";
  }
  return message;
}
