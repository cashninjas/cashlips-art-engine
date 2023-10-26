import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
// API key should be set via OPENAI_API_KEY ENV var.
import OpenAI from 'openai';

import { writeMetaData } from '../src/main.js';
import {
  description,
  namePrefix,
  collectionBackground,
} from '../src/config.js';

const openai = new OpenAI();
const systemPrompt = `User will supply the background of an NFT collection along with the JSON attributes of a specific NFT.

Your task is to craft a distinctive, unique, and memorable name, and an engaging, high-quality description for the NFT. Once completed, present your output as a JSON response with the keys "name" and "description", as shown:

{
  "name": "Unique NFT Name",
  "description": "Detailed and captivating description of the NFT."
}

Ensure your response is strictly in the JSON format provided.`;

const basePath = process.cwd();
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const askGPT = async (item) => {
  let completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: collectionBackground + "\n\n" + JSON.stringify(item.attributes)
      }
    ],
    model: 'gpt-4',
  });

  // This "should" produce valid json... Luckily we have resume.
  return JSON.parse(completion.choices[0].message.content);
};

// Only update items that have the default name/description.
// That way items can be resumed. If a full reset is required,
// then update_info can be used to reset the default name/description
// for all items in the collection.
const updateInfoWithAI = async () => {
  await asyncForEach(data, async (item) => {
    if (item.name == `${namePrefix} #${item.edition}` || item.description == description) {
      console.log(`Updating #${item.edition}`);
      let triesCounter = 0;
      while (triesCounter < 3) {
        try {
          let response = await askGPT(item);
          item.name = `${namePrefix} #${item.edition} - ${response.name}`;
          item.description = response.description;
          fs.writeFileSync(
            `${basePath}/build/json/${item.edition}.json`,
            JSON.stringify(item, null, 2)
          );
          writeMetaData(JSON.stringify(data, null, 2));
          break;
        } catch (err) {
          console.log(err);
        }
        triesCounter++;
      }
    }
  });

  writeMetaData(JSON.stringify(data, null, 2));

  console.log(`Updated names using OpenAI`);
  console.log(`Updated descriptions using OpenAI`);
};

// Update info.
// Execution begins here.
await updateInfoWithAI();
