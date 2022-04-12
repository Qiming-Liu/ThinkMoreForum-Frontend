import toast from 'react-hot-toast';

const hotToast = (status: string, text: string, style?: any) => {
  switch (status) {
    case 'success':
      toast.success(text, {
        ...style,
        duration: 3000,
        style: {
          padding: '20px',
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      break;
    case 'error': {
      toast.error(text, {
        ...style,
        duration: 3000,
        style: {
          padding: '20px',
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  }
};

export default hotToast;
