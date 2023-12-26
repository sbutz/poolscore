import {
  ChangeEvent, forwardRef, useEffect, useRef, useState,
} from 'react';
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { CloudUpload, Crop as CropIcon, Save } from '@mui/icons-material';
import {
  Button, InputBaseComponentProps, Stack, Typography,
} from '@mui/material';
import useKeyDown from '../util/useKeyDown';
import { cropImage, encodeData, getImageDimension } from '../util/image';

const acceptedTypes = ['image/png', 'image/jpeg'];

const kb = 1024;
const mb = 1024 * kb;
const maxFileSize = 1 * mb;

const minSideLength = 512;
const maxSideLength = 4096;
const aspect = 1;

const initialCrop : Crop = {
  unit: 'px',
  x: 0,
  y: 0,
  width: 50,
  height: 50,
};

function ImageUpload({ label, value, onUpload: onChange }: InputBaseComponentProps, ref: any) {
  const [image, setImage] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [crop, setCrop] = useState<Crop>(initialCrop);
  const [error, setError] = useState<string>();
  const imageRef = useRef<HTMLImageElement>(null);

  const onUpload = async (event: ChangeEvent<Element>) => {
    const target = event.target as HTMLInputElement;
    if (target.files?.length !== 1) {
      setError('Bitte wählen Sie eine Bildatei aus.');
      setImage(undefined);
      return;
    }
    const f = target.files[0];
    if (!acceptedTypes.includes(f.type)) {
      setError('Bitte wählen Sie eine Bildatei aus.');
      setImage(undefined);
      return;
    }
    if (f.size <= 0) {
      setError('Datei ist leer.');
      setImage(undefined);
      return;
    }
    if (f.size > maxFileSize) {
      setError('Datei ist zu groß.');
      setImage(undefined);
      return;
    }

    const newImage = await encodeData(f);
    const [width, height] = await getImageDimension(newImage);
    if (width < minSideLength || width > maxSideLength
      || height < minSideLength || height > maxSideLength) {
      setError(`Auflösung muss zwischen ${minSideLength}x${minSideLength} und ${maxSideLength}x${maxSideLength} liegen.`);
      setImage(undefined);
      return;
    }

    setError(undefined);
    setSaved(false);
    setImage(newImage);
  };

  const onImageLoad = () => {
    if (imageRef.current) {
      const minSide = Math.min(imageRef.current.width, imageRef.current.height);
      setCrop({
        unit: 'px',
        x: 0,
        y: 0,
        width: minSide,
        height: minSide,
      });
    }
  };

  const onCropChanage = (c: Crop) => {
    if (imageRef.current) {
      const scale = imageRef.current.width / imageRef.current.naturalWidth;
      const sideLength = Math.min(
        Math.max(Math.min(c.height, c.width), minSideLength * scale),
        maxSideLength * scale,
      );

      if (sideLength / scale > minSideLength) {
        setCrop({
          height: sideLength, width: sideLength, x: c.x, y: c.y, unit: c.unit,
        });
      }
    }
  };

  const onCrop = async () => {
    if (imageRef.current && crop) {
      const newImage = await cropImage(imageRef.current, crop as PixelCrop);
      setImage(newImage);
    }
  };
  useKeyDown('Enter', onCrop);

  const onSave = async () => {
    if (imageRef.current && crop) {
      const newImage = await cropImage(imageRef.current, crop as PixelCrop);
      setImage(newImage);
      onChange(newImage);
      setSaved(true);
    }
  };
  useEffect(() => {
    if (value) setSaved(true);
  }, [value]);

  const onInputClick = (e: any) => {
    const target = e.target as HTMLInputElement;
    target.value = ''; // Reset input to allow upload of the same file
  };

  const getImg = (val: string) => <img ref={imageRef} src={val} alt={label} style={{ maxHeight: '50vh', maxWidth: '100%' }} onChange={onImageLoad} onLoad={onImageLoad} />;
  return (
    <Stack alignItems="start" spacing={1}>
      { !saved && image ? (
        <ReactCrop
          crop={crop}
          onChange={onCropChanage}
          aspect={aspect}
        >
          {getImg(image)}
        </ReactCrop>
      ) : null }
      { saved && value ? getImg(value) : null}
      {error ? <Typography variant="caption" color="error">{error}</Typography> : null}
      <Stack direction="row">
        <Button component="label" startIcon={<CloudUpload />}>
          Upload
          <input ref={ref} type="file" accept={acceptedTypes.join(',')} hidden onChange={onUpload} onClick={onInputClick} />
        </Button>
        <Button component="label" startIcon={<CropIcon />} onClick={onCrop} disabled={saved || !image}>Zuschneiden</Button>
        <Button component="label" startIcon={<Save />} onClick={onSave} disabled={saved || !image}>Speichern</Button>
      </Stack>
    </Stack>
  );
}

export default forwardRef(ImageUpload);
