import { PixelCrop } from 'react-image-crop';

async function createImageElement(image: string, timeout = 1000) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    setTimeout(reject, timeout);
    const img = new Image();
    img.src = image;
    img.onload = () => {
      resolve(img);
    };
  });
}

export async function encodeData(data: File | Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) resolve(reader.result.toString());
      else reject();
    };
    reader.readAsDataURL(data);
  });
}

export async function getImageDimension(image: string) {
  const img = await createImageElement(image);
  return [img.width, img.height];
}

export async function cropImage(image: HTMLImageElement, completedCrop: PixelCrop) {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const offscreen = new OffscreenCanvas(
    completedCrop.width * scaleX,
    completedCrop.height * scaleY,
  );
  const ctx = offscreen.getContext('2d');
  if (!ctx) {
    throw Error('Failed to get 2d Context.');
  }

  // 3) Move the crop origin to the canvas origin (0,0)
  const cropX = completedCrop.x * scaleX;
  const cropY = completedCrop.y * scaleY;
  ctx.translate(-cropX, -cropY);

  // 2) Move the origin to the center of the original position
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;
  ctx.translate(centerX, centerY);

  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);

  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );

  const blob = await offscreen.convertToBlob({
    type: 'image/png',
  });
  return encodeData(blob);
}
