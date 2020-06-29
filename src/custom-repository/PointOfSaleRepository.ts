import { Repository } from "typeorm";
import { PointOfSale } from "../entity/PointOfSale";
import { CreatePointOfSaleInput } from "../inputs/CreatePointOfSaleInput";
import { Quarter } from "../entity/Quarter";
import { Shop } from "../entity/Shop";


export class PointOfSaleRepository extends Repository<PointOfSale>{
    async createPointOfSale(pointOfSaleInput: CreatePointOfSaleInput):Promise<PointOfSale>{
        const { quarterId, shopId, ...rest } = pointOfSaleInput;
        const pointOfSale = new PointOfSale({
            ...rest,
            quarter: new Quarter({id:quarterId}),
            shop: new Shop({id:shopId})
        })
        await this.save(pointOfSale)

        return pointOfSale;
    }
}