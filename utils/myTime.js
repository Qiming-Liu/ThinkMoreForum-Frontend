import moment from 'moment';

const MyTime = (timestamp) => {
  const thatTime = moment(timestamp);
  if (thatTime.isSame(moment(), 'day')) {
    return thatTime.fromNow();
  }
  if (thatTime.isAfter(moment().subtract(1, 'day'), 'day')) {
    return thatTime.calendar();
  }
  return moment(timestamp);
};

export default MyTime;
