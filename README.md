![](https://github.com/cashninjas/shinobi-art-engine/blob/main/shinobi.png)

# Shinobi Art Engine 🔥

This is a fork of the excellent [HashLips Art Engine](https://github.com/HashLips/hashlips_art_engine) which adds the following features:

- Support for BCH [CashTokens](https://cashtokens.org) NFT projects.
- Icon generation for ETH and BCH projects.
- Updated to use ES module imports instead of `require()` statements.
- New Shinobi example layers!
- OpenAI integration to generate names and descriptions!
- Tons of small code cleanups and optimizations!

Create generative art by using the canvas api and node js. Before you use the generation engine, make sure you have node.js installed.

## Installation 🛠️

If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

```sh
git clone https://github.com/cashninjas/shinobi-art-engine.git
```

Go to the root of your folder and run this command if you have yarn installed.

```sh
yarn install
```

Alternatively you can run this command if you have node installed.

```sh
npm install
```

## Environment

A couple settings are tunable with a `.env` file.

If you want to keep your IPFS CIDs private, it is good practice to keep them out of the repository. You can use the following env vars:

```
SHINOBI_BASE_URI=ipfs://IPFS_IMAGE_DIR_CID
SHINOBI_BASE_ICON_URI=ipfs://IPFS_ICON_DIR_CID
```

NOTE: The first build will create your assets, then when you post your images and icons to IPFS you will get the CIDs. When your `.env` file is setup, run `npm run update_info` to update your project metadata.

In order to use OpenAI features, you will need an OpenAI API key. Make sure `OPENAI_API_KEY` is set in your `.env` file.

## Usage

Create your different layers as folders in the 'layers' directory, and add all the layer assets in these directories. You can name the assets anything as long as it has a rarity weight attached in the file name like so: `example element#70.png`. You can optionally change the delimiter `#` to anything you would like to use in the variable `rarityDelimiter` in the `src/config.js` file.

Once you have all your layers, go into `src/config.js` and update the `layerConfigurations` objects `layersOrder` array to be your layer folders name in order of the back layer to the front layer.

_Example:_ If you were creating a portrait design, you might have a background, then a head, a mouth, eyes, eyewear, and then headwear, so your `layersOrder` would look something like this:

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Head" },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Eyeswear" },
      { name: "Headwear" },
    ],
  },
];
```

The `name` of each layer object represents the name of the folder (in `/layers/`) that the images reside in.

Optionally you can now add multiple different `layerConfigurations` to your collection. Each configuration can be unique and have different layer orders, use the same layers or introduce new ones. This gives the artist flexibility when it comes to fine tuning their collections to their needs.

_Example:_ If you were creating a portrait design, you might have a background, then a head, a mouth, eyes, eyewear, and then headwear and you want to create a new race or just simple re-order the layers or even introduce new layers, then you're `layerConfigurations` and `layersOrder` would look something like this:

```js
const layerConfigurations = [
  {
    // Creates up to 50 artworks
    growEditionSizeTo: 50,
    layersOrder: [
      { name: "Background" },
      { name: "Head" },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Eyeswear" },
      { name: "Headwear" },
    ],
  },
  {
    // Creates an additional 100 artworks
    growEditionSizeTo: 150,
    layersOrder: [
      { name: "Background" },
      { name: "Head" },
      { name: "Eyes" },
      { name: "Mouth" },
      { name: "Eyeswear" },
      { name: "Headwear" },
      { name: "AlienHeadwear" },
    ],
  },
];
```

Update your `format` size, ie the outputted image size, and the `growEditionSizeTo` on each `layerConfigurations` object, which is the amount of variation outputted.

You can mix up the `layerConfigurations` order on how the images are saved by setting the variable `shuffleLayerConfigurations` in the `config.js` file to true. It is false by default and will save all images in numerical order.

If you want to have logs to debug and see what is happening when you generate images you can set the variable `debugLogs` in the `config.js` file to true. It is false by default, so you will only see general logs.

If you want to play around with different blending modes, you can add a `blend: MODE.colorBurn` field to the layersOrder `options` object.

If you need a layers to have a different opacity then you can add the `opacity: 0.7` field to the layersOrder `options` object as well.

If you want to have a layer _ignored_ in the DNA uniqueness check, you can set `bypassDNA: true` in the `options` object. This has the effect of making sure the rest of the traits are unique while not considering the `Background` Layers as traits, for example. The layers _are_ included in the final image.

To use a different metadata attribute name you can add the `displayName: "Awesome Eye Color"` to the `options` object. All options are optional and can be addes on the same layer if you want to.

Here is an example on how you can play around with both filter fields:

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background",
        options: {
          bypassDNA: false,
        },
      },
      { name: "Glow" },
      { name: "Weapons", options: { blend: MODE.overlay, opacity: 0.7 } },
      { name: "Body" },
      { name: "Eyes" },
    ],
  },
];
```

Here is a list of the different blending modes that you can optionally use.

```js
const MODE = {
  sourceOver: "source-over",
  sourceIn: "source-in",
  sourceOut: "source-out",
  sourceAtop: "source-out",
  destinationOver: "destination-over",
  destinationIn: "destination-in",
  destinationOut: "destination-out",
  destinationAtop: "destination-atop",
  lighter: "lighter",
  copy: "copy",
  xor: "xor",
  multiply: "multiply",
  screen: "screen",
  overlay: "overlay",
  darken: "darken",
  lighten: "lighten",
  colorDodge: "color-dodge",
  colorBurn: "color-burn",
  hardLight: "hard-light",
  softLight: "soft-light",
  difference: "difference",
  exclusion: "exclusion",
  hue: "hue",
  saturation: "saturation",
  color: "color",
  luminosity: "luminosity",
};
```

When you are ready, run the following command and your outputted art will be in the `build/images` directory, the json in the `build/json` directory, icons in the `build/icons` directory, and full BCMR metadata will be in the `build/bcmr` directory.:

```sh
npm run build
```

or

```sh
node index.js
```

The program will output all the images in the `build/images` directory along with the metadata files in the `build/json` directory. Each collection will have a `_metadata.json` file that consists of all the metadata in the collection inside the `build/json` directory. The `build/json` folder also will contain all the single json files that represent each image file. The single json file of a image will look something like this:

```json
{
  "name": "Your Collection #1",
  "description": "Remember to replace this description",
  "image": "ipfs://NewUriToReplace/images/1.png",
  "dna": "f208b7438a5cc9b7a0d1d9a832f68b26163cd8e9",
  "edition": 1,
  "date": 1694061887403,
  "imageHash": "fe4ecdca5f0307b4ceb923174d9218dd03998a86bf46ee0087f4bc0c7bd9f273",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Tower"
    },
    {
      "trait_type": "Glow",
      "value": "White"
    },
    {
      "trait_type": "Weapons",
      "value": "Bow and Arrow"
    },
    {
      "trait_type": "Body",
      "value": "Shadow"
    },
    {
      "trait_type": "Eyes",
      "value": "White"
    }
  ],
  "icon": "ipfs://NewUriToReplace/icons/1.png",
  "iconHash": "70ef4b4210dbc657848caa6b1e1c2fd901468570246f8b2e9e030b89cb146355"
}
```

The BCMR metadata will bein the `build/bcmr` directory for BCH collections! You can find more information about the BCMR format at [https://cashtokens.org/docs/bcmr/chip/](https://cashtokens.org/docs/bcmr/chip/)

You can also add extra metadata to each metadata file by adding your extra items, (key: value) pairs to the `extraMetadata` object variable in the `config.js` file.

```js
const extraMetadata = {
  creator: "Daniel Eugene Botha",
};
```

If you don't need extra metadata, simply leave the object empty. It is empty by default.

```js
const extraMetadata = {};
```

That's it, you're done.

## Utils

### Updating baseUri for IPFS and description

You might possibly want to update the baseUri and description after you have ran your collection. To update the baseUri and description simply run:

```sh
npm run update_info
```

### OpenAI generated names and descriptions

To create unique names and fun descriptions for your collection, run:

```sh
npm run openai
```

### Generate a preview image

Create a preview image collage of your collection, run:

```sh
npm run preview
```

### Generate pixelated images from collection

In order to convert images into pixelated images you would need a list of images that you want to convert. So run the generator first.

Then simply run this command:

```sh
npm run pixelate
```

All your images will be outputted in the `/build/pixel_images` directory.
If you want to change the ratio of the pixelation then you can update the ratio property on the `pixelFormat` object in the `src/config.js` file. The lower the number on the left, the more pixelated the image will be.

```js
const pixelFormat = {
  ratio: 16 / 128,
};
```

### Generate GIF images from collection

In order to export gifs based on the layers created, you just need to set the export on the `gif` object in the `src/config.js` file to `true`. You can also play around with the `repeat`, `quality` and the `delay` of the exported gif.

Setting the `repeat: -1` will produce a one time render and `repeat: 0` will loop forever.

```js
const gif = {
  export: true,
  repeat: 0,
  quality: 100,
  delay: 500,
};
```

### Printing rarity data (Experimental feature)

To see the percentages of each attribute across your collection, run:

```sh
npm run rarity
```

The output will look something like this:

```sh
Trait type: Weapons
{
  trait: 'Bow and Arrow',
  weight: '1',
  occurrence: '7 in 25 editions (28.00 %)'
}
{
  trait: 'Double Sword',
  weight: '1',
  occurrence: '3 in 25 editions (12.00 %)'
}
{
  trait: 'Scythe',
  weight: '1',
  occurrence: '4 in 25 editions (16.00 %)'
}
{
  trait: 'Staff',
  weight: '1',
  occurrence: '7 in 25 editions (28.00 %)'
}
{
  trait: 'Sword',
  weight: '1',
  occurrence: '4 in 25 editions (16.00 %)'
}
```

Hope you create some awesome artwork with this code.
