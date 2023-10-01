import fs from "fs";

import { layerConfigurations } from '../src/config.js';
import { getElements } from '../src/main.js';

const basePath = process.cwd();
const layersDir = `${basePath}/layers`;

let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = {};

const getRarity = () => {
  // intialize layers to chart
  layerConfigurations.forEach((config) => {
    let layers = config.layersOrder;

    layers.forEach((layer) => {
      if (!(layer.name in rarityData)) {
        // get elements for each layer
        let elementsForLayer = [];
        let elements = getElements(`${layersDir}/${layer.name}/`);
        elements.forEach((element) => {
          // just get name and weight for each element
          let rarityDataElement = {
            trait: element.name,
            weight: element.weight.toFixed(0),
            occurrence: 0, // initialize at 0
          };
          elementsForLayer.push(rarityDataElement);
        });
        let layerName =
          layer.options?.["displayName"] != undefined
            ? layer.options?.["displayName"]
            : layer.name;
        // don't include duplicate layers
        // add elements for each layer to chart
        rarityData[layerName] = elementsForLayer;
      }
    });
  });

  // fill up rarity chart with occurrences from metadata
  data.forEach((element) => {
    let attributes = element.attributes;
    attributes.forEach((attribute) => {
      let traitType = attribute.trait_type;
      let value = attribute.value;

      let rarityDataTraits = rarityData[traitType];
      rarityDataTraits.forEach((rarityDataTrait) => {
        if (rarityDataTrait.trait == value) {
          // keep track of occurrences
          rarityDataTrait.occurrence++;
        }
      });
    });
  });

  // convert occurrences to occurence string
  for (var layer in rarityData) {
    for (var attribute in rarityData[layer]) {
      // get chance
      let chance =
        ((rarityData[layer][attribute].occurrence / editionSize) * 100).toFixed(2);

      // show two decimal places in percent
      rarityData[layer][attribute].occurrence =
        `${rarityData[layer][attribute].occurrence} in ${editionSize} editions (${chance} %)`;
    }
  }

  console.log(rarityData);

  fs.writeFileSync(
    `${basePath}/build/json/_rarity.json`,
    JSON.stringify(rarityData, null, 2)
  );
}

// Generate rarity information.
// Execution begins here.
getRarity();
