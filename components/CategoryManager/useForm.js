import React, { useState } from 'react';
import styled from 'styled-components';
import hotToast from '../../utils/hotToast';
import upload from '../../services/Img';

export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [headImg, setHeadImg] = useState('');

  const handleDropImg = async (base64) => {
    // setImgBase64(base64);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, headImg });
  };

  const resetForm = () => {
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
    resetForm,
    headImg,
    // imgBase64,
  };
}

const StyledForm = styled.form`
  & .MuiFormControl-root {
    width: 100%;
    margin: 8px;
  }
`;

const Form = (props) => {
  const { children, ...other } = props;

  return (
    <StyledForm autoComplete="off" {...other}>
      {children}
    </StyledForm>
  );
};

export default Form;
