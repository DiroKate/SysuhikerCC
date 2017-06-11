import config from './config';

const days = (start, end) => {
  const time1 = Date.parse(start);
  const time2 = Date.parse(end);
  const dayCount = Math.ceil((Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24);
  return dayCount;
};

const compareDays = (date1, date2) => (
  Date.parse(date1) > Date.parse(date2)
);

module.exports = {
  config,
  days,
  compareDays,
};
