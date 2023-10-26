import dotenv from 'dotenv'
dotenv.config();

import fs from "fs";
import { writeMetaData } from '../src/main.js';

const basePath = process.cwd();
const buildDir = `${basePath}/build`;
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

const updateBCMR = () => {
  // Make bcmr directory if it doesn't exist.
  if (!fs.existsSync(`${buildDir}/bcmr`)) {
    fs.mkdirSync(`${buildDir}/bcmr`);
  }

  // Write new metadata, including the BCMR file.
  writeMetaData(JSON.stringify(data, null, 2));

  console.log(`Generated/Updated BCMR`);
}

// Update BCMR.
// Execution begins here.
updateBCMR();
