import React, { useState } from 'react';
import styled from 'styled-components';

export function useForm(
  initialFValues,
  setRecordForEdit,
  validate,
  validateOnChange = false,
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    // setRecordForEdit(null);
    setErrors({});
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
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
