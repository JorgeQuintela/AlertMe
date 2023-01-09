const marketCloseHourUTC: number = 16;
const marketOpenHourUTC: number = 9;
const marketOpenMinuteUTC: number = 30;

export const roundToTwoDecimals = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const isMarketClosed = () => {
  let currentDate = new Date();
  let currentUTCHours = currentDate.getUTCHours();
  let currentUTCMinutes = currentDate.getUTCMinutes();
  if (
    currentUTCHours > marketCloseHourUTC ||
    currentUTCHours < marketOpenHourUTC ||
    (currentUTCHours == marketOpenHourUTC &&
      currentUTCMinutes < marketOpenMinuteUTC)
  ) {
    // console.log('isMarketClosed: YES');
    return true;
  } else {
    // console.log('isMarketClosed: NO');
    return false;
  }
};

export const isMarketAboutToOpen = () => {
  let currentDate = new Date();
  let currentUTCHours = currentDate.getUTCHours();
  let currentUTCMinutes = currentDate.getUTCMinutes();
  if (
    currentUTCHours == marketOpenHourUTC &&
    currentUTCMinutes < marketOpenMinuteUTC
  ) {
    console.log('isMarketAboutToOpen: YES (less than 30min)');
    return true;
  } else {
    console.log('isMarketAboutToOpen: NO');
    return false;
  }
};

export const addExtraAfterHours = value => {
  if (isMarketClosed()) {
    let randomSalt = Math.floor(Math.random() * 10) * 0.01;
    // console.log('value: ' + value);
    // console.log('randomSalt: ' + roundToTwoDecimals(randomSalt));
    return roundToTwoDecimals(value + randomSalt);
  }
  return value;
};
