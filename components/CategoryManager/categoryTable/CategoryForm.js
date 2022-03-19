import React, { useEffect } from 'react';
import { Grid, Avatar, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Form, { useForm } from '../useForm';
import Controls from '../controls/Controls';
import UserCircleIcon from '../../../icons/user-circle';
import ChangePicButton from '../../PersonalSetting/ChangePicButton';

const initialFValues = {
  id: null,
  fakeID: null,
  headImgUrl: '/logo.png',
  title: '',
  description: '',
  color: '',
  pinPost: '',
};

const CategoryForm = (props) => {
  const { addOrEdit, recordForEdit, records } = props;
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleDropImg,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues);

  const validate = (fieldValues = values) => {
    let recordsForValidate = records;
    const temp = { ...errors };
    const arr2 = records.map((x) => x.fakeID);
    const arr3 = records.map((x) => x.id);
    const findID = arr3.indexOf(fieldValues.id);
    const findFakeID = arr2.indexOf(fieldValues.fakeID);
    if ('title' in fieldValues)
      temp.title = fieldValues.title ? '' : 'This field is required';
    if (findID !== -1 || findFakeID !== -1)
      recordsForValidate = recordsForValidate.filter(
        (x) => x.id !== fieldValues.id || x.fakeID !== fieldValues.fakeID,
      );
    if (temp.title === '') {
      const arr = recordsForValidate.map((x) => x.title);
      const findTitle = arr.indexOf(fieldValues.title);
      temp.title = findTitle === -1 ? '' : 'This title is already existed';
    }
    if ('description' in fieldValues)
      temp.description = fieldValues.description
        ? ''
        : 'This field is required.';
    if ('color' in fieldValues && fieldValues.color.length > 0) {
      temp.color = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(fieldValues.color)
        ? ''
        : 'color is not valid.';
    }
    if (
      'pinPost' in fieldValues &&
      fieldValues.pinPost !== '' &&
      fieldValues.pinPost !== null
    )
      temp.pinPost =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          fieldValues.pinPost,
        )
          ? ''
          : 'pinPost is not valid.';
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (values.id === null && values.fakeID === null) {
        const newValues = { ...values, fakeID: uuidv4() };
        addOrEdit(newValues);
      } else {
        addOrEdit(values);
      }
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
        pinPost: recordForEdit.pinPost ? recordForEdit.pinPost.id : null,
      });
    } else {
      setValues(initialFValues);
    }
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="title"
            label="Category Title"
            value={values.title}
            onChange={handleInputChange}
            error={errors.title}
          />
          <Controls.Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Avatar
              src={values.headImgUrl}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
            <ChangePicButton
              accept="image/jpg,image/png, image/jpeg"
              maxFiles={1}
              onDrop={handleDropImg}
              maxSize={5242880}
              minsize={0}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="color"
            label="Color"
            value={values.color}
            onChange={handleInputChange}
            error={errors.color}
          />
          <Controls.Input
            name="pinPost"
            label="pinPost"
            value={values.pinPost}
            onChange={handleInputChange}
            error={errors.pinPost}
          />
          <div>
            <Controls.Button
              text="Submit"
              type="submit"
              onClick={handleSubmit}
            />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default CategoryForm;
