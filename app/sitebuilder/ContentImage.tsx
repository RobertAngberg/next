import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ContentImageProps {
  onImageCrop: (croppedImageUrl: string) => void;
}

const ContentImage: React.FC<ContentImageProps> = ({ onImageCrop }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 30, aspect: 16 / 9 });
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image: HTMLImageElement) => {
    setImageRef(image);
  };

  const onCropComplete = () => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef, crop);
      setCroppedImageUrl(croppedImageUrl);
      onImageCrop(croppedImageUrl);
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop): string => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        crop.width!,
        crop.height!
      );
    }

    return canvas.toDataURL('image/jpeg');
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={(newCrop) => setCrop(newCrop)}
        />
      )}
      {croppedImageUrl && (
        <div>
          <p>Cropped Image Preview:</p>
          <img src={croppedImageUrl} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default ContentImage;
