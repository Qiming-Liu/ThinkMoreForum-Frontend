import { createNotification } from '../services/followServices';

const newNotification = ({ user, type }) => {
  const data = {
    users: user,
    viewed: false,
    createTimestamp: Date.now().toString(),
  };
  return createNotification(type, data);
};

export default newNotification;
