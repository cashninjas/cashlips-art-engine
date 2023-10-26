import fs from "fs";
import path from "path";
import console from "console";

import { createCanvas, loadImage, Image } from "canvas";
import { format, iconFormat, pixelFormat } from '../src/config.js';

const basePath = process.cwd();
const buildDir = `${basePath}/build/pixel_images`;
const inputDir = `${basePath}/build/images`;
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
const iconCanvas = createCanvas(iconFormat.width, iconFormat.height);
const iconCtx = iconCanvas.getContext("2d");

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/images`);
  fs.mkdirSync(`${buildDir}/icons`);
};

const getImages = (_dir) => {
  try {
    return fs
      .readdirSync(_dir)
      .filter((item) => {
        let extension = path.extname(`${_dir}${item}`);
        if (extension == ".png" || extension == ".jpg") {
          return item;
        }
      })
      .map((i) => {
        return {
          filename: i,
          path: `${_dir}/${i}`,
        };
      });
  } catch {
    return null;
  }
};

const loadImgData = async (_imgObject) => {
  try {
    const image = await loadImage(`${_imgObject.path}`);
    return {
      imgObject: _imgObject,
      loadedImage: image,
    };
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const draw = (_imgObject) => {
  let size = pixelFormat.ratio;
  let w = canvas.width * size;
  let h = canvas.height * size;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(_imgObject.loadedImage, 0, 0, w, h);
  ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
};

const saveImage = (_loadedImageObject) => {
  fs.writeFileSync(
    `${buildDir}/images/${_loadedImageObject.imgObject.filename}`,
    canvas.toBuffer("image/png")
  );
};

const saveImageIcon = (_loadedImageObject) => {
  if (!iconFormat.enabled) {
    return;
  }

  let img = new Image();
  img.src = canvas.toDataURL();

  iconCtx.drawImage(
    img,
    0,
    0,
    iconFormat.width,
    iconFormat.height,

  );

  fs.writeFileSync(
    `${buildDir}/icons/${_loadedImageObject.imgObject.filename}`,
    iconCanvas.toBuffer("image/png")
  );
};

const createPixelatedImages = async () => {
  buildSetup();

  const images = getImages(inputDir);
  if (images == null) {
    console.log("Please generate collection first.");
    return;
  }
  let loadedImageObjects = [];
  images.forEach((imgObject) => {
    loadedImageObjects.push(loadImgData(imgObject));
  });
  await Promise.all(loadedImageObjects).then((loadedImageObjectArray) => {
    loadedImageObjectArray.forEach((loadedImageObject) => {
      draw(loadedImageObject);
      saveImage(loadedImageObject);
      saveImageIcon(loadedImageObject);
    });
  });
};

// Create pixelated images.
// Execution begins here.
await createPixelatedImages();
