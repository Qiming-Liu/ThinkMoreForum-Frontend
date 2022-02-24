import toast from 'react-hot-toast';

const hotToast = (status, text, style) => {
  return toast[status](text, {
    ...style,
    duration: 3000,
    style: {
      padding: '20px',
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
};

export default hotToast;
