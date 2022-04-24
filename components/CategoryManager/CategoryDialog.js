import React, { useEffect } from 'react';
import {
  Button,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useForm } from './useForm';
import ImgDropzone from '../ImgDropzone';
import Category from 'components/Categroy';

const initialFValues = {
  id: null,
  fakeID: null,
  headImgUrl: '/logo.png',
  title: '',
  description: '',
  color: '',
  pinPost: '',
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
    if (
      'color' in fieldValues &&
      fieldValues.color.length > 0 &&
      /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(fieldValues.color)
    ) {
      temp.color = '';
    } else {
      temp.color = 'Color is invalid';
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (values.id === null && values.fakeID === null) {
        const newValues = { ...values, fakeID: '' };
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
    <Dialog
      fullWidth
      maxWidth="md"
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
          <Container maxWidth="md">
            <Typography variant="h6">Category Card</Typography>
            <Category
              color={values.color}
              title={values.title}
              description={values.description}
              pinPost={undefined}
              postCount={values.postCount || 0}
              viewCount={values.viewCount || 0}
              participantCount={values.participantCount || 0}
              headImgUrl={values.headImgUrl}
              lastUpdateTimestamp="2022-04-11T18:21:21.959076Z"
              previewMode={true}
            />

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

            <Typography variant="h6" sx={{ my: 3 }}>
              Category Title
            </Typography>
            <TextField
              variant="outlined"
              name="title"
              label="Category Title"
              fullWidth
              value={values.title}
              onChange={handleInputChange}
              error={errors.title}
              helperText={errors.title}
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
            <TextField
              variant="outlined"
              label="Description"
              name="description"
              multiline
              rows={4}
              fullWidth
              value={values.description}
              onChange={handleInputChange}
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
            <TextField
              variant="outlined"
              name="color"
              label="Color"
              fullWidth
              value={values.color}
              onChange={handleInputChange}
              error={errors.color}
              helperText={errors.color}
            />
          </Container>
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
