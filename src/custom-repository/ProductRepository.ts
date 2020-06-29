
import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity/Product";
import { CreateProductInput } from "../inputs/CreateProductInput";
import { SubCategoryProduct } from "../entity/SubCategoryProduct";
import { PointOfSale } from "../entity/PointOfSale";
import { Description } from "../entity/Description";
import { Price } from "../entity/Price";
import { PictureProduct } from "../entity/PictureProduct";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{

    async createProduct(productInput:CreateProductInput):Promise<Product>{
        const { descriptions, prices, subCategoriesIds, pointsOfSaleIds, pictures, ...rest } = productInput;

        return await this.manager.transaction( async entityManager => {
            const product = new Product({
                ...rest,
                subCategories: subCategoriesIds.map(id => new SubCategoryProduct({id})),
                pointsOfSale: pointsOfSaleIds.map(id => new PointOfSale({id})),
                createdOn: new Date()
            })
            await entityManager.save(product)

            product.descriptions = await Promise.all(descriptions.map( descriptionInput => 
                entityManager.save(new Description({...descriptionInput, product}))
            ))

            product.prices = await Promise.all(prices.map( priceInput => 
                entityManager.save(new Price({...priceInput, product}))
            ))

            if(pictures){
                const savedPictures = await Promise.all(pictures.map( pictureInput => 
                    entityManager.save(new PictureProduct({...pictureInput, product}))
                ))
                product.pictures = savedPictures
            }

            return product
        })
    } 

    async getAllProducts(offset:number, limit:number):Promise<Product[]>{
        return await this.find({
            relations:["descriptions", "prices", "subCategories", "pointsOfSale", "promotions", "pictures"],
            skip:offset,
            take:limit
        })
    }

    async deleteProduct(productId:string):Promise<string>{
        await this.delete({id:productId})
        return productId
    }

    async getNewProductsFromShop(shopId:string):Promise<Product[]>{
        return await this.createQueryBuilder("product")
                         .innerJoinAndSelect("product.prices", "prices")
                         .innerJoinAndSelect("product.pictures", "pictures")
                         .innerJoinAndSelect("product.pointsOfSale", "pointsOfSale")
                         .innerJoinAndSelect("pointsOfSale.shop", "shop")
                         .where("shop.id=:shopId AND product.newArrival=true", {shopId})
                         .take(10)
                         .getMany()
    }

    async getProductById(id:string):Promise<Product>{
        return this.createQueryBuilder("product")
                    .innerJoinAndSelect("product.descriptions","descriptions") 
                    .innerJoinAndSelect("product.prices","prices")
                    .innerJoinAndSelect("product.pictures", "pictures")
                    .innerJoinAndSelect("product.subCategories", "subCategories")
                    .innerJoinAndSelect("product.pointsOfSale", "pointsOfSale")
                    .innerJoinAndSelect("pointsOfSale.shop","shop")
                    .leftJoinAndSelect("product.promotions", "promotions")
                    .where("product.id=:id",{id})
                    .getOne()
    }
    
}