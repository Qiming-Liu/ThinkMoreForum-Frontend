import React, { useEffect } from 'react';
import {
  Button,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useForm } from './useForm';
import ImgDropzone from '../ImgDropzone';

const initialFValues = {
  id: null,
  fakeID: null,
  headImgUrl: '/logo.png',
  title: '',
  description: '',
  color: '',
  pinPost: '',
};

const Input = (props) => {
  const { name, value, onChange, label, error = null, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
};

const CategoryDialog = ({
  openDialog,
  setOpenDialog,
  recordForEdit,
  addOrEdit,
  records,
}) => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleDropImg,
    handleInputChange,
    handleReset,
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
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values);
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
    <Dialog
      open={openDialog}
      onClose={() => {
        setOpenDialog(false);
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card sx={{ overflow: 'visible' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Category Title
              </Typography>
              <Input
                name="title"
                label="Category Title"
                style={{ width: '98%' }}
                value={values.title}
                onChange={handleInputChange}
                error={errors.title}
              />
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  mt: 3,
                }}
              >
                Category Description
              </Typography>
              <Input
                label="Description"
                name="description"
                multiline
                rows={4}
                style={{ width: '98%' }}
                value={values.description}
                onChange={handleInputChange}
                error={errors.description}
              />
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  mt: 3,
                }}
              >
                Color
              </Typography>
              <Input
                name="color"
                label="Color"
                style={{ width: '98%' }}
                value={values.color}
                onChange={handleInputChange}
                error={errors.color}
              />
            </CardContent>
          </Card>
          <Card sx={{ mt: 5, mb: 5 }}>
            <CardContent>
              <Typography variant="h6">Post cover</Typography>
              {values ? (
                <Box
                  sx={{
                    backgroundImage: `url(${values.headImgUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    borderRadius: 1,
                    height: 200,
                    mt: 2,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                    height: 100,
                    mt: 3,
                    p: 3,
                  }}
                >
                  <Typography align="center" color="textSecondary" variant="h6">
                    Select a image
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="subtitle1"
                  >
                    Category Head Image
                  </Typography>
                </Box>
              )}
              <Box sx={{ mt: 3 }}>
                <ImgDropzone
                  accept="image/jpg,image/png, image/jpeg"
                  afterCrop={handleDropImg}
                  lockAspectRatio={false}
                >
                  <Box
                    sx={{
                      alignItems: 'center',
                      border: 1,
                      borderRadius: 1,
                      borderStyle: 'dashed',
                      borderColor: 'divider',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      outline: 'none',
                      p: 6,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        cursor: 'pointer',
                        opacity: 0.5,
                      },
                    }}
                  >
                    <Image
                      alt="Select image"
                      src="/file_upload.svg"
                      width={100}
                      height={80}
                    />
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6">Select image</Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body1">
                          Drop image browse thorough your machine
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </ImgDropzone>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleReset}>Reset</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
