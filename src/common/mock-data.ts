import { LoremIpsum } from 'lorem-ipsum';
import { getConnection } from 'typeorm';
import { SubCategoryProduct } from '../entity/SubCategoryProduct';

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
const FAMILY_PRODUCT_IDS = [1,2,3,4,5,6,7,8,9,10];
const QUARTER_IDS = [1,2,3,4,5,6,7,8];
const SUBCATECORIES_IDS = Array.apply(0, new Array(290)).map((_,index)=>index+1)


export const generate_shops = (ownerId):[] => Array.apply(0, new Array(10)).map((_,index)=>({
    name: lorem.generateWords(2),
    photoUri: `https://picsum.photos/id/${random(1,500)}/700/300.jpg`,
    ownerId,
    familyProductsIds: FAMILY_PRODUCT_IDS.splice(random(0, FAMILY_PRODUCT_IDS.length - 3),2)
}))

export const generate_pointsOfSale = (shopsId):[] => shopsId.map(shopId => ({
    name: lorem.generateWords(2),
    location: lorem.generateWords(3),
    quarterId: QUARTER_IDS[random(0, QUARTER_IDS.length - 1)],
    shopId
}))

export const generate_products = async (pointsOfSaleIds):Promise<any[]> => {
    let selectedIndexPointOfSale = 0
    return await Promise.all(
        Array.apply(0, new Array(200)).map( async(_,index) => {
            const subCategories = await getConnection()
                                        .createQueryBuilder(SubCategoryProduct, "subCategoryProduct")
                                        .innerJoin("subCategoryProduct.category","category")
                                        .innerJoin("category.family", "family")
                                        .innerJoin("family.shopsThatSells", "shopsThatSells")
                                        .innerJoin("shopsThatSells.pointsOfSale", "pointsOfSale")
                                        .where("pointsOfSale.id=:id",{id:pointsOfSaleIds[selectedIndexPointOfSale]})
                                        .getMany()
            const subCategoriesIds = subCategories.map(({id}) => id)
            
            const data = ({
                name: lorem.generateWords(2),
                available:true,
                youtubeVideoId:"7MV_o5CH2AI",
                newArrival:random(0,50) % 2 === 0,
                colors:["#000000", "#eaeaea", "#ffffff"],
                tags:[lorem.generateWords(1), lorem.generateWords(1), lorem.generateWords(1)],
                pictures: Array.apply(0, new Array(4)).map((_, index) => ({
                    uri:`https://picsum.photos/id/${random(1,500)}/${random(300, 700)}/${random(300, 700)}.jpg`,
                    isMain: index === 0
                })),
                descriptions: Array.apply(0, new Array(3)).map(_ => ({
                    title:lorem.generateWords(2),
                    content:lorem.generateSentences(1)
                })),
                prices: Array.apply(0, new Array(3)).map((_, index) => ({
                    label:lorem.generateWords(1),
                    amount:random(100000, 1000000),
                    isMain: index == 0
                })),
                subCategoriesIds:[subCategoriesIds[random(0, subCategoriesIds.length)]],
                pointsOfSaleIds:[pointsOfSaleIds[selectedIndexPointOfSale]]
            })
    
            selectedIndexPointOfSale = (selectedIndexPointOfSale+1)>pointsOfSaleIds.length-1 ? 0 : selectedIndexPointOfSale+1;
    
            return data;
        }
    ))
}