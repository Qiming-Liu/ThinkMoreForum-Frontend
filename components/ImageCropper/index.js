import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import styledComponents from 'styled-components';
import { Button, Typography, Box } from '@mui/material';

const Container = styledComponents.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  justify-content: center;
`;

const ImageCropper = ({ src, setCover, setIsOpen, setImage, file }) => {
  const [cropImage, setCropImage] = useState();
  const rcImageref = useRef();
  const canvasRef = useRef();
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [completeCrop, setCompleteCrop] = useState(null);

  const handleOnLoad = useCallback((img) => {
    rcImageref.current = img;
  }, []);

  const getBlob = async () => {
    return new Promise((resolve) => {
      canvasRef.current.toBlob(
        (blob) => {
          // eslint-disable-next-line no-param-reassign
          blob.name = file.name;
          resolve(blob);
        },
        'image/jpeg',
        1,
      );
    });
  };
  const handleSave = async () => {
    const blob = await getBlob();
    const myFile = new File([blob], 'image.jpeg', {
      type: blob.type,
    });
    setImage(myFile);
    setCover(cropImage);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!completeCrop || !rcImageref) {
      return null;
    }

    const rcImage = rcImageref.current;
    const canvas = canvasRef.current;
    const scaleX = rcImage.naturalWidth / rcImage.width;
    const scaleY = rcImage.naturalHeight / rcImage.height;

    const pixelRatio = window.devicePixelRatio;
    const dImageWidth = crop.width * scaleX;
    const dImageHeight = crop.height * scaleY;

    canvas.width = dImageWidth * pixelRatio;
    canvas.height = dImageHeight * pixelRatio;

    const ctx = canvas.getContext('2d');

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.imageSmoothingEnabled = true;

    ctx.drawImage(
      rcImage,
      crop.x * scaleX,
      crop.y * scaleY,
      dImageWidth,
      dImageHeight,
      0,
      0,
      dImageWidth,
      dImageHeight,
    );
    if (!completeCrop || !canvasRef.current) {
      return null;
    }
    const base64Image = canvas.toDataURL('image/jpeg');
    setCropImage(base64Image);
    return base64Image;
  }, [completeCrop, crop, setCover]);
  return (
    <>
      <Typography variant="h4" align="center">
        Crop your image
      </Typography>
      <Box sx={{ my: 4, borderRadius: 1 }}>
        <Container>
          <ReactCrop
            crop={crop}
            src={src}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompleteCrop(c)}
            onImageLoaded={handleOnLoad}
            style={{ height: '330px', width: '450px' }}
          >
            <canvas hidden ref={canvasRef} />
          </ReactCrop>
          <Button
            sx={{ m: 1, width: '450px' }}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSave}
          >
            Save
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default ImageCropper;
