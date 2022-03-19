import React, { useState } from 'react';
import styled from 'styled-components';
import hotToast from '../../utils/hotToast';
import upload from '../../services/Img';

export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [headImg, setHeadImg] = useState('');

  const handleDropImg = async ([file]) => {
    const { data: newImg } = await upload(file).catch((error) => {
      hotToast('error', `Something wrong: ${error}`);
    });
    setHeadImg(newImg.url);
    setValues({ ...values, headImgUrl: newImg.url });
    hotToast('success', 'Profile picture is changed');
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
  };
}

const StyledForm = styled.form`
  & .MuiFormControl-root {
    width: 80%;
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
