import fs from "fs";
import { createCanvas, loadImage } from "canvas";
import { format, preview_gif } from '../src/config.js';
import HashlipsGiffer from '../modules/HashlipsGiffer.js';

const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const imageDir = `${buildDir}/images`;
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
const { numberOfImages, order, repeat, quality, delay, imageName } =
  preview_gif;

let hashlipsGiffer = null;

const loadImg = async (_img) => {
  return new Promise(async (resolve) => {
    const loadedImage = await loadImage(`${_img}`);
    resolve({ loadedImage: loadedImage });
  });
};

// Build temporary list of just file paths. We don't
// want to load image data yet for performance reasons.
let tmpImageList = [];
fs.readdirSync(imageDir).forEach((file) => {
  tmpImageList.push(`${imageDir}/${file}`);
});

// Adjust the returned array based on order setting.
if (order == "ASC") {
  // Do nothing.
} else if (order == "DESC") {
  tmpImageList.reverse();
} else if (order == "MIXED") {
  tmpImageList = tmpImageList.sort(() => Math.random() - 0.5);
}

// Reduce the size of the array of Images to the desired amount.
if (parseInt(numberOfImages) > 0) {
  tmpImageList = tmpImageList.slice(0, numberOfImages);
}

// Only load images that are required.
const imageList = [];
tmpImageList.forEach((imgRef) => {
  imageList.push(loadImg(imgRef));
});

const saveProjectPreviewGIF = async (_data) => {
  const { width, height } = format;
  const previewCanvasWidth = width;
  const previewCanvasHeight = height;

  if (_data.length < numberOfImages) {
    console.log(
      `You do not have enough images to create a gif with ${numberOfImages} images.`
    );
  } else {
    console.log(
      `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} images.`
    );
    const previewPath = `${buildDir}/${imageName}`;

    ctx.clearRect(0, 0, width, height);

    hashlipsGiffer = new HashlipsGiffer(
      canvas,
      ctx,
      `${previewPath}`,
      repeat,
      quality,
      delay
    );
    hashlipsGiffer.start();

    await Promise.all(_data).then((renderObjectArray) => {
      renderObjectArray.forEach(async (renderObject, index) => {
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(
          renderObject.loadedImage,
          0,
          0,
          previewCanvasWidth,
          previewCanvasHeight
        );
        hashlipsGiffer.add();
      });
    });
    hashlipsGiffer.stop();
  }
};

// Create preview gif.
// Execution begins here.
await saveProjectPreviewGIF(imageList);
