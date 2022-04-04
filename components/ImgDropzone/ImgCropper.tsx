import React, { useRef, useState, useImperativeHandle } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImgCropper: React.FC<{
  onRef: any;
  aspectRatio: number;
  lockAspectRatio: boolean;
  src: string;
}> = ({ onRef, aspectRatio, lockAspectRatio, src }) => {
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

  return lockAspectRatio ? (
    <Cropper
      src={src}
      style={{ height: 400, width: '100%' }}
      initialAspectRatio={aspectRatio}
      aspectRatio={aspectRatio}
      background
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
  ) : (
    <Cropper
      src={src}
      style={{ height: 400, width: '100%' }}
      background
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
