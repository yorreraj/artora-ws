import { UserPreference } from "../entity/UserPreference";
import { Repository, EntityRepository } from "typeorm";
import { UserPreferenceInput } from "../inputs/UserPreferenceInput";
import { User } from "../entity/User";
import { CategoryPerson } from "../entity/CategoryPerson";
import { CategoryProduct } from "../entity/CategoryProduct";
import { Shop } from "../entity/Shop";

@EntityRepository(UserPreference)
export class UserPreferenceRepository extends Repository<UserPreference>{
    async savePreference(data:UserPreferenceInput):Promise<UserPreference>{
        data.validate()

        let preference = await this.findOne({ where:{ owner: new User({id:data.userId}) }})
        
        if(!preference){
            await this.delete(preference)
            preference = new UserPreference()
            preference.owner = new User({ id:data.userId })
        }

        if(data.categoryPersonIds)
            preference.categoriesPerson = data.categoryPersonIds.map(id => new CategoryPerson(id))
        
        if(data.categoryProductIds)
            preference.categoriesProduct = data.categoryProductIds.map(id => new CategoryProduct(id))
        
        if(data.shopIds)
            preference.shops = data.shopIds.map(id => new Shop({id}))

        return this.save(preference)        
    }
}