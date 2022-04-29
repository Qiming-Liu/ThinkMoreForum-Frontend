import toast from 'react-hot-toast';

const hotToast = (status: string, text: string, promise?: any) => {
  switch (status) {
    case 'success':
      toast.success(text, {
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
        duration: 3000,
        style: {
          padding: '20px',
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      break;
    }
    case 'promise': {
      toast.promise(
        promise,
        {
          loading: 'Saving...',
          success: () => `Settings saved!`,
          error: () => `Could not save.`,
        },
        {
          style: {
            padding: '20px',
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        },
      );
    }
  }
};

export default hotToast;
