import { useState } from 'react';
import hotToast from '../../utils/hotToast';
import upload from '../../services/Img';

export function useForm(initialFValues: any) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [headImg, setHeadImg] = useState('');

  const handleDropImg = async (base64: string) => {
    const file = await (await fetch(base64)).blob();
    try {
      const { data: img } = await upload(file);
      setHeadImg(img.url);
      setValues({ ...values, headImgUrl: img.url });
      hotToast('success', 'Profile picture is changed');
    } catch (error) {
      hotToast('error', `Something wrong: ${error}`);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, headImg });
  };

  const handleReset = () => {
    setValues(initialFValues);
    setErrors({});
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleDropImg,
    handleInputChange,
    handleReset,
    headImg,
  };
}
