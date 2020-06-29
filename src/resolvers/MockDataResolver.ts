import { Resolver, Mutation, Arg } from "type-graphql";
import { generate_shops, generate_pointsOfSale, generate_products } from '../common/mock-data';
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { VENDOR } from "../common/constant";
import { Shop } from "../entity/Shop";
import { FamilyProduct } from "../entity/FamilyProduct";
import { PointOfSale } from "../entity/PointOfSale";
import { Quarter } from "../entity/Quarter";
import { Product } from "../entity/Product";
import { SubCategoryProduct } from "../entity/SubCategoryProduct";
import { Description } from "../entity/Description";
import { Price } from "../entity/Price";
import { CreateProductInput } from "../inputs/CreateProductInput";
import { CreatePointOfSaleInput } from "../inputs/CreatePointOfSaleInput";
import { CreateShopInput } from "../inputs/ShopInput";
import { PictureProduct } from "../entity/PictureProduct";

const saveShop = async (data: CreateShopInput):Promise<Shop> => {
    const owner = await getConnection().manager.findOne(User, {where:{id:data.ownerId}})
    if(!owner)
        throw "The shop owner does not exist."
    
    const familyProductsForSale = data.familyProductsIds.map(familyId => new FamilyProduct({id:familyId}))
    const shop = new Shop({ ...data, owner, familyProductsForSale, createdOn: new Date() })
    await getConnection().manager.save(shop)

    return shop   
}

const savePointOfSale = async (data: CreatePointOfSaleInput):Promise<PointOfSale> => {
    const pointOfSale = new PointOfSale({
        ...data,
        quarter: new Quarter({id:data.quarterId}),
        shop: new Shop({id:data.shopId})
    })
    await getConnection().manager.save(pointOfSale)

    return pointOfSale;
}

const saveProduct = async (data: CreateProductInput):Promise<Product> => {
    const { descriptions, prices, subCategoriesIds, pointsOfSaleIds, pictures, ...rest } = data;

    return await getConnection().transaction(async entityManager => {
        const product = new Product({
            ...rest,
            subCategories: subCategoriesIds.map(id => new SubCategoryProduct({id})),
            pointsOfSale: pointsOfSaleIds.map(id => new PointOfSale({id})),
            createdOn:new Date()
        })
        await entityManager.save(product)

        product.descriptions = await Promise.all(descriptions.map(async descriptionInput => await entityManager.save(new Description({...descriptionInput, product}))))

        product.prices = await Promise.all(prices.map(async priceInput => await entityManager.save(new Price({...priceInput, product}))))

        if(pictures){
            const savedPictures = await Promise.all(pictures.map( pictureInput => 
                entityManager.save(new PictureProduct({...pictureInput, product}))
            ))
            product.pictures = savedPictures
        }

        return product
    })
}

@Resolver()
export class MockDataResolver{
    @Mutation(() => Boolean)
    async generateMockData(@Arg("userId") userId:string){
        const shops = await Promise.all(generate_shops(userId).map(async data => await saveShop(data)))
        const pointsOfSale = await Promise.all(generate_pointsOfSale(shops.map(shop => shop.id)).map(async data => await savePointOfSale(data)))
        const products = await Promise.all((await generate_products(pointsOfSale.map(p => p.id))).map(async data => await saveProduct(data)))
        return true
    }
}