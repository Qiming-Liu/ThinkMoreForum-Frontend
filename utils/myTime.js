import moment from 'moment';

const MyTime = (timestamp) => {
  const thatTime = moment(timestamp);
  if (thatTime.isSame(moment(), 'day')) {
    return thatTime.startOf('hour').fromNow();
  }
  return thatTime.calendar();
};

export default MyTime;
