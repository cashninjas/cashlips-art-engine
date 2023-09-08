import dotenv from 'dotenv';
dotenv.config();

import { MODE } from '../constants/blend_mode.js';
import { NETWORK } from '../constants/network.js';

// Default to BCH output, SOL and ETH are fully functional.
const network = NETWORK.bch;

// General collection metadata.
const collectionName = "CashNinjas";
const collectionDescription = "CashNinjas is an NFT collection leveraging the new CashTokens technology! The project is the result of different people involved in Bitcoin Cash crossing paths coincidentally and teaming-up to build something awesome together.";
const namePrefix = "Ninja";
const description = "Part of the CashNinjas collection.";
const baseUri = process.env.SHINOBI_BASE_URI || "ipfs://NewUriToReplace/images";
const baseIconUri = process.env.SHINOBI_BASE_ICON_URI || "ipfs://NewUriToReplace/icons";

// Background for your collection. This is used for OpenAI integration.
const collectionBackground = `CashNinjas are elite warriors, each bearing unique attributes and markings that signify their prowess and lineage. Each type of marking represents a ninjas specific clan. Clan affiliation is a life long commitment and is not to be taken lightly. Ninjas always abide by their markings.

The clans are Dragon, BCH, Fire, Jungle, Water, Psychic, Blizzard and Thunder.

Here is an example of the Fire clan.

{
  "trait_type": "Marking",
  "value": "Fire"
}

Here is an example for the Jungle clan.

{
  "trait_type": "Marking",
  "value": "Jungle"
}

Here is an example for the Psychic clan.

{
  "trait_type": "Marking",
  "value": "Psychic"
}

While most Ninja's have a clan, there are exceptions. Rogue ninjas do not have a clan. They are independent and travel a life of solitude.

Here is an example of a Rogue.

{
  "trait_type": "Marking",
  "value": "Rogue"
}

Some ninjas are Specials and are extremely rare. They do not belong to a clan. They are not rogues.

Here is an example of a special named Shredder.

{
  "trait_type": "Specials",
  "value": "Shredder"
}

The value is the Specials name.

CashNinjas' hand-drawn visages tell tales of valor, honor, and ancient traditions. As guardians of honor and tradition, they navigate diverse landscapes, always vigilant and ready to defend their values.

The lore of the CashNinjas is a tapestry of adventure and mystery, waiting to be unraveled by those who seek tales of heroism and legacy.`

// BCMR specific metadata.
const bcmrMetadata = {
  "$schema": "https://cashtokens.org/bcmr-v2.schema.json",
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  latestRevision: "",
  registryIdentity: {
    name: "CashNinjas Registry",
    description: "Registry for the CashNinjas collection.",
    uris: {
      icon: "https://ninjas.cash/images/registry.png",
      web: "https://ninjas.cash/",
      registry: "https://api.ninjas.cash/.well-known/bitcoin-cash-metadata-registry.json"
    }
  },
  identities: {},
  license: "CC0-1.0"
};

// Set the category to your CashToken genesis unspent.
// https://bitcash.dev/guide/cashtokens.html
const bchMetadata = {
  category: "b0dbd01f10a1e8a46a33134d432750963fce185bd2efe6bfde9d4306294adc26",
  symbol: "CASHNINJA",
  uris: {
    icon: "https://ninjas.cash/images/icon.png",
    image: "https://ninjas.cash/images/logo.png",
    web: "https://ninjas.cash/",
    telegram: "https://t.me/cashninjas",
    twitter: "https://twitter.com/cashninjasbch",
    youtube: "https://www.youtube.com/@CashNinjasBCH",
  },
};

const solanaMetadata = {
  symbol: "SHO",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/@CashNinjasBCH",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// Simple configuration.
const layerConfigurations = [
  {
    growEditionSizeTo: 1,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 143,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 144,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 286,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 287,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 429,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 430,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 572,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 573,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 715,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 716,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 858,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 859,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 1001,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 1002,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 1144,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 1145,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 1287,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 1288,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 1430,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 1431,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 1573,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 1574,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 1716,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 1717,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 1859,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 1860,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 2002,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 2003,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 2145,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 2146,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 2288,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 2289,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 2431,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 2432,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 2574,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 2575,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 2717,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 2718,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 2860,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 2861,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 3003,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 3004,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 3146,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 3147,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 3289,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 3290,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 3432,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 3433,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 3575,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 3576,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 3718,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 3719,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 3861,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 3862,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 4004,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 4005,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 4147,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 4148,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 4290,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 4291,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 4433,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 4434,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 4576,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 4577,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 4719,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 4720,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 4862,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
  {
    growEditionSizeTo: 4863,
    layersOrder: [
      { name: "Specials" },
    ],
  },
  {
    growEditionSizeTo: 5000,
    layersOrder: [
      {
        name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Primary Color" },
      { name: "Secondary Color" },
      { name: "Marking" },
      { name: "Eyes" },
      { name: "Weapon" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 2048,
  height: 2048,
  smoothing: true,
};

// Icon metadata is not supported for Solana.
const iconFormat = {
  enabled: network != NETWORK.sol ? true : false,
  width: 256,
  height: 256,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 16 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 50,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 50,
  order: "MIXED", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 1000,
  imageName: "preview.gif",
};

export {
  format,
  iconFormat,
  baseUri,
  baseIconUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  bchMetadata,
  bcmrMetadata,
  solanaMetadata,
  gif,
  preview_gif,
  collectionName,
  collectionDescription,
  collectionBackground,
};
