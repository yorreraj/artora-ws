import { Repository, EntityRepository } from "typeorm";
import { FamilyProduct } from "../entity/FamilyProduct";

@EntityRepository(FamilyProduct)
export class FamilyProductRepository extends Repository<FamilyProduct>{
    async getFamiliesProductInShop(shopId:string):Promise<FamilyProduct[]>{
        return await this.createQueryBuilder("familyProduct")
                        .innerJoinAndSelect("familyProduct.categories", "categories")
                        .innerJoinAndSelect("categories.subCategories", "subCategories")
                        .innerJoin("subCategories.products", "products")
                        .innerJoin("products.pointsOfSale", "pointsOfSale")
                        .innerJoin("pointsOfSale.shop", "shop")
                        .where("shop.id=:shopId",{shopId})
                        .getMany()                    
    }

    async getAllFamilies():Promise<FamilyProduct[]>{
        return await this.createQueryBuilder("familyProduct")
                        .innerJoinAndSelect("familyProduct.categories", "categories")
                        .innerJoinAndSelect("categories.subCategories", "subCategories")
                        .getMany()
    }
}