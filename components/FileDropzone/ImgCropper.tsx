import React, { useRef, useState, useImperativeHandle } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImgCropper: React.FC<{
  onRef: any;
  aspectRatio: number;
  src: string;
}> = ({ onRef, aspectRatio, src }) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<any>();

  useImperativeHandle(onRef, () => ({
    getCropData: () => {
      if (typeof cropper !== 'undefined') {
        return cropper.getCroppedCanvas().toDataURL();
      }
      return '';
    },
  }));

  return (
    <Cropper
      src={src}
      style={{ height: 400, width: '100%' }}
      // Cropper.js options //2.37
      initialAspectRatio={aspectRatio}
      aspectRatio={aspectRatio}
      background={false}
      responsive
      autoCropArea={1}
      guides
      ref={cropperRef}
      scalable={false}
      movable={false}
      zoomable={false}
      zoomOnTouch={false}
      onInitialized={(instance) => {
        setCropper(instance);
      }}
    />
  );
};

export default ImgCropper;
