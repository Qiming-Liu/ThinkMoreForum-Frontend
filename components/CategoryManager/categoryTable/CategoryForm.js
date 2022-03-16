import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Form, { useForm } from '../useForm';
import Controls from '../controls/Controls';
// import { matches } from 'lodash';
// import * as categoryServices from '../../services/categoryService';

const initialFValues = {
  id: null,
  fakeID: null,
  title: '',
  description: '',
  color: '',
  pinPost: '',
};

const CategoryForm = (props) => {
  const { addOrEdit, recordForEdit, records, setRecordForEdit } = props;
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, setRecordForEdit, true);

  const validate = (fieldValues = values) => {
    let recordsForValidate = records;
    const temp = { ...errors };
    const arr2 = records.map((x) => x.fakeID);
    const arr3 = records.map((x) => x.id);
    const findID = arr3.indexOf(fieldValues.id);
    console.log('findID', findID);
    const findFakeID = arr2.indexOf(fieldValues.fakeID);
    console.log('findFakeID', findFakeID);
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
      console.log('fieldValues.color', fieldValues.color);
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
    // if (validate()) {
    //   const arr = records.map((x) => x.title);
    //   const findTitle = arr.indexOf(values.title);
    //   if (findTitle === -1) {

    //   } else {
    //     alert('This title is already used.');
    //   }
    // }
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
      console.log('recordForEdit1', recordForEdit);
      setValues({
        ...recordForEdit,
        pinPost: recordForEdit.pinPost ? recordForEdit.pinPost.id : null,
      });
    } else {
      console.log('recordForEdit2', recordForEdit);
      setValues(initialFValues);
    }
  }, [recordForEdit, setValues]);

  console.log('recordForEdit3', recordForEdit);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="title"
            label="Category Title"
            value={values.title}
            // value={recordForEdit ? values.title : ''}
            onChange={handleInputChange}
            error={errors.title}
          />
          <Controls.Input
            label="Description"
            name="description"
            value={values.description}
            // value={recordForEdit ? recordForEdit.description : ''}
            onChange={handleInputChange}
            error={errors.description}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="color"
            label="Color"
            value={values.color}
            onChange={handleInputChange}
            // value={recordForEdit ? recordForEdit.color : ''}
            error={errors.color}
          />
          <Controls.Input
            name="pinPost"
            label="pinPost"
            value={values.pinPost}
            onChange={handleInputChange}
            // value={recordForEdit ? recordForEdit.pinPost : ''}
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
