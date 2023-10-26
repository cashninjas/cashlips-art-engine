import dotenv from 'dotenv';
dotenv.config();

import { createCanvas, Image } from 'canvas';
import fs from "fs";

import {
  iconFormat
} from '../src/config.js';

import {
  writeMetaData,
  imageHash256
} from '../src/main.js';

const basePath = process.cwd();
const buildDir = `${basePath}/build`;
let rawdata = fs.readFileSync(`${buildDir}/json/_metadata.json`);
let data = JSON.parse(rawdata);

const migrate = () => {
  // Check for required images.
  if (!fs.existsSync(`${buildDir}/images`)) {
    console.log(`Make sure your build folder is populated with images and json before migrating.`);
    return;
  }

  // Create icons directory if necessary.
  if (!fs.existsSync(`${buildDir}/icons`)) {
    fs.mkdirSync(`${buildDir}/icons`);
  }

  // Loop through each item and add new fields.
  // This currently is the icon, and image/icon hash.
  data.forEach((item) => {
    // Update hash for image.
    item.imageHash = imageHash256(`${buildDir}/images/${item.edition}.png`);

    // Build icon if we need it.
    if (iconFormat.enabled) {
      // Check if icon exists. if it doesn't, create it and add the hash.
      if (!fs.existsSync(`${buildDir}/icons/${item.edition}.png`)) {
        console.log(`Processing Image ${item.edition}.png`);

        const canvas = createCanvas(iconFormat.width, iconFormat.height);
        const ctx = canvas.getContext("2d");

        let image = new Image();
        image.src = `${buildDir}/images/${item.edition}.png`;
        ctx.drawImage(image, 0, 0, iconFormat.width, iconFormat.height);

        fs.writeFileSync(
          `${buildDir}/icons/${item.edition}.png`,
          canvas.toBuffer("image/png")
        );

        // Update hash for icon.
        item.iconHash = imageHash256(`${buildDir}/icons/${item.edition}.png`);
      }
    }

    fs.writeFileSync(
      `${basePath}/build/json/${item.edition}.json`,
      JSON.stringify(item, null, 2)
    );
  });

  // Make bcmr directory if it doesn't exist.
  if (!fs.existsSync(`${buildDir}/bcmr`)) {
    fs.mkdirSync(`${buildDir}/bcmr`);
  }

  // Write new metadata, including the BCMR file.
  writeMetaData(JSON.stringify(data, null, 2));

  console.log(`Generated/Updated Metadata`);
};

// Update BCMR.
// Execution begins here.
migrate();
