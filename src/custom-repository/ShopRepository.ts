import { Repository, EntityRepository } from "typeorm";
import { Shop } from "../entity/Shop";
import { CreateShopInput } from "../inputs/ShopInput";
import { User } from "../entity/User";
import { FamilyProduct } from "../entity/FamilyProduct";

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop>{
    async createShop(shopInput:CreateShopInput):Promise<Shop>{
        const owner = await this.manager.findOne( User, { where:{id:shopInput.ownerId}})
        if(!owner)
            throw "The shop owner does not exist."
        
        const familyProductsForSale = shopInput.familyProductsIds.map(familyId => new FamilyProduct({id:familyId}))
        const shop = new Shop({ ...shopInput, owner, familyProductsForSale, createdOn: new Date() })
        await this.save(shop)

        return shop    
    }

    async getAllShops():Promise<Shop[]>{
        return await this.find({ relations:["pointsOfSale"] })
    }
}