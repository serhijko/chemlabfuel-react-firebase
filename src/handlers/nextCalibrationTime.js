export default function nextCalibrationTime(nextCalibration, puttingInStorage, removingFromStorage) {
  const nextCalibrationDate = new Date(nextCalibration);
  const puttingInStorageDate = new Date(puttingInStorage);
  const removingFromStorageDate = new Date(removingFromStorage);

  return (puttingInStorage && (!removingFromStorage || (puttingInStorageDate > removingFromStorageDate)))
    ? puttingInStorageDate.setFullYear(puttingInStorageDate.getFullYear() + 20)
    : (
      nextCalibrationDate < removingFromStorageDate
        ? removingFromStorageDate.getTime()
        : nextCalibrationDate.getTime()
    );

}
