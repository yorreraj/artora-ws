import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
});


const random = (min, max) => Math.floor(Math.random() * (max - min) ) + min;
const generateImages = (number) => (Array.apply(0, new Array(number)).map(_ =>  `https://picsum.photos/id/${random(1,500)}/${random(300, 700)}/${random(300, 700)}.jpg`))
const PRODUCTS_FAKE = Array.apply(0, new Array(50)).map( (_,index) => ({
    name: lorem.generateWords(2),
    available:true,
    youtubeVideoId:"7MV_o5CH2AI",
    newArrival:true,
    colors:["#000000", "#eaeaea", "#ffffff"],
    tags:[lorem.generateWords(1), lorem.generateWords(1), lorem.generateWords(1)],
    picturesUri: generateImages(4),
    descriptions: Array.apply(0, new Array(3)).map(_ => ({
        title:lorem.generateWords(2),
        content:lorem.generateSentences(1)
    })),
    prices: Array.apply(0, new Array(3)).map(_ => ({
        label:lorem.generateWords(1),
        amount:random(100000, 1000000) 
    })),
    subCategoriesIds:[20, 21],
    pointsOfSaleIds:["321edbd3-4119-423f-a0c4-40ededeef3d0"]
}))

export default PRODUCTS_FAKE;