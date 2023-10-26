import dotenv from 'dotenv';
dotenv.config();

import { MODE } from '../constants/blend_mode.js';
import { NETWORK } from '../constants/network.js';

// Default to BCH output, SOL and ETH are fully functional.
const network = NETWORK.bch;

// General collection metadata.
const collectionName = "The Reapers"; // Name of your collection.
const collectionDescription = "The Reapers collection consists of 10,000 unique pieces. Every Reaper holder also got the opportunity to take part in the Reaper Summons mint, a free add-on collection of 1,111 NFTs. The majority of the Summons are Dragons, but the set also includes new Reapers and 3D art!"; // Description of your collection.
const namePrefix = "Reaper"; // Prefix for the NFT name.
const description = "https://reapers.cash"; // NFT description.
const baseUri = process.env.SHINOBI_BASE_URI || "ipfs://Qmb71z6NjPzT4pSZGMTCkH1hEKg9vGTzqnBNfAd3tWeBNu";
const baseIconUri = process.env.SHINOBI_BASE_ICON_URI || "ipfs://QmVm2v4NXMTXJi1RwnYUbp2ixPErLqCLKR34CU7fxE6QBD";

// Background for your collection. This is used for OpenAI integration.
// Unused for Reapers!
const collectionBackground = ``;

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
    name: "Reapers Registry",
    description: "Registry for the Reapers collection.",
    uris: {
      icon: "https://reapers.cash/images/registry.png",
      web: "https://reapers.cash/",
    }
  },
  identities: {},
  license: "CC0-1.0"
};

// Set the category to your CashToken genesis unspent.
// https://bitcash.dev/guide/cashtokens.html
const bchMetadata = {
  category: "YOUR_GENESIS_UNSPENT_TX",
  symbol: "REAPER",
  uris: {
    icon: "https://reapers.cash/images/icon.png",
    image: "https://reapers.cash/images/logo.png",
    web: "https://reapers.cash/",
    telegram: "https://t.me/ReapersNFT",
    twitter: "https://twitter.com/ReapersNFT",
    instagram: "https://www.instagram.com/thereapernft/",
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
// const layerConfigurations = [
//   {
//     growEditionSizeTo: 5,
//     layersOrder: [
//       { name: "Background" },
//       { name: "Glow" },
//       { name: "Weapons" },
//       { name: "Body" },
//       { name: "Eyes" },
//     ],
//   },
// ];

// Advanced configuration.
const layerConfigurations = [
  {
    growEditionSizeTo: 10000,
    layersOrder: [
      { name: "Background" },
      { name: "Outfit" },
      { name: "Head" },
      { name: "Eyes" },
      { name: "Hands" },
      { name: "Special" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 2048,
  height: 2048,
  smoothing: false,
};

// Icon metadata is not supported for Solana.
const iconFormat = {
  enabled: network != NETWORK.sol ? true : false,
  width: 256,
  height: 256,
};

const gif = {
  export: true,
  repeat: 0,
  quality: 100,
  delay: 1000,
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
  ratio: 32 / 128,
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
  thumbPerRow: 10,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 25,
  order: "ASC", // ASC, DESC, MIXED
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
