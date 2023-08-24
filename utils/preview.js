import fs from "fs";

import { createCanvas, loadImage } from "canvas";

import { preview } from '../src/config.js';

const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
const metadataList = JSON.parse(rawdata);

const saveProjectPreviewImage = async (_data) => {
  const { thumbWidth, thumbPerRow, imageRatio, imageName } = preview;
  const thumbHeight = thumbWidth * imageRatio;
  const previewCanvasWidth = thumbWidth * thumbPerRow;
  const previewCanvasHeight =
    thumbHeight * Math.ceil(_data.length / thumbPerRow);
  console.log(
    `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} thumbnails.`
  );

  // Initiate the canvas now that we have calculated everything
  const previewPath = `${buildDir}/${imageName}`;
  const previewCanvas = createCanvas(previewCanvasWidth, previewCanvasHeight);
  const previewCtx = previewCanvas.getContext("2d");

  // Iterate all NFTs and insert thumbnail into preview image
  // Don't want to rely on "edition" for assuming index
  for (let index = 0; index < _data.length; index++) {
    const nft = _data[index];
    await loadImage(`${buildDir}/images/${nft.edition}.png`).then((image) => {
      previewCtx.drawImage(
        image,
        thumbWidth * (index % thumbPerRow),
        thumbHeight * Math.trunc(index / thumbPerRow),
        thumbWidth,
        thumbHeight
      );
    });
  }

  fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png"));
  console.log(`Project preview image located at: ${previewPath}`);
};

// Create preview image.
// Execution begins here.
await saveProjectPreviewImage(metadataList);
