import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";

import { NETWORK } from '../constants/network.js';
import { writeMetaData } from '../src/main.js';
import {
  baseUri,
  baseIconUri,
  description,
  namePrefix,
  network,
  solanaMetadata,
  iconFormat,
} from '../src/config.js';

const basePath = process.cwd();
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

const updateInfo = () => {
  data.forEach((item) => {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    if (network == NETWORK.sol) {
      item.creators = solanaMetadata.creators;
    } else {
      item.image = `${baseUri}/${item.edition}.png`;
      if (iconFormat.enabled) {
        item.icon = `${baseIconUri}/${item.edition}.png`;
      }
    }
    fs.writeFileSync(
      `${basePath}/build/json/${item.edition}.json`,
      JSON.stringify(item, null, 2)
    );
  });

  writeMetaData(JSON.stringify(data, null, 2));

  console.log(`Updated namePrefix ===> ${namePrefix}`);
  console.log(`Updated description ===> ${description}`);
  if (network == NETWORK.sol) {
    console.log(
      `Updated creators to ===> ${JSON.stringify(
        solanaMetadata.creators
      )}`
    );
  } else {
    console.log(`Updated baseUri ===> ${baseUri}`);
    console.log(`Updated baseIconUri ===> ${baseIconUri}`);
  }
};

// Update info.
// Execution begins here.
updateInfo();
